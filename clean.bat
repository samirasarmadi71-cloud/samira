@echo off
title Sarmad Accounting System - Cleanup
color 0C

echo.
echo ================================================================
echo     Sarmad Accounting System - Full Cleanup
echo ================================================================
echo.
echo WARNING: This will delete:
echo.
echo     - node_modules folder
echo     - dist folder
echo     - temporary files
echo.
echo Database data (in LocalStorage) will NOT be deleted.
echo.
echo ================================================================
echo.

set /p confirm=Are you sure? (Y/N): 

if /i not "%confirm%"=="Y" (
    echo.
    echo Operation cancelled.
    pause
    exit /b 0
)

echo.
echo [Step 1] Deleting node_modules...
if exist "node_modules" (
    rmdir /s /q node_modules
    echo [SUCCESS] node_modules deleted.
) else (
    echo [INFO] node_modules not found.
)
echo.

echo [Step 2] Deleting dist...
if exist "dist" (
    rmdir /s /q dist
    echo [SUCCESS] dist deleted.
) else (
    echo [INFO] dist not found.
)
echo.

echo [Step 3] Deleting temporary files...
if exist "*.log" del /q *.log
if exist "*.tmp" del /q *.tmp
echo [SUCCESS] Temporary files deleted.
echo.

echo ================================================================
echo     Cleanup completed successfully!
echo.
echo     To reinstall, run "install.bat"
echo ================================================================
echo.

pause
