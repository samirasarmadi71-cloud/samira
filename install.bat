@echo off
title Sarmad Accounting System - Installation
color 0B

echo.
echo ================================================================
echo     Sarmad Accounting System - Installation
echo ================================================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    echo.
    echo After installation, run this file again.
    echo.
    pause
    exit /b 1
)

:: Display Node.js version
echo [INFO] Node.js version:
node --version
echo.

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed!
    pause
    exit /b 1
)

echo [INFO] npm version:
call npm --version
echo.

:: Install dependencies
echo ================================================================
echo [Step 1 of 3] Installing dependencies...
echo ================================================================
echo.
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)
echo.
echo [SUCCESS] Dependencies installed successfully.
echo.

:: Build the project
echo ================================================================
echo [Step 2 of 3] Building project...
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
echo [SUCCESS] Project built successfully.
echo.

:: Install serve package globally
echo ================================================================
echo [Step 3 of 3] Installing local server...
echo ================================================================
echo.
call npm install -g serve
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [INFO] Failed to install serve globally.
    echo Will use npx serve instead.
    echo.
)

echo.
echo ================================================================
echo     Installation completed successfully!
echo.
echo     To run the program, execute "start.bat"
echo.
echo     Login credentials:
echo     Username: admin
echo     Password: admin123
echo ================================================================
echo.
echo Do you want to run the program now? (Y/N)
set /p choice=
if /i "%choice%"=="Y" (
    call start.bat
) else (
    echo.
    echo To run the program later, execute "start.bat"
    echo.
)

pause
