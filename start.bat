@echo off
title Sarmad Accounting System - Running
color 0A

echo.
echo ================================================================
echo     Sarmad Accounting System - Starting...
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
    echo [SUCCESS] Project built.
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
echo [INFO] Starting local server...
echo ================================================================
echo.
echo The application will be available at:
echo.
echo     http://localhost:3000
echo.
echo To stop the server, press Ctrl+C
echo.
echo ================================================================
echo.

:: Try to open browser after a delay
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"

:: Check if dist/index.html exists
if not exist "dist\index.html" (
    echo [ERROR] dist/index.html not found!
    echo Please run "build.bat" first.
    pause
    exit /b 1
)

:: Try serve first, fallback to npx serve
where serve >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [Server] Using serve...
    serve -s dist -l 3000
) else (
    echo [Server] Using npx serve...
    call npx serve -s dist -l 3000
)

pause
