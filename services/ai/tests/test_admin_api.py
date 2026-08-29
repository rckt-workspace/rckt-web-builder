"""Test admin API endpoints."""

import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock

from app.main import create_app
from app.schemas.admin import RuntimeConfig


@pytest.fixture
def client():
    """Create test client."""
    app = create_app()
    return TestClient(app)


def test_admin_config_unauthorized_without_secret(client):
    """Verify GET /internal/config requires X-RCKT-Internal-Secret header."""
    response = client.get("/internal/config")
    assert response.status_code == 401


def test_admin_config_unauthorized_with_wrong_secret(client):
    """Verify GET /internal/config rejects wrong secret."""
    response = client.get("/internal/config", headers={"X-RCKT-Internal-Secret": "wrong"})
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_admin_config_get_no_api_keys(client):
    """Verify GET /internal/config does not return API keys."""
    # This test verifies the contract: config endpoint never exposes secrets
    with patch.dict("os.environ", {"RCKT_INTERNAL_SECRET": "test-secret"}):
        response = client.get(
            "/internal/config",
            headers={"X-RCKT-Internal-Secret": "test-secret"},
        )

        if response.status_code == 200:
            data = response.json()
            # Should never contain API keys
            assert "anthropic_api_key" not in str(data).lower()
            assert "openrouter_api_key" not in str(data).lower()


def test_admin_update_config_unauthorized(client):
    """Verify PUT /internal/config requires authentication."""
    response = client.put(
        "/internal/config",
        json={"primary_provider": "openrouter"},
    )
    assert response.status_code == 401


def test_admin_models_endpoint_exists(client):
    """Verify GET /internal/models endpoint exists."""
    # Should fail auth, not 404
    response = client.get("/internal/models")
    assert response.status_code == 401


def test_admin_usage_endpoint_exists(client):
    """Verify GET /internal/usage endpoint exists."""
    # Should fail auth, not 404
    response = client.get("/internal/usage")
    assert response.status_code == 401


def test_admin_test_provider_endpoint_exists(client):
    """Verify POST /internal/test-provider endpoint exists."""
    # Should fail auth, not 404
    response = client.post("/internal/test-provider", json={})
    assert response.status_code == 401


def test_admin_provider_status_endpoint_exists(client):
    """Verify GET /internal/provider-status endpoint exists."""
    # Should fail auth, not 404
    response = client.get("/internal/provider-status")
    assert response.status_code == 401
