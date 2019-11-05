FROM ubuntu

# Installing dependencies in the container

RUN apt-get update && \
    apt-get install -y python3 && \
    apt-get install -y python3-flask && \
    apt-get install -y python3-flask-api && \
    apt-get install -y python3-flask-restful && \
    apt-get install -y python3-requests && \
    apt-get install -y curl

# Copying all files except Javascript ones.

ADD web-notes/*.py /web-notes/
ADD web-notes/*.html /web-notes/
ADD web-notes/*.css /web-notes/

# Adding the main client Javascript file.

ADD web-notes/script.js /web-notes

# Adding only the production version of the REST API client.

ADD web-notes/rest_api_prod.js /web-notes/rest_api.js

# Adding the CLI tools.

COPY cli-tools /cli-tools

# Adding the integration test scripts

COPY tests /tests

# Preparing the runtime environment

ENV LC_ALL=C.UTF-8
ENV export LANG=C.UTF-8
ENV PATH=${PATH}:/cli-tools

# Exposing HTTP port 5000

EXPOSE 5000

# Setting the container process to be the Flask app

CMD python3 /web-notes/flask_app.py
