include .env
export $(shell sed 's/=.*//' .env)


all: up migrations

restart:
ifdef svc
	docker-compose  stop $(svc) && docker-compose  up --build -d $(svc)
else
	docker-compose restart
endif
.PHONY: restart

ps:
	docker-compose ps
.PHONY: ps

logs:
ifdef svc
	docker-compose logs -f $(svc)
else
	docker-compose logs -f
endif
.PHONY: logs

up:
ifdef svc
	docker-compose up -d --build $(svc)
else
	docker-compose up -d --build
endif
.PHONY: up

rebuild:
	 docker-compose up --build --force-recreate --no-deps
.PHONY: rebuild

rm:
ifdef svc
	docker stop $(svc) && docker rm $(svc)
else
	docker-compose down
endif
.PHONY: rm