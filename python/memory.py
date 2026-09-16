from typing import List, Dict

class MemoryManager:
    """Simple in‑memory conversation history per session."""

    def __init__(self):
        self._storage: Dict[str, List[dict]] = {}

    def get_history(self, session_id: str) -> List[dict]:
        return self._storage.get(session_id, [])

    def add_turn(self, session_id: str, role: str, content: str):
        if session_id not in self._storage:
            self._storage[session_id] = []
        self._storage[session_id].append({
            "role": role,
            "parts": [{"text": content}]
        })

    def clear(self, session_id: str):
        if self._storage:
            del self._storage[session_id]

    @staticmethod
    def get_initial_messages() -> List[dict]:
        """Return the system prompt and the bot's opening greeting."""
        system_prompt = (
    "You are ZeeBot, a helpful support agent for a professional web developer's portfolio website. "
    "You have live access to the entire website – services, projects, pricing, contact info, tech stack, "
    "and even site statistics. Use this data to answer user questions accurately and concisely. "
    "Always be friendly, professional, and concise. If you don't know the answer, suggest contacting "
    "the developer via the contact form."
)
        greeting = "Hi! I'm ZeeBot, how can I help you today?"

        return [
            {"role": "user", "parts": [{"text": system_prompt}]},
            {"role": "model", "parts": [{"text": greeting}]}
        ]

memory = MemoryManager()