@echo off
title Sarmad Accounting System - Development Mode
color 0E

echo.
echo ================================================================
echo     Sarmad Accounting System - Development Mode
echo ================================================================
echo.

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
echo [INFO] Starting Vite development server...
echo ================================================================
echo.
echo The application will be available at:
echo.
echo     http://localhost:5173
echo.
echo This mode is for development with Hot Module Replacement.
echo Changes to code will be applied automatically.
echo.
echo To stop the server, press Ctrl+C
echo.
echo ================================================================
echo.

:: Try to open browser after a delay
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:5173"

:: Run Vite dev server
call npm run dev

pause
