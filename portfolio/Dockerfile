FROM python:3.12-slim
LABEL authors="sajithjeewantha"

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies for mysqlclient and Pillow
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    libssl-dev \
    libffi-dev \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Upgrade pip and install Python packages
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Cloud Run port
ENV PORT=8000

#CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]

#Run migrations and start Gunicorn
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn portfolio.wsgi:application --bind 0.0.0.0:$PORT --workers 2"]

#CMD ["gunicorn", "portfolio.wsgi:application", "--bind", "0.0.0.0:8000"]
