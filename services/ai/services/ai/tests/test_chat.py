"""Tests for chat endpoint."""

import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, MagicMock, patch

from app.main import create_app
from app.core import Settings, get_settings
from app.schemas.chat import ChatRequest, ChatResponse
from app.schemas.generation import GenerationResult


@pytest.fixture
def app():
    """Create test app."""
    return create_app()


@pytest.fixture
def client(app):
    """FastAPI test client."""
    return TestClient(app)


@pytest.fixture
def test_settings():
    """Test settings with Anthropic configured."""
    return Settings(
        app_env="test",
        anthropic_api_key="test-key",
        anthropic_model="claude-sonnet-5",
    )


def test_chat_endpoint_not_configured(client):
    """Test /chat returns 503 when no LLM providers configured."""
    app = client.app

    # Override settings with no providers
    def get_test_settings():
        return Settings(
            app_env="test",
            anthropic_api_key="",
            anthropic_model="",
            openrouter_api_key="",
            openrouter_model="",
        )

    app.dependency_overrides[get_settings] = get_test_settings

    response = client.post(
        "/chat",
        json={
            "messages": [{"role": "user", "content": "Hola"}],
        },
    )

    assert response.status_code == 503
    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_chat_endpoint_success_with_mock(client, test_settings):
    """Test /chat endpoint returns assistant response via router."""
    app = client.app

    # Override settings
    app.dependency_overrides[get_settings] = lambda: test_settings

    # Mock LLMRouter and RuntimeConfigService
    with patch("app.api.chat.LLMRouter") as mock_router_class, \
         patch("app.api.chat.RuntimeConfigService"):

        mock_router = AsyncMock()
        mock_result = GenerationResult(
            content="Hola, ¿cómo puedo ayudarte con tu negocio?",
            provider="anthropic",
            model="claude-sonnet-5",
            fallback_used=False,
            latency_ms=100,
        )
        mock_router.generate = AsyncMock(return_value=mock_result)
        mock_router_class.return_value = mock_router

        response = client.post(
            "/chat",
            json={
                "messages": [{"role": "user", "content": "¿Cómo mejoro mis conversiones?"}],
                "system": "Eres un experto en ecommerce",
                "max_tokens": 512,
            },
        )

    assert response.status_code == 200
    data = response.json()

    assert data["message"]["role"] == "assistant"
    assert "ayudarte" in data["message"]["content"]
    assert data["model"] == "claude-sonnet-5"
    assert data["stop_reason"] == "end_turn"

    app.dependency_overrides.clear()


def test_chat_request_structure():
    """Test ChatRequest schema validation."""
    # Valid request
    valid = ChatRequest(
        messages=[
            {"role": "user", "content": "Hello"},
        ]
    )
    assert len(valid.messages) == 1
    assert valid.max_tokens == 1024

    # Invalid max_tokens
    with pytest.raises(ValueError):
        ChatRequest(
            messages=[{"role": "user", "content": "Hello"}],
            max_tokens=5000,  # Over max
        )


def test_chat_response_structure():
    """Test ChatResponse schema validation."""
    response = ChatResponse(
        message={"role": "assistant", "content": "Response text"},
        model="claude-sonnet-5",
        stop_reason="end_turn",
    )
    assert response.message.role == "assistant"
    assert response.model == "claude-sonnet-5"
