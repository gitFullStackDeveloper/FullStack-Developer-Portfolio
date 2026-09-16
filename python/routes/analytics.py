from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from config import database
from bson import ObjectId
from datetime import datetime, timedelta, timezone
from typing import List, Optional
from routes.auth import get_current_user

router = APIRouter()
collection = database["analytics_views"]

class ViewEvent(BaseModel):
    page_type: str
    item_id: str = None
    path: str

def event_helper(event) -> dict:
    return {
        "id": str(event["_id"]),
        "page_type": event["page_type"],
        "item_id": event.get("item_id"),
        "path": event.get("path", ""),
        "timestamp": event["timestamp"].isoformat()
    }

@router.post("/view")
async def record_view(view: ViewEvent):
    view_dict = view.dict()
    view_dict["timestamp"] = datetime.utcnow()
    result = await collection.insert_one(view_dict)
    return {"message": "View recorded", "id": str(result.inserted_id)}

@router.get("/summary")
async def get_summary(
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
    interval: str = Query("day", pattern="^(day|month)$"),
    current_user: dict = Depends(get_current_user)
):
    try:
        now = datetime.utcnow()

        # Parse dates or set defaults
        if start_date:
            start_dt = datetime.fromisoformat(start_date.replace('Z', '+00:00'))
        else:
            if interval == "month":
                start_dt = now - timedelta(days=365)   # last 12 months
            else:
                start_dt = now - timedelta(days=7)     # last 7 days

        if end_date:
            end_dt = datetime.fromisoformat(end_date.replace('Z', '+00:00'))
        else:
            end_dt = now

        if start_dt > end_dt:
            start_dt, end_dt = end_dt, start_dt

        match_filter = {
            "timestamp": {
                "$gte": start_dt,
                "$lte": end_dt
            }
        }

        # Total views
        total_views = await collection.count_documents(match_filter)

        # Top pages
        top_pages_raw = await collection.aggregate([
            {"$match": match_filter},
            {"$group": {"_id": "$path", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 10}
        ]).to_list(10)
        top_pages = [{"path": item["_id"], "views": item["count"]} for item in top_pages_raw]

        # Top services
        top_services_raw = await collection.aggregate([
            {"$match": {**match_filter, "page_type": "service"}},
            {"$group": {"_id": "$item_id", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 10}
        ]).to_list(10)
        services_collection = database["services"]
        top_services = []
        for item in top_services_raw:
            service = None
            if item["_id"]:
                service = await services_collection.find_one({"_id": ObjectId(item["_id"])})
            top_services.append({
                "id": item["_id"] if item["_id"] else None,
                "title": service["title"] if service else "Unknown",
                "views": item["count"]
            })

        # Top projects
        top_projects_raw = await collection.aggregate([
            {"$match": {**match_filter, "page_type": "project"}},
            {"$group": {"_id": "$item_id", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 10}
        ]).to_list(10)
        projects_collection = database["projects"]
        top_projects = []
        for item in top_projects_raw:
            project = None
            if item["_id"]:
                project = await projects_collection.find_one({"_id": ObjectId(item["_id"])})
            top_projects.append({
                "id": item["_id"] if item["_id"] else None,
                "title": project["title"] if project else "Unknown",
                "views": item["count"]
            })

        # Time series (daily or monthly)
        if interval == "month":
            group_format = "%Y-%m"
            date_label_format = "%b %Y"
        else:
            group_format = "%Y-%m-%d"
            date_label_format = "%b %d"

        time_series_raw = await collection.aggregate([
            {"$match": match_filter},
            {"$group": {
                "_id": {"$dateToString": {"format": group_format, "date": "$timestamp"}},
                "count": {"$sum": 1}
            }},
            {"$sort": {"_id": 1}}
        ]).to_list(None)

        time_series = []
        for item in time_series_raw:
            if interval == "month":
                year_month = item["_id"].split("-")
                label = datetime(int(year_month[0]), int(year_month[1]), 1).strftime("%b %Y")
            else:
                date_obj = datetime.strptime(item["_id"], "%Y-%m-%d")
                label = date_obj.strftime("%b %d")
            time_series.append({"date": item["_id"], "label": label, "count": item["count"]})

        filled_series = []
        if interval == "day":
            delta = timedelta(days=1)
            current = start_dt
            while current <= end_dt:
                date_key = current.strftime("%Y-%m-%d")
                existing = next((x for x in time_series if x["date"] == date_key), None)
                label = current.strftime("%b %d")
                filled_series.append({
                    "date": date_key,
                    "label": label,
                    "count": existing["count"] if existing else 0
                })
                current += delta
        else:
            current = start_dt.replace(day=1)
            end_month = end_dt.replace(day=1)
            while current <= end_month:
                month_key = current.strftime("%Y-%m")
                existing = next((x for x in time_series if x["date"] == month_key), None)
                label = current.strftime("%b %Y")
                filled_series.append({
                    "date": month_key,
                    "label": label,
                    "count": existing["count"] if existing else 0
                })
                month = current.month
                year = current.year
                if month == 12:
                    current = datetime(year + 1, 1, 1)
                else:
                    current = datetime(year, month + 1, 1)

        time_series = filled_series

        distribution_raw = await collection.aggregate([
            {"$match": match_filter},
            {"$group": {"_id": "$page_type", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]).to_list(None)
        page_type_distribution = [{"page_type": item["_id"], "count": item["count"]} for item in distribution_raw]

        num_periods = len(time_series) if time_series else 1
        avg_views = round(total_views / num_periods, 1) if total_views > 0 else 0

        return {
            "total_views": total_views,
            "avg_views_per_period": avg_views,
            "top_pages": top_pages,
            "top_services": top_services,
            "top_projects": top_projects,
            "time_series": time_series,
            "page_type_distribution": page_type_distribution,
            "interval": interval,
            "start_date": start_dt.isoformat(),
            "end_date": end_dt.isoformat(),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))