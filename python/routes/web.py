from fastapi import APIRouter
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import os

router = APIRouter()

FRONTEND_BUILD = os.path.join(os.path.dirname(__file__), "..", "..", "react", "dist")

if os.path.exists(FRONTEND_BUILD):
    assets_path = os.path.join(FRONTEND_BUILD, "assets")
    if os.path.exists(assets_path):
        router.mount("/assets", StaticFiles(directory=assets_path), name="assets")

@router.get("/{full_path:path}")
async def serve_react(full_path: str):
    """
    For any request that is NOT an API call, return index.html.
    React Router will handle the rest.
    """
    index_file = os.path.join(FRONTEND_BUILD, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"error": "Frontend not built. Run 'npm run build' in the frontend folder."}