"""Tests for LLM router with fallback support."""

import pytest
from unittest.mock import AsyncMock, patch

from app.core import Settings
from app.llm.base import Message


@pytest.mark.asyncio
async def test_router_requires_at_least_one_provider():
    """Test that router requires at least one configured provider."""
    with patch("app.llm.router.settings") as mock_settings:
        mock_settings.anthropic_configured.return_value = False
        mock_settings.openrouter_configured.return_value = False
        mock_settings.has_any_llm_provider.return_value = False

        from app.llm.router import LLMRouter

        with pytest.raises(RuntimeError, match="No LLM providers"):
            LLMRouter()


@pytest.mark.asyncio
async def test_router_fallback_behavior():
    """Test router falls back when primary provider fails."""
    with patch("app.llm.router.AnthropicProvider") as mock_anthropic, \
         patch("app.llm.router.OpenRouterProvider") as mock_openrouter, \
         patch("app.llm.router.settings") as mock_settings:

        mock_settings.llm_provider = "anthropic"
        mock_settings.llm_fallback_provider = "openrouter"
        mock_settings.anthropic_configured.return_value = True
        mock_settings.openrouter_configured.return_value = True

        # Create mock provider instances
        primary_mock = AsyncMock()
        fallback_mock = AsyncMock()
        mock_anthropic.return_value = primary_mock
        mock_openrouter.return_value = fallback_mock

        # Primary fails, fallback succeeds
        primary_mock.generate = AsyncMock(side_effect=Exception("Primary failed"))
        fallback_mock.generate = AsyncMock(return_value="Fallback response")

        from app.llm.router import LLMRouter
        router = LLMRouter()

        messages = [Message(role="user", content="test")]
        result = await router.generate(messages)

        assert result == "Fallback response"
        fallback_mock.generate.assert_called_once()


def test_configuration_supports_both_providers():
    """Test that Settings supports both Anthropic and OpenRouter."""
    settings = Settings(
        anthropic_api_key="test-anthropic",
        anthropic_model="claude-sonnet-5",
        openrouter_api_key="test-openrouter",
        openrouter_model="meta-llama/llama-3.1-8b",
    )

    assert settings.anthropic_configured() is True
    assert settings.openrouter_configured() is True
    assert settings.has_any_llm_provider() is True


def test_configuration_with_single_provider():
    """Test that Settings allows single provider configuration."""
    # Anthropic only
    settings_anthropic = Settings(
        anthropic_api_key="test",
        anthropic_model="claude-sonnet-5",
        openrouter_api_key="",
        openrouter_model="",
    )
    assert settings_anthropic.has_any_llm_provider() is True

    # OpenRouter only
    settings_openrouter = Settings(
        anthropic_api_key="",
        anthropic_model="",
        openrouter_api_key="test",
        openrouter_model="llama",
    )
    assert settings_openrouter.has_any_llm_provider() is True
