"""Tests for provider model override functionality."""

import pytest
from app.llm.anthropic import AnthropicProvider
from app.llm.openrouter import OpenRouterProvider
from app.schemas.admin import RuntimeConfig
from app.llm.router import LLMRouter


class TestAnthropicModelOverride:
    """Test Anthropic provider accepts model parameter."""

    def test_anthropic_default_model(self):
        """Anthropic uses settings default when no model provided."""
        try:
            provider = AnthropicProvider()
            # Should use settings.anthropic_model
            assert provider.model == "claude-3-5-sonnet-latest"
        except ValueError:
            # Provider not configured, which is fine in test
            pytest.skip("Anthropic not configured")

    def test_anthropic_override_model(self):
        """Anthropic uses provided model when given."""
        try:
            custom_model = "claude-opus-4-1"
            provider = AnthropicProvider(model=custom_model)
            assert provider.model == custom_model
        except ValueError:
            pytest.skip("Anthropic not configured")


class TestOpenRouterModelOverride:
    """Test OpenRouter provider accepts model parameter."""

    def test_openrouter_default_model(self):
        """OpenRouter uses settings default when no model provided."""
        try:
            provider = OpenRouterProvider()
            # Should use settings.openrouter_model
            assert provider.model in [
                "meta-llama/llama-3.1-8b-instruct:free",
                "openrouter/free"
            ]
        except ValueError:
            pytest.skip("OpenRouter not configured")

    def test_openrouter_override_model(self):
        """OpenRouter uses provided model when given."""
        try:
            custom_model = "mistral-7b"
            provider = OpenRouterProvider(model=custom_model)
            assert provider.model == custom_model
        except ValueError:
            pytest.skip("OpenRouter not configured")


class TestRouterProviderInitialization:
    """Test router passes models to providers correctly."""

    def test_router_passes_primary_model(self):
        """Router passes RuntimeConfig.primary_model to primary provider."""
        config = RuntimeConfig(
            primary_provider="openrouter",
            primary_model="custom-primary-model",
            secondary_provider="anthropic",
            secondary_model="custom-secondary-model",
        )

        try:
            router = LLMRouter(config)

            if router.primary:
                # Verify primary provider has custom model
                assert router.primary.model == "custom-primary-model"
        except RuntimeError:
            # No providers configured, which is fine for this test
            pytest.skip("No LLM providers configured")

    def test_router_passes_secondary_model(self):
        """Router passes RuntimeConfig.secondary_model to fallback provider."""
        config = RuntimeConfig(
            primary_provider="openrouter",
            primary_model="custom-primary",
            secondary_provider="anthropic",
            secondary_model="custom-secondary",
        )

        try:
            router = LLMRouter(config)

            if router.fallback:
                # Verify fallback provider has custom model
                assert router.fallback.model == "custom-secondary"
        except RuntimeError:
            pytest.skip("No LLM providers configured")

    def test_router_uses_runtime_config_models(self):
        """Router initialization respects RuntimeConfig model settings."""
        config = RuntimeConfig(
            primary_provider="openrouter",
            primary_model="openrouter/custom",
            secondary_provider="openrouter",
            secondary_model="openrouter/fallback",
            fallback_enabled=True,
            routing_mode="failover",
        )

        try:
            router = LLMRouter(config)

            # Verify router has the config
            assert router.config.primary_model == "openrouter/custom"
            assert router.config.secondary_model == "openrouter/fallback"

            # If providers initialized, check models match config
            if router.primary:
                assert router.primary.model == "openrouter/custom"
            if router.fallback:
                assert router.fallback.model == "openrouter/fallback"
        except RuntimeError:
            pytest.skip("OpenRouter not configured")
