@echo off
title Sarmad Accounting System - Build
color 0D

echo.
echo ================================================================
echo     Sarmad Accounting System - Building Production Version
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
echo [INFO] Building project...
echo ================================================================
echo.

call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to build project!
    pause
    exit /b 1
)

echo.
echo ================================================================
echo     Build completed successfully!
echo.
echo     Production files are in the "dist" folder.
echo.
echo     To run the application, execute "start.bat"
echo ================================================================
echo.

pause
