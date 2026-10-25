@echo off
title AgeFit Desktop Self-Healing Launcher
cd /d "%~dp0"

:: 1. Self-Healing Port Check: Free any stale or zombie processes on port 5173
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173 ^| findstr LISTENING 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)

:: 2. Start the local background Vite server reliably
start "" /b npm run dev -- --port 5173 --host
timeout /t 2 /nobreak >nul

:: 3. Launch dedicated standalone desktop application window
start msedge.exe --app=http://localhost:5173 --window-size=1280,850
exit
