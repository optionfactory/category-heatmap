build-in-docker: USERID:=$(shell id -u)
build-in-docker: GROUPID:=$(shell id -g)
build-in-docker: CURRENTDIR:=$(shell pwd)
build-in-docker:
	docker run --user $(USERID):$(GROUPID) -it --rm -v "$(CURRENTDIR):/work" node:10 bash -c "cd /work && yarn global add  @grafana/toolkit && yarn install && yarn build"

watch-in-docker: USERID:=$(shell id -u)
watch-in-docker: GROUPID:=$(shell id -g)
watch-in-docker: CURRENTDIR:=$(shell pwd)
watch-in-docker:
	docker run --user $(USERID):$(GROUPID) -it --rm -v "$(CURRENTDIR):/work" node:10 bash -c "cd /work && yarn global add  @grafana/toolkit && yarn install && yarn watch"