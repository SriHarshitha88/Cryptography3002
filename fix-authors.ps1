$Env:GIT_AUTHOR_NAME="SriHarshitha88"
$Env:GIT_AUTHOR_EMAIL="168890205+SriHarshitha88@users.noreply.github.com"
$Env:GIT_COMMITTER_NAME="SriHarshitha88"
$Env:GIT_COMMITTER_EMAIL="168890205+SriHarshitha88@users.noreply.github.com"

git checkout -b temp-branch
git add .
git commit --amend --reset-author --no-edit
git checkout main
git reset --hard temp-branch
git branch -D temp-branch
git push -f origin main 