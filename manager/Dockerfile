FROM python:3.9
LABEL maintainer="Cesar Orozco Zamora. caesar.orz@gmail.com"

ENV PYTHONUNBUFFERED 1
WORKDIR /app

COPY ./manager/requirements.txt /app/requirements.txt
COPY ./manager/scripts /scripts
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r requirements.txt && \
    chmod -R -x /scripts && \
    mkdir -p /vol/web/media && \
    mkdir -p /vol/web/static && \
    adduser \
        --disabled-password \
        --no-create-home \
        django-user && \
    chown -R django-user:django-user /vol && \
    chmod -R 755 /vol && \
    chmod -R +x /scripts

COPY ./manager /app/

ENV PATH="/scripts:/py/bin:$PATH"

USER django-user
CMD ["run.sh"]