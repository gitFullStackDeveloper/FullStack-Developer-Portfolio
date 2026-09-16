from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import uvicorn
from routes.projects import router as projects_router
from routes.services import router as services_router
from routes.contacts import router as contacts_router
from routes.settings import router as settings_router
from routes.auth import router as auth_router
from routes.chat import router as chat_router
from routes.analytics import router as analytics_router
from routes.certificates import router as certificates_router
from routes.upload import router as upload_router

app = FastAPI(title="Portfolio Admin API")

from fastapi.staticfiles import StaticFiles
import os
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # "http://localhost:5173",
        "https://microzee-solutions-three.vercel.app",
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth")
app.include_router(projects_router, prefix="/api/projects")
app.include_router(services_router, prefix="/api/services")
app.include_router(contacts_router, prefix="/api/contacts")
app.include_router(settings_router, prefix="/api/settings")
app.include_router(chat_router, prefix="/api/chat/support")
app.include_router(analytics_router, prefix="/api/analytics")
app.include_router(certificates_router, prefix="/api/certificates")
app.include_router(upload_router, prefix="/api/upload")

@app.on_event("startup")
async def create_indexes():
    """Create indexes once at startup (safe: only creates if missing)."""
    from config import database
    try:
        await database["projects"].create_index("created_at")
        await database["projects"].create_index("hidden")

        await database["services"].create_index("created_at")
        await database["services"].create_index("slug", unique=False)  

        print("✅ Indexes ready")
    except Exception as e:
        print(f"⚠️ Index setup failed: {e}")

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)