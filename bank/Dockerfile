FROM python:3.9-buster
WORKDIR /bank
COPY . .
RUN pip install django djangorestframework
RUN python manage.py migrate
CMD ["python", "manage.py", "runserver"]
