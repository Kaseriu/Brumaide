include .env
export $(shell sed 's/=.*//' .env)


API_IMAGE=quay.io/brumaide/api
API_DOCKERFILE=api/Dockerfile
API_TAG=latest
API_BUILD_DIR=api

APP_IMAGE=quay.io/brumaide/app
APP_DOCKERFILE=app/Dockerfile
APP_TAG=latest
APP_BUILD_DIR=app


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

_build-docker:
	docker build -t $(IMAGE):$(TAG) -f $(DOCKERFILE) $(BUILD_DIR)
.PHONY: _build-docker

_deploy-docker:
	docker push $(IMAGE):$(TAG)
.PHONY: _deploy-docker

build-api:
	$(MAKE) _build-docker IMAGE=$(API_IMAGE) DOCKERFILE=$(API_DOCKERFILE) TAG=$(API_TAG) BUILD_DIR=$(API_BUILD_DIR)
.PHONY: build-api

deploy-api:
	$(MAKE) _deploy-docker IMAGE=$(API_IMAGE) TAG=$(API_TAG)
.PHONY: deploy-api

build-app:
	$(MAKE) _build-docker IMAGE=$(APP_IMAGE) DOCKERFILE=$(APP_DOCKERFILE) TAG=$(APP_TAG) BUILD_DIR=$(APP_BUILD_DIR)
.PHONY: build-app

deploy-app:
	$(MAKE) _deploy-docker IMAGE=$(APP_IMAGE) TAG=$(APP_TAG)
.PHONY: deploy-app
