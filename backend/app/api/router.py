from fastapi import APIRouter
from app.api.routes.health import router as health_router
from app.api.routes.destinations import router as destinations_router
from app.api.routes.trips import router as trips_router
from app.api.routes.disruptions import router as disruptions_router
from app.api.routes.manzilo import router as manzilo_router
from app.api.routes.profile import router as profile_router

api_router = APIRouter()

api_router.include_router(health_router)
api_router.include_router(destinations_router)
api_router.include_router(trips_router)
api_router.include_router(disruptions_router)
api_router.include_router(manzilo_router)
api_router.include_router(profile_router)
