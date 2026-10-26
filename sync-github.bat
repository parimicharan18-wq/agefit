@echo off
title AgeFit Sync to GitHub
cd /d "%~dp0"

echo ========================================================
echo   AgeFit - Syncing with GitHub (parimicharan18-wq/agefit)
echo ========================================================
echo.

:: 1. Pull latest changes from remote
echo [1/3] Pulling latest changes from GitHub...
git pull origin main

:: 2. Stage all modifications and additions
echo.
echo [2/3] Staging changes...
git add -A

:: 3. Commit and push if there are changes
git diff-index --quiet HEAD --
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [3/3] Changes detected. Committing and pushing to GitHub...
    set /p commitMsg="Enter commit message (or press Enter for auto-update): "
    if "%commitMsg%"=="" set commitMsg="Update AgeFit features and improvements"
    git commit -m "%commitMsg%"
    git push origin main
    echo.
    echo Successfully synced and pushed to GitHub!
) else (
    echo.
    echo Everything is already up to date with GitHub.
)

echo.
pause
