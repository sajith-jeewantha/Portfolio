FROM python:3.11-slim
LABEL authors="sajithjeewantha"

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["sh", "-c", "python manage.py migrate --noinput && gunicorn portfolio.wsgi:application --bind 0.0.0.0:$PORT"]

