@echo off
title AgeFit Desktop Self-Healing Dev Launcher
cd /d "%~dp0"

:: 1. Clear any stale process on port 5173
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173 ^| findstr LISTENING 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)

:: 2. Start Vite Dev server with hot-reload in persistent background
start "AgeFit-Dev-Server" /min cmd /c "npm run dev -- --port 5173 --host"
timeout /t 2 /nobreak >nul

:: 3. Launch dedicated standalone desktop application window
start msedge.exe --app=http://localhost:5173 --window-size=1280,850
exit
