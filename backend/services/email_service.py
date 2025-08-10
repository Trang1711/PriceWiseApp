import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr

def send_email(to: str, subject: str, body: str):
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    smtp_user = "duonghoangsamet@gmail.com"
    smtp_password = "excj cnvw xbes dbao"

    msg = MIMEText(body, "html", "utf-8")
    msg["Subject"] = subject
    msg["From"] = formataddr(("PriceWiseApp", smtp_user)) 
    msg["To"] = to

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
