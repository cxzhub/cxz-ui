#!/usr/bin/env sh

# 忽略错误
set -e

# 构建
pnpm  docs:build

# 进入待发布的目录
cd docs/.vitepress/dist


git init
git add -A
git commit -m 'deploy'

# 如果是部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:cxzhub/cxz-ui.git master:gh-pages

cd -
