REPO_NAME ?= test-repo-deploy
GITHUB_USER ?= wiieeDev
SSH_HOST ?= github-wiiee
VISIBILITY ?= public
MAIN_BRANCH ?= main

.PHONY: all repo push deploy-pages

all: repo push deploy-pages

repo:
	@gh repo view $(GITHUB_USER)/$(REPO_NAME) >/dev/null 2>&1 || \
		gh repo create $(GITHUB_USER)/$(REPO_NAME) --$(VISIBILITY)
	@git remote get-url origin >/dev/null 2>&1 || \
		git remote add origin git@$(SSH_HOST):$(GITHUB_USER)/$(REPO_NAME).git

push: repo
	@git add .
	@git commit -m "Initial commit" || true
	@git push -u origin $(MAIN_BRANCH)

deploy-pages: push
	@git worktree add -B gh-pages .gh-pages 2>/dev/null || true
	@find .gh-pages -mindepth 1 ! -name ".git" -exec rm -rf {} +
	@find . -maxdepth 1 ! -name ".git" ! -name ".gh-pages" ! -name "Makefile" -exec cp -R {} .gh-pages/ \;
	@touch .gh-pages/.nojekyll
	@cd .gh-pages && git add -A && git commit -m "Deploy static files" || true
	@cd .gh-pages && git push origin gh-pages --force
	@git worktree remove .gh-pages --force
	@gh api -X POST repos/$(GITHUB_USER)/$(REPO_NAME)/pages \
		-f source[branch]=gh-pages \
		-f source[path]=/ >/dev/null 2>&1 || \
	 gh api -X PUT repos/$(GITHUB_USER)/$(REPO_NAME)/pages \
		-f source[branch]=gh-pages \
		-f source[path]=/ >/dev/null
	@echo "https://$(GITHUB_USER).github.io/$(REPO_NAME)/"