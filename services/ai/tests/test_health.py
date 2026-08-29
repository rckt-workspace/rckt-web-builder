"""Tests for health and readiness endpoints."""

import pytest
from fastapi.testclient import TestClient

from app.core import Settings, get_settings
from app.main import create_app


@pytest.fixture
def app():
    """Create a fresh app for each test."""
    return create_app()


@pytest.fixture
def client(app):
    """FastAPI test client."""
    return TestClient(app)


def test_healthz_returns_200(client):
    """Test liveness probe - always responds."""
    response = client.get("/healthz")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "rckt-ai"
    assert "version" in data


def test_readyz_returns_200_when_anthropic_configured(app):
    """Test readiness probe when Anthropic is configured."""
    configured_settings = Settings(
        anthropic_api_key="test-key",
        anthropic_model="claude-sonnet-5",
    )

    app.dependency_overrides[get_settings] = lambda: configured_settings
    client = TestClient(app)

    response = client.get("/readyz")
    assert response.status_code == 200
    data = response.json()
    assert data["ready"] is True
    assert data["checks"]["anthropic"] is True

    app.dependency_overrides.clear()


def test_readyz_returns_503_when_no_providers(app):
    """Test readiness probe when no LLM providers are configured."""
    unconfigured_settings = Settings(
        anthropic_api_key="",
        anthropic_model="",
        openrouter_api_key="",
        openrouter_model="",
    )

    app.dependency_overrides[get_settings] = lambda: unconfigured_settings
    client = TestClient(app)

    response = client.get("/readyz")
    assert response.status_code == 503
    data = response.json()
    assert data["ready"] is False
    assert data["checks"]["anthropic"] is False
    assert data["checks"]["openrouter"] is False

    app.dependency_overrides.clear()


def test_readyz_ready_with_openrouter_only(app):
    """Test readiness probe when only OpenRouter is configured."""
    configured_settings = Settings(
        anthropic_api_key="",
        anthropic_model="",
        openrouter_api_key="test-key",
        openrouter_model="meta-llama/llama-3.1-8b",
    )

    app.dependency_overrides[get_settings] = lambda: configured_settings
    client = TestClient(app)

    response = client.get("/readyz")
    assert response.status_code == 200
    data = response.json()
    assert data["ready"] is True
    assert data["checks"]["openrouter"] is True

    app.dependency_overrides.clear()


def test_readyz_optional_services_do_not_block_readiness(app):
    """Test that optional services don't block readiness."""
    configured_settings = Settings(
        anthropic_api_key="test-key",
        anthropic_model="claude-sonnet-5",
        supabase_url="",
        supabase_service_role_key="",
        langfuse_public_key="",
        langfuse_secret_key="",
    )

    app.dependency_overrides[get_settings] = lambda: configured_settings
    client = TestClient(app)

    response = client.get("/readyz")
    assert response.status_code == 200
    data = response.json()
    assert data["ready"] is True
    assert data["checks"]["supabase"] is False
    assert data["checks"]["observability"] is False

    app.dependency_overrides.clear()


def test_readiness_response_contract_on_503(app):
    """Test that 503 response uses the same JSON contract as 200."""
    unconfigured_settings = Settings(anthropic_api_key="")

    app.dependency_overrides[get_settings] = lambda: unconfigured_settings
    client = TestClient(app)

    response = client.get("/readyz")
    assert response.status_code == 503
    data = response.json()

    # Same contract as 200 response
    assert "ready" in data
    assert "checks" in data
    assert isinstance(data["checks"], dict)

    app.dependency_overrides.clear()


def test_root(client):
    """Test root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "rckt-ai"
    assert "version" in data
    assert "env" in data
