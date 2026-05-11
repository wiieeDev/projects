REPO_NAME ?= test-repo-deploy
GITHUB_USER ?= wiieeDev
SSH_HOST ?= github-wiiee

VISIBILITY ?= public
MAIN_BRANCH ?= main

.PHONY: all repo push deploy-pages clean

all: repo push deploy-pages

repo:
	@gh repo view $(GITHUB_USER)/$(REPO_NAME) >/dev/null 2>&1 || \
		gh repo create $(GITHUB_USER)/$(REPO_NAME) --$(VISIBILITY)

	@github_url="git@$(SSH_HOST):$(GITHUB_USER)/$(REPO_NAME).git"; \
	if git remote get-url origin >/dev/null 2>&1; then \
		git remote set-url origin $$github_url; \
	else \
		git remote add origin $$github_url; \
	fi

	@echo ""
	@echo "Remote:"
	@git remote -v
	@echo ""

push: repo
	@git add .
	@git commit -m "Initial commit" || true
	@git push -u origin $(MAIN_BRANCH)

deploy-pages: push
	@rm -rf .gh-pages

	@git fetch origin gh-pages >/dev/null 2>&1 || true

	@if git show-ref --verify --quiet refs/remotes/origin/gh-pages; then \
		git worktree add .gh-pages origin/gh-pages; \
	else \
		git worktree add --orphan .gh-pages; \
	fi

	@find .gh-pages -mindepth 1 ! -name ".git" -exec rm -rf {} +

	@rsync -av \
		--exclude='.git' \
		--exclude='.gh-pages' \
		--exclude='Makefile' \
		./ .gh-pages/

	@touch .gh-pages/.nojekyll

	@cd .gh-pages && git add -A
	@cd .gh-pages && git commit -m "Deploy GitHub Pages" || true
	@cd .gh-pages && git branch -M gh-pages
	@cd .gh-pages && git push origin gh-pages --force

	@git worktree remove .gh-pages --force

	@gh api -X POST repos/$(GITHUB_USER)/$(REPO_NAME)/pages \
		-f source[branch]=gh-pages \
		-f source[path]=/ >/dev/null 2>&1 || \
	gh api -X PUT repos/$(GITHUB_USER)/$(REPO_NAME)/pages \
		-f source[branch]=gh-pages \
		-f source[path]=/ >/dev/null 2>&1 || true

	@echo ""
	@echo "======================================="
	@echo "GitHub Pages Deploy Complete"
	@echo "https://$(GITHUB_USER).github.io/$(REPO_NAME)/"
	@echo "======================================="

clean:
	@rm -rf .gh-pages