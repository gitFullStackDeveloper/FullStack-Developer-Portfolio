"""
One-time migration:
- Removes base64 strings from `image` and `images` fields.
- Replaces them with "" (empty) so admin can re-upload via Cloudinary.
Run: python -m scripts.clean_base64
"""
import asyncio
from bson import ObjectId
from config import database


async def main():
    coll = database["projects"]
    cursor = coll.find({}).allow_disk_use(True)
    projects = await cursor.to_list(1000)
    print(f"Scanning {len(projects)} projects…")

    for p in projects:
        update = {}
        img = p.get("image", "")
        if isinstance(img, str) and img.startswith("data:"):
            update["image"] = ""
            print(f"  ▸ {p.get('title')}: main image → cleared")

        imgs = p.get("images", []) or []
        cleaned = [i for i in imgs if not (isinstance(i, str) and i.startswith("data:"))]
        if len(cleaned) != len(imgs):
            update["images"] = cleaned
            print(f"  ▸ {p.get('title')}: {len(imgs) - len(cleaned)} gallery image(s) → cleared")

        if update:
            await coll.update_one({"_id": p["_id"]}, {"$set": update})

    print("✅ Done. Re-upload images from admin panel (they'll go to Cloudinary now).")


if __name__ == "__main__":
    asyncio.run(main())