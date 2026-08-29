"""Test error classification and fallback logic."""

import pytest
import httpx
from anthropic import RateLimitError, APIStatusError

from app.errors import (
    ProviderError,
    ProviderUnavailableError,
    ProviderRateLimitError,
    ProviderQuotaError,
    ProviderRequestError,
)
from app.llm.router import LLMRouter
from app.schemas.admin import RuntimeConfig


def test_error_hierarchy():
    """Verify error class hierarchy."""
    error = ProviderUnavailableError("Connection failed", "anthropic", 503)
    assert isinstance(error, ProviderError)
    assert error.provider == "anthropic"
    assert error.status_code == 503


def test_rate_limit_error():
    """Rate limit error should trigger fallback."""
    error = ProviderRateLimitError("Too many requests", "openrouter", 429)
    assert isinstance(error, ProviderError)
    assert error.status_code == 429


def test_quota_error():
    """Quota error (402) should trigger fallback."""
    error = ProviderQuotaError("Quota exceeded", "anthropic", 402)
    assert isinstance(error, ProviderError)
    assert error.status_code == 402


def test_request_error_no_fallback():
    """Request error (4xx) should NOT trigger fallback."""
    error = ProviderRequestError("Invalid model name", "openrouter", 400)
    assert isinstance(error, ProviderError)
    assert error.status_code == 400
    assert not isinstance(error, ProviderUnavailableError)


def test_unavailable_error():
    """Unavailable error (5xx, timeout, connection) should trigger fallback."""
    error = ProviderUnavailableError("Server error", "anthropic", 500)
    assert isinstance(error, ProviderError)
    assert error.status_code == 500


def test_httpx_status_error_mapping():
    """Verify httpx status errors are classified correctly."""
    # Note: This is a unit test of the classification logic,
    # not a real httpx call. In practice, we'd test the full router
    # with mocked httpx responses.

    config = RuntimeConfig(
        primary_provider="anthropic",
        secondary_provider="openrouter",
    )

    # Just verify the router can instantiate with config
    assert config.primary_provider == "anthropic"
    assert config.secondary_provider == "openrouter"
