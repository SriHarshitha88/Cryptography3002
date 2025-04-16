$env:GIT_FILTER_BRANCH_SKIP_WARNINGS = "1"

git filter-branch --force --env-filter @'
    if ($env:GIT_COMMITTER_NAME -eq "lovable-dev[bot]") {
        $env:GIT_COMMITTER_NAME = "SriHarshitha88"
        $env:GIT_COMMITTER_EMAIL = "168890205+SriHarshitha88@users.noreply.github.com"
    }
    if ($env:GIT_AUTHOR_NAME -eq "lovable-dev[bot]") {
        $env:GIT_AUTHOR_NAME = "SriHarshitha88"
        $env:GIT_AUTHOR_EMAIL = "168890205+SriHarshitha88@users.noreply.github.com"
    }
'@ --tag-name-filter cat -- --all 