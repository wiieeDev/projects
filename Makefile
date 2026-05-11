REPO_NAME ?= my-repo
VISIBILITY ?= public # private | public
BUILD_DIR ?= dist
MAIN_BRANCH ?= main

OWNER := $(shell gh api user -q .login 2>/dev/null)

.PHONY: init install-gh auth repo push build deploy-pages pages all

all: init repo push deploy-pages

install-gh:
	@command -v gh >/dev/null 2>&1 || brew install gh

auth: install-gh
	@gh auth status >/dev/null 2>&1 || (echo "GitHub 로그인이 필요합니다: gh auth login" && exit 1)

init:
	@git rev-parse --is-inside-work-tree >/dev/null 2>&1 || git init
	@git branch -M $(MAIN_BRANCH)

repo: auth
	@gh repo view $(OWNER)/$(REPO_NAME) >/dev/null 2>&1 || \
		gh repo create $(REPO_NAME) --$(VISIBILITY) --source=. --remote=origin
	@git remote get-url origin >/dev/null 2>&1 || \
		git remote add origin git@github.com:$(OWNER)/$(REPO_NAME).git

push: repo
	@git add .
	@git commit -m "Initial commit" || true
	@git push -u origin $(MAIN_BRANCH)

build:
	@npm run build

deploy-pages: push build
	@git fetch origin gh-pages || true
	@git worktree add -B gh-pages .gh-pages origin/gh-pages 2>/dev/null || \
		git worktree add -B gh-pages .gh-pages
	@rm -rf .gh-pages/*
	@cp -R $(BUILD_DIR)/. .gh-pages/
	@touch .gh-pages/.nojekyll
	@cd .gh-pages && git add -A && git commit -m "Deploy GitHub Pages" || true
	@cd .gh-pages && git push origin gh-pages --force
	@git worktree remove .gh-pages --force
	@gh api -X POST repos/$(OWNER)/$(REPO_NAME)/pages \
		-f source[branch]=gh-pages \
		-f source[path]=/ >/dev/null 2>&1 || \
	 gh api -X PUT repos/$(OWNER)/$(REPO_NAME)/pages \
		-f source[branch]=gh-pages \
		-f source[path]=/ >/dev/null
	@echo "배포 완료: https://$(OWNER).github.io/$(REPO_NAME)/"