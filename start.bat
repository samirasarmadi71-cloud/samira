@echo off
chcp 65001 >nul
title سیستم حسابداری سرمد - در حال اجرا
color 0A

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║     سیستم حسابداری، امور مالی و انبارداری سرمد            ║
echo ║     در حال راه‌اندازی...                                   ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

:: Check if dist folder exists
if not exist "dist" (
    echo [توجه] پوشه dist یافت نشد. در حال ساخت پروژه...
    echo.
    call npm run build
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [خطا] ساخت پروژه با مشکل مواجه شد!
        pause
        exit /b 1
    )
    echo.
    echo [موفق] پروژه ساخته شد.
    echo.
)

:: Check if node_modules exists
if not exist "node_modules" (
    echo [توجه] وابستگی‌ها نصب نیستند. در حال نصب...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [خطا] نصب وابستگی‌ها با مشکل مواجه شد!
        pause
        exit /b 1
    )
    echo.
)

echo ═══════════════════════════════════════════════════════════
echo [اطلاعات] راه‌اندازی سرور محلی...
echo ═══════════════════════════════════════════════════════════
echo.
echo برنامه در آدرس زیر در دسترس خواهد بود:
echo.
echo     http://localhost:3000
echo.
echo برای توقف برنامه، کلیدهای Ctrl+C را فشار دهید.
echo.
echo ═══════════════════════════════════════════════════════════
echo.

:: Try to open browser after a delay
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"

:: Try serve first, fallback to npx serve, then http-server
where serve >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [سرور] استفاده از serve...
    serve -s dist -l 3000
) else (
    echo [سرور] استفاده از npx serve...
    call npx serve -s dist -l 3000
)

pause
