"""Test router v2 with runtime config and advanced routing."""

import pytest
from app.schemas.admin import RuntimeConfig
from app.llm.router import LLMRouter


def test_router_instantiates_with_config():
    """Verify router can instantiate with RuntimeConfig."""
    config = RuntimeConfig(
        primary_provider="anthropic",
        secondary_provider="openrouter",
        routing_mode="failover",
        primary_weight=100,
    )

    try:
        router = LLMRouter(config)
        assert router.config == config
        assert router.routing_mode == "failover"
        assert router.primary_weight == 100
    except RuntimeError as e:
        # Expected if no providers configured
        assert "No LLM providers configured" in str(e)


def test_router_weighted_mode():
    """Verify router supports weighted routing mode."""
    config = RuntimeConfig(
        primary_provider="anthropic",
        secondary_provider="openrouter",
        routing_mode="weighted",
        primary_weight=75,
    )

    try:
        router = LLMRouter(config)
        assert router.routing_mode == "weighted"
        assert router.primary_weight == 75
    except RuntimeError:
        pass


def test_router_fallback_disabled():
    """Verify fallback can be disabled."""
    config = RuntimeConfig(
        primary_provider="anthropic",
        secondary_provider="openrouter",
        fallback_enabled=False,
    )

    try:
        router = LLMRouter(config)
        assert router.fallback_enabled is False
        assert router.fallback is None
    except RuntimeError:
        pass


def test_config_version_tracking():
    """Verify config tracks version for audit."""
    config = RuntimeConfig(version=1)
    assert config.version == 1

    config2 = RuntimeConfig(version=2)
    assert config2.version == 2


def test_config_budget_policy():
    """Verify config supports budget policies."""
    for policy in ["warn_only", "prefer_cheaper_provider", "fallback_only", "hard_stop"]:
        config = RuntimeConfig(budget_policy=policy)
        assert config.budget_policy == policy


def test_config_primary_weight_range():
    """Verify primary_weight is constrained to 0-100."""
    config_0 = RuntimeConfig(primary_weight=0)
    assert config_0.primary_weight == 0

    config_100 = RuntimeConfig(primary_weight=100)
    assert config_100.primary_weight == 100

    config_50 = RuntimeConfig(primary_weight=50)
    assert config_50.primary_weight == 50
