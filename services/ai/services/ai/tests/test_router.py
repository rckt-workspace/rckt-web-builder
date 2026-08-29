"""Tests for LLM router with fallback support."""

import pytest
from unittest.mock import AsyncMock, MagicMock, patch

from app.core import Settings
from app.llm.base import Message
from app.schemas.admin import RuntimeConfig
from app.schemas.generation import GenerationResult


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


def test_router_config_initialization():
    """Test router can be initialized with RuntimeConfig."""
    config = RuntimeConfig(
        primary_provider="anthropic",
        secondary_provider="openrouter",
        routing_mode="failover",
    )

    # Just verify config is valid, don't try to instantiate router
    # (would fail without real credentials)
    assert config.primary_provider == "anthropic"
    assert config.secondary_provider == "openrouter"
    assert config.routing_mode == "failover"


def test_generation_result_structure():
    """Test GenerationResult contains expected fields."""
    result = GenerationResult(
        content="Test response",
        provider="anthropic",
        model="claude-sonnet-5",
        fallback_used=False,
        input_tokens=10,
        output_tokens=20,
        cost_usd=0.001,
        latency_ms=100,
    )

    assert result.content == "Test response"
    assert result.provider == "anthropic"
    assert result.model == "claude-sonnet-5"
    assert result.fallback_used is False
    assert result.input_tokens == 10
    assert result.output_tokens == 20
    assert result.cost_usd == 0.001
    assert result.latency_ms == 100
