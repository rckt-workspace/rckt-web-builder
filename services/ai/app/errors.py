"""Custom exception hierarchy for error-type-aware fallback routing."""


class ProviderError(Exception):
    """Base exception for provider errors."""

    def __init__(
        self,
        message: str,
        provider: str,
        status_code: int | None = None,
    ):
        super().__init__(message)
        self.message = message
        self.provider = provider
        self.status_code = status_code


class ProviderUnavailableError(ProviderError):
    """Provider is unavailable (5xx, timeout, connection error) - ALLOW FALLBACK."""

    pass


class ProviderRateLimitError(ProviderError):
    """Provider rate limit exceeded (429) - ALLOW FALLBACK."""

    pass


class ProviderQuotaError(ProviderError):
    """Provider quota/billing error (402) - ALLOW FALLBACK."""

    pass


class ProviderRequestError(ProviderError):
    """Provider request error (4xx client error) - NO FALLBACK."""

    pass
