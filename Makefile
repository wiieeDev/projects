REPO_NAME ?= test-repo-deploy
GITHUB_USER ?= wiieeDev
SSH_HOST ?= github-wiiee

VISIBILITY ?= public
MAIN_BRANCH ?= main
BUILD_DIR ?= dist

.PHONY: all install-gh auth init repo push build deploy-pages clean

all: init repo push deploy-pages

install-gh:
	@command -v gh >/dev/null 2>&1 || brew install gh

auth: install-gh
	@gh auth status >/dev/null 2>&1 || (echo "GitHub CLI 로그인 필요: gh auth login" && exit 1)

init:
	@git rev-parse --is-inside-work-tree >/dev/null 2>&1 || git init
	@git branch -M $(MAIN_BRANCH)

repo: auth
	@gh repo view $(GITHUB_USER)/$(REPO_NAME) >/dev/null 2>&1 || \
		gh repo create $(GITHUB_USER)/$(REPO_NAME) --$(VISIBILITY)

	@github_url="git@$(SSH_HOST):$(GITHUB_USER)/$(REPO_NAME).git"; \
	if git remote get-url origin >/dev/null 2>&1; then \
		git remote set-url origin $$github_url; \
	else \
		git remote add origin $$github_url; \
	fi

	@echo "Remote:"
	@git remote -v

push: repo
	@git add .
	@git commit -m "Initial commit" || true
	@git push -u origin $(MAIN_BRANCH)

build:
	@npm install
	@npm run build

deploy-pages: push build
	@git fetch origin gh-pages || true

	@git worktree add -B gh-pages .gh-pages origin/gh-pages 2>/dev/null || \
		git worktree add -B gh-pages .gh-pages

	@rm -rf .gh-pages/*
	@cp -R $(BUILD_DIR)/. .gh-pages/
	@touch .gh-pages/.nojekyll

	@cd .gh-pages && git add -A
	@cd .gh-pages && git commit -m "Deploy GitHub Pages" || true
	@cd .gh-pages && git push origin gh-pages --force

	@git worktree remove .gh-pages --force

	@gh api -X POST repos/$(GITHUB_USER)/$(REPO_NAME)/pages \
		-f source[branch]=gh-pages \
		-f source[path]=/ >/dev/null 2>&1 || \
	gh api -X PUT repos/$(GITHUB_USER)/$(REPO_NAME)/pages \
		-f source[branch]=gh-pages \
		-f source[path]=/ >/dev/null

	@echo ""
	@echo "GitHub Pages 배포 완료:"
	@echo "https://$(GITHUB_USER).github.io/$(REPO_NAME)/"

clean:
	@rm -rf .gh-pages