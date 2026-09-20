import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from app.core.config import settings
from app.core.logging import logger
from app.core.errors import (
    AppException,
    app_exception_handler,
    http_exception_handler,
    validation_exception_handler,
    generic_exception_handler
)
from app.api.router import api_router

app = FastAPI(
    title="Ankahi Manzil Travel Intelligence Backend",
    description="Production-grade agentic travel engine featuring deterministic budgeting, Sentinel monitoring, and Manzilo multi-agent reasoning.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]
if settings.FRONTEND_URL and settings.FRONTEND_URL not in allowed_origins:
    allowed_origins.append(settings.FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request logging & latency middleware
@app.middleware("http")
async def log_requests_middleware(request: Request, call_next):
    start_time = time.time()
    path = request.url.path
    method = request.method

    try:
        response = await call_next(request)
        latency_ms = round((time.time() - start_time) * 1000, 2)
        logger.info(f"{method} {path} - Status: {response.status_code} - Latency: {latency_ms}ms")
        return response
    except Exception as exc:
        latency_ms = round((time.time() - start_time) * 1000, 2)
        logger.error(f"{method} {path} - Failed after {latency_ms}ms: {str(exc)}")
        raise exc


# Exception Handlers
app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

# Include all routes under /api
app.include_router(api_router, prefix="/api")


@app.get("/")
def root():
    return {
        "service": "Ankahi Manzil Backend",
        "status": "online",
        "docs": "/docs",
        "apiPrefix": "/api"
    }
