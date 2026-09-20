import logging
import re
import sys
from typing import Any
from app.core.config import settings

# Sensitive key masking pattern
SENSITIVE_PATTERNS = [
    re.compile(r'(?i)(bearer\s+)[a-zA-Z0-9_\-\.]{8,}'),
    re.compile(r'(?i)(key\s*[:=]\s*)[a-zA-Z0-9_\-\.]{8,}'),
    re.compile(r'(?i)(sk-[a-zA-Z0-9]{8,})'),
    re.compile(r'(?i)(AIzaSy[a-zA-Z0-9_-]{8,})'),
]


class SensitiveMaskingFormatter(logging.Formatter):
    """Formatter that strips and masks potential tokens, authorization headers, or keys."""

    def format(self, record: logging.LogRecord) -> str:
        original = super().format(record)
        masked = original
        for pattern in SENSITIVE_PATTERNS:
            masked = pattern.sub(r'\1***MASKED***', masked)
        return masked


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("ankahi_manzil")
    level = getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO)
    logger.setLevel(level)

    # Avoid duplicate handlers
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(level)
        formatter = SensitiveMaskingFormatter(
            "[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    return logger


logger = setup_logging()
