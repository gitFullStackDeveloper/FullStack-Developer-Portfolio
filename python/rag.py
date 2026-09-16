from config import database

async def get_relevant_context(user_message: str) -> str:
    """Fetch real‑time data from all portfolio collections based on keywords."""
    lower_msg = user_message.lower()
    context_parts = []

    if any(word in lower_msg for word in ["service", "offer", "pricing", "web", "app", "ai", "automation", "design", "develop", "build", "create"]):
        services = await database["services"].find().to_list(50)
        if services:
            service_list = "\n".join([
                f"- {s['title']}: {s.get('description','')} (Category: {s.get('category','')})"
                for s in services
            ])
            context_parts.append(f"Available Services:\n{service_list}")

    if any(word in lower_msg for word in ["project", "portfolio", "previous", "work", "experience", "past", "case study", "showcase"]):
        projects = await database["projects"].find().to_list(20)
        if projects:
            project_list = "\n".join([
                f"- {p['title']}: {p.get('desc','')} (Technologies: {', '.join(p.get('tech',[]))})"
                for p in projects
            ])
            context_parts.append(f"Projects:\n{project_list}")

    if any(word in lower_msg for word in ["contact", "email", "phone", "reach", "message", "meeting", "schedule", "call", "appointment", "book", "calendar"]):
        settings_doc = await database["settings"].find_one({"_id": "global"})
        if settings_doc:
            meeting = settings_doc.get("meeting", {})
            social = settings_doc.get("social_links", [])
            time_slots = meeting.get("time_slots", [])
            allowed_days = meeting.get("allowed_days", [])
            contact_info = (
                "You can reach the developer via the contact form on the website. "
                "Meetings can be scheduled through the project details form. "
                f"Available days: {', '.join(map(str, allowed_days)) if allowed_days else 'weekdays'}. "
                f"Typical time slots: {', '.join(time_slots[:5]) if time_slots else 'flexible'}."
            )
            if social:
                social_list = ", ".join([f"{s['name']} ({s['url']})" for s in social])
                contact_info += f" Social profiles: {social_list}."
            context_parts.append(contact_info)

    if any(word in lower_msg for word in ["skill", "tech", "stack", "react", "python", "mongodb", "javascript", "node", "tool", "framework"]):
        projects = await database["projects"].find().to_list(50)
        all_tech = set()
        for p in projects:
            for t in p.get("tech", []):
                all_tech.add(t)
        tech_str = ", ".join(sorted(all_tech)) if all_tech else "React, Python, MongoDB, Node.js"
        context_parts.append(
            f"Tech Stack & Skills: The developer works with {tech_str}. "
            "He also uses modern tools like Docker, Git, and Tailwind CSS."
        )

    if any(word in lower_msg for word in ["price", "cost", "budget", "cheap", "expensive", "how much", "quote", "estimate"]):
        context_parts.append(
            "Pricing: The developer offers custom quotes based on project scope. "
            "Visitors can fill the project details form to get a free estimate. "
            "Typical budgets range from $1K for small websites to $25K+ for complex applications."
        )

    if any(word in lower_msg for word in ["about", "developer", "who", "yourself", "background", "bio", "location"]):
        context_parts.append(
            "About the Developer: A professional full‑stack web developer based in New York, USA. "
            "He specializes in modern web applications, mobile apps, AI integrations, and UI/UX design. "
            "He has several years of experience and has worked on multiple client projects."
        )

    if any(word in lower_msg for word in ["admin", "account", "user", "stats", "how many", "total"]):
        users_count = await database["users"].count_documents({})
        services_count = await database["services"].count_documents({})
        projects_count = await database["projects"].count_documents({})
        contacts_count = await database["contacts"].count_documents({})
        context_parts.append(
            f"Website Stats: {services_count} services, {projects_count} projects, "
            f"{contacts_count} contact submissions, and {users_count} admin accounts."
        )

    if context_parts:
        return "\n\n".join(context_parts)
    return ""