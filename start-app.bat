@echo off
title AgeFit Desktop
cd /d "%~dp0"

:: Check if Vite live dev server is running on port 5173
netstat -ano | findstr :5173 | findstr LISTENING >nul
if %errorlevel% neq 0 (
    start "" /b npm run dev -- --port 5173 --host
    timeout /t 2 /nobreak >nul
)

:: Launch standalone application window connected to live HMR dev server
start msedge.exe --app=http://localhost:5173 --window-size=1280,850
exit
