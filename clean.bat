@echo off
chcp 65001 >nul
title سیستم حسابداری سرمد - پاک‌سازی
color 0C

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║     سیستم حسابداری سرمد - پاک‌سازی کامل                   ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo ⚠️  هشدار: این عملیات موارد زیر را پاک می‌کند:
echo.
echo     - پوشه node_modules
echo     - پوشه dist
echo     - فایل‌های موقت
echo.
echo ⚠️  داده‌های پایگاه داده (در LocalStorage) پاک نخواهند شد.
echo.
echo ═══════════════════════════════════════════════════════════
echo.

set /p confirm=آیا مطمئن هستید؟ (Y/N): 

if /i not "%confirm%"=="Y" (
    echo.
    echo عملیات لغو شد.
    pause
    exit /b 0
)

echo.
echo [مرحله ۱] در حال حذف node_modules...
if exist "node_modules" (
    rmdir /s /q node_modules
    echo [موفق] node_modules حذف شد.
) else (
    echo [توجه] node_modules یافت نشد.
)
echo.

echo [مرحله ۲] در حال حذف dist...
if exist "dist" (
    rmdir /s /q dist
    echo [موفق] dist حذف شد.
) else (
    echo [توجه] dist یافت نشد.
)
echo.

echo [مرحله ۳] در حال حذف فایل‌های موقت...
if exist "*.log" del /q *.log
if exist "*.tmp" del /q *.tmp
echo [موفق] فایل‌های موقت حذف شدند.
echo.

echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║     ✓ پاک‌سازی با موفقیت انجام شد!                       ║
echo ║                                                            ║
echo ║     برای نصب مجدد، فایل "install.bat" را اجرا کنید.      ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

pause
