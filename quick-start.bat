@echo off
title Sarmad Accounting System - Quick Start
color 0B

echo.
echo ================================================================
echo     Sarmad Accounting System - Quick Start
echo     (No additional server installation required)
echo ================================================================
echo.

:: Check if dist folder exists
if not exist "dist" (
    echo [INFO] dist folder not found. Building project...
    echo.
    call npm run build
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Failed to build project!
        pause
        exit /b 1
    )
    echo.
)

:: Check if node_modules exists
if not exist "node_modules" (
    echo [INFO] Dependencies not installed. Installing...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
    echo.
)

echo ================================================================
echo [INFO] Starting server with Vite Preview...
echo ================================================================
echo.
echo The application will be available at:
echo.
echo     http://localhost:4173
echo.
echo To stop the server, press Ctrl+C
echo.
echo ================================================================
echo.

:: Try to open browser after a delay
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:4173"

:: Run Vite preview
call npx vite preview --port 4173

pause
