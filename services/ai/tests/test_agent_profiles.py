"""Test agent profiles configuration."""

import pytest
from app.agents.profiles import PROFILES, AgentProfile, RCKT_ADVISOR_SYSTEM_PROMPT


def test_profiles_dict_not_empty():
    """Verify profiles are defined."""
    assert len(PROFILES) > 0


def test_rckt_advisor_exists():
    """Verify rckt_advisor profile exists."""
    assert "rckt_advisor" in PROFILES


def test_rckt_advisor_profile_valid():
    """Verify rckt_advisor profile has required fields."""
    profile = PROFILES["rckt_advisor"]

    assert isinstance(profile, AgentProfile)
    assert profile.id == "rckt_advisor"
    assert profile.name == "RCKT Advisor"
    assert len(profile.system_prompt) > 100  # Substantial prompt
    assert profile.default_max_tokens > 0


def test_system_prompt_not_placeholder():
    """Verify system prompt is actual content, not a placeholder."""
    prompt = PROFILES["rckt_advisor"].system_prompt

    # Should contain Spanish text (specific to RCKT Advisor)
    assert "RCKT.es" in prompt
    assert "asesor" in prompt.lower()

    # Should NOT be a placeholder
    assert "TODO" not in prompt
    assert "PLACEHOLDER" not in prompt
    assert len(prompt) > 500


def test_system_prompt_module_level():
    """Verify system prompt is defined at module level."""
    assert len(RCKT_ADVISOR_SYSTEM_PROMPT) > 100
    assert RCKT_ADVISOR_SYSTEM_PROMPT == PROFILES["rckt_advisor"].system_prompt


def test_profile_max_tokens_reasonable():
    """Verify max tokens are reasonable."""
    for profile_id, profile in PROFILES.items():
        # Max tokens should be between 100 and 4000
        assert 100 <= profile.default_max_tokens <= 4000, f"{profile_id} has invalid max_tokens"
