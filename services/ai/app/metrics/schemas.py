"""Metrics data model - canonical format for all sources."""

from datetime import datetime, timezone
from typing import Any, Literal, Optional
from pydantic import BaseModel, ConfigDict, Field


# Canonical metric source types
MetricSource = Literal[
    "ga4",
    "search_console",
    "crux",
    "render",
    "rckt_internal",
    "ai_telemetry",
]


class MetricPoint(BaseModel):
    """Single metric measurement from any source."""

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "source": "ga4",
                "metric": "sessions",
                "value": 1250,
                "unit": "count",
                "timestamp": "2026-08-25T18:00:00Z",
                "dimensions": {"page": "/sistema", "device": "desktop"},
                "metadata": {"confidence": 0.95},
            }
        }
    )

    source: MetricSource
    metric: str = Field(..., description="Metric name (e.g., sessions, clicks, traffic_method)")
    value: float = Field(..., description="Numeric value")
    unit: Optional[str] = Field(None, description="Unit (e.g., %, ms, requests/s)")
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    dimensions: dict[str, Any] = Field(
        default_factory=dict,
        description="Context (page, device, country, etc)",
    )
    metadata: dict[str, Any] = Field(
        default_factory=dict,
        description="Additional context (importance, confidence, source_id)",
    )


class MetricsSnapshot(BaseModel):
    """Collection of metrics from a single source at a point in time."""

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "source": "ga4",
                "collected_at": "2026-08-25T18:00:00Z",
                "metrics": [
                    {
                        "source": "ga4",
                        "metric": "sessions",
                        "value": 1250,
                        "unit": "count",
                        "timestamp": "2026-08-25T18:00:00Z",
                        "dimensions": {},
                        "metadata": {},
                    }
                ],
                "status": "success",
            }
        }
    )

    source: MetricSource
    collected_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    metrics: list[MetricPoint] = Field(default_factory=list)
    status: Literal["success", "partial", "not_configured", "error"]


class RCKTProductEvent(BaseModel):
    """Internal RCKT product event for conversion tracking."""

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "event_type": "chat_started",
                "session_id": "s_abc123",
                "user_id": None,
                "timestamp": "2026-08-25T18:00:00Z",
                "properties": {"source": "diagnostico", "topic": "ecommerce"},
            }
        }
    )

    event_type: Literal[
        "page_view",
        "cta_clicked",
        "chat_opened",
        "chat_started",
        "chat_message_sent",
        "lead_generated",
        "qualified_lead",
        "consultation_requested",
    ]
    session_id: str
    user_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    properties: dict[str, Any] = Field(default_factory=dict)
