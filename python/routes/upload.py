
from fastapi import APIRouter, UploadFile, File, HTTPException
from PIL import Image
import io
import base64

router = APIRouter()

ALLOWED = {"image/jpeg", "image/png", "image/webp", "image/avif", "image/heic"}
MAX_BYTES = 10 * 1024 * 1024   
MAX_DIM = 1200                 
JPEG_QUALITY = 75            


def compress_to_data_url(data: bytes) -> str:
    """Resize + compress to JPEG, return as base64 data URL."""
    img = Image.open(io.BytesIO(data))

    if img.mode in ("RGBA", "P", "LA"):
        bg = Image.new("RGB", img.size, (255, 255, 255))
        bg.paste(img, mask=img.split()[-1] if img.mode in ("RGBA", "LA") else None)
        img = bg
    elif img.mode != "RGB":
        img = img.convert("RGB")

    if max(img.size) > MAX_DIM:
        img.thumbnail((MAX_DIM, MAX_DIM), Image.LANCZOS)

    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=JPEG_QUALITY, optimize=True)

    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    return f"data:image/jpeg;base64,{b64}"


@router.post("/")
async def upload_image(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED:
        raise HTTPException(400, f"Unsupported type: {file.content_type}")

    contents = await file.read()
    if len(contents) > MAX_BYTES:
        raise HTTPException(400, "File too large (max 10 MB)")

    try:
        data_url = compress_to_data_url(contents)
    except Exception as e:
        raise HTTPException(400, f"Image processing failed: {e}")

    return {"url": data_url}