import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import asyncio
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")

def send_email_sync(to: str, subject: str, body: str):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_HOST_USER
    msg['To'] = to
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    try:
        with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
            server.starttls()
            server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
            server.sendmail(EMAIL_HOST_USER, [to], msg.as_string())
    except Exception as e:
        print(f"Failed to send email to {to}: {e}")

async def send_email(to: str, subject: str, body: str):
    await asyncio.to_thread(send_email_sync, to, subject, body)

def parse_meeting_datetime(meeting_date_str: str, meeting_time_str: str):
    """Parse frontend strings like 'Friday, July 24' and '09:30 AM' into datetime."""
    now = datetime.utcnow()
    parts = meeting_date_str.split(', ')
    if len(parts) > 1:
        month_day = parts[1]
    else:
        month_day = parts[0]
    try:
        dt = datetime.strptime(f"{month_day} {now.year}", "%B %d %Y")
    except:
        dt = now + timedelta(days=1)  # fallback
    time_str = meeting_time_str.strip()
    try:
        t = datetime.strptime(time_str, "%I:%M %p").time()
    except:
        t = now.time()
    meeting_dt = datetime.combine(dt.date(), t)
    if meeting_dt < now:
        meeting_dt = meeting_dt.replace(year=now.year + 1)
    return meeting_dt