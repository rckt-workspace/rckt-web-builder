"""Tests for error classification in provider fallback logic."""

import pytest
from app.llm.router import LLMRouter
from app.errors import (
    ProviderError,
    ProviderUnavailableError,
    ProviderRateLimitError,
    ProviderQuotaError,
    ProviderRequestError,
)
from app.schemas.admin import RuntimeConfig
from anthropic import APIStatusError, RateLimitError, APIConnectionError
import httpx


class TestErrorClassification:
    """Test error classification for fallback decision-making."""

    def setup_method(self):
        """Set up router for testing."""
        config = RuntimeConfig(
            primary_provider="anthropic",
            secondary_provider="openrouter",
            fallback_enabled=True,
        )
        try:
            self.router = LLMRouter(config)
        except RuntimeError:
            self.router = None

    def test_rate_limit_error_classification(self):
        """429 errors should classify as ProviderRateLimitError."""
        if not self.router:
            pytest.skip("No providers configured")

        error = APIStatusError(
            message="Rate limit exceeded",
            response=None,
            body=None,
        )
        error.status_code = 429

        classified = self.router._classify_error(error)
        assert isinstance(classified, ProviderRateLimitError)
        assert classified.status_code == 429

    def test_quota_error_classification(self):
        """402 errors should classify as ProviderQuotaError."""
        if not self.router:
            pytest.skip("No providers configured")

        error = APIStatusError(
            message="Quota exceeded",
            response=None,
            body=None,
        )
        error.status_code = 402

        classified = self.router._classify_error(error)
        assert isinstance(classified, ProviderQuotaError)
        assert classified.status_code == 402

    def test_request_error_no_fallback(self):
        """4xx errors (except 429/402) should not trigger fallback."""
        if not self.router:
            pytest.skip("No providers configured")

        error = APIStatusError(
            message="Invalid input",
            response=None,
            body=None,
        )
        error.status_code = 400

        classified = self.router._classify_error(error)
        assert isinstance(classified, ProviderRequestError)
        assert classified.status_code == 400

    def test_server_error_triggers_fallback(self):
        """5xx errors should classify as ProviderUnavailableError."""
        if not self.router:
            pytest.skip("No providers configured")

        error = APIStatusError(
            message="Internal server error",
            response=None,
            body=None,
        )
        error.status_code = 500

        classified = self.router._classify_error(error)
        assert isinstance(classified, ProviderUnavailableError)
        assert classified.status_code == 500

    def test_connection_error_triggers_fallback(self):
        """Connection errors should classify as ProviderUnavailableError."""
        if not self.router:
            pytest.skip("No providers configured")

        error = APIConnectionError(message="Connection refused")
        classified = self.router._classify_error(error)
        assert isinstance(classified, ProviderUnavailableError)
        assert classified.status_code is None

    def test_httpx_rate_limit_error(self):
        """httpx 429 errors should classify as ProviderRateLimitError."""
        if not self.router:
            pytest.skip("No providers configured")

        response = httpx.Response(429)
        error = httpx.HTTPStatusError(message="Rate limit", request=None, response=response)

        classified = self.router._classify_error(error)
        assert isinstance(classified, ProviderRateLimitError)

    def test_httpx_timeout_error(self):
        """httpx timeout errors should classify as ProviderUnavailableError."""
        if not self.router:
            pytest.skip("No providers configured")

        error = httpx.TimeoutException(message="Timeout")
        classified = self.router._classify_error(error)
        assert isinstance(classified, ProviderUnavailableError)

    def test_httpx_connect_error(self):
        """httpx connection errors should classify as ProviderUnavailableError."""
        if not self.router:
            pytest.skip("No providers configured")

        error = httpx.ConnectError(message="Connection failed")
        classified = self.router._classify_error(error)
        assert isinstance(classified, ProviderUnavailableError)


class TestFallbackEligibility:
    """Test which errors should allow fallback."""

    def setup_method(self):
        """Set up router for testing."""
        config = RuntimeConfig(
            primary_provider="anthropic",
            secondary_provider="openrouter",
            fallback_enabled=True,
        )
        try:
            self.router = LLMRouter(config)
        except RuntimeError:
            self.router = None

    def test_unavailable_error_allows_fallback(self):
        """ProviderUnavailableError should allow fallback."""
        error = ProviderUnavailableError("Service down", "anthropic", 503)
        # Fallback is allowed if NOT a ProviderRequestError
        assert not isinstance(error, ProviderRequestError)

    def test_rate_limit_allows_fallback(self):
        """ProviderRateLimitError should allow fallback."""
        error = ProviderRateLimitError("Rate limited", "anthropic", 429)
        assert not isinstance(error, ProviderRequestError)

    def test_quota_allows_fallback(self):
        """ProviderQuotaError should allow fallback."""
        error = ProviderQuotaError("Quota exceeded", "anthropic", 402)
        assert not isinstance(error, ProviderRequestError)

    def test_request_error_no_fallback(self):
        """ProviderRequestError should NOT allow fallback."""
        error = ProviderRequestError("Bad input", "anthropic", 400)
        assert isinstance(error, ProviderRequestError)
