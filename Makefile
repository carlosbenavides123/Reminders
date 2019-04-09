# makefile

start-dev:
	docker-compose  up
start-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
stop-compose:
	@eval docker stop $$(docker ps -a -q)
	docker-compose down
ssh-nginx:
	docker exec -it nginx_server bash
ssh-django-web:
	docker exec -it django_web bash
ssh-db:
	docker exec -it db bash
build-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
build-dev:
	docker-compose build