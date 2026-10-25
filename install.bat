@echo off
chcp 65001 >nul
title سیستم حسابداری سرمد - نصب و راه‌اندازی
color 0B

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║     سیستم حسابداری، امور مالی و انبارداری سرمد            ║
echo ║     نصب و راه‌اندازی اولیه                                 ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [خطا] Node.js نصب نیست!
    echo.
    echo لطفاً Node.js را از سایت رسمی دانلود و نصب کنید:
    echo https://nodejs.org/
    echo.
    echo پس از نصب، این فایل را مجدداً اجرا کنید.
    echo.
    pause
    exit /b 1
)

:: Display Node.js version
echo [اطلاعات] نسخه Node.js:
node --version
echo.

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [خطا] npm نصب نیست!
    pause
    exit /b 1
)

echo [اطلاعات] نسخه npm:
call npm --version
echo.

:: Install dependencies
echo ═══════════════════════════════════════════════════════════
echo [مرحله ۱ از ۳] نصب وابستگی‌ها...
echo ═══════════════════════════════════════════════════════════
echo.
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [خطا] نصب وابستگی‌ها با مشکل مواجه شد!
    pause
    exit /b 1
)
echo.
echo [موفق] وابستگی‌ها با موفقیت نصب شدند.
echo.

:: Build the project
echo ═══════════════════════════════════════════════════════════
echo [مرحله ۲ از ۳] ساخت پروژه...
echo ═══════════════════════════════════════════════════════════
echo.
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [خطا] ساخت پروژه با مشکل مواجه شد!
    pause
    exit /b 1
)
echo.
echo [موفق] پروژه با موفقیت ساخته شد.
echo.

:: Install serve package globally for serving static files
echo ═══════════════════════════════════════════════════════════
echo [مرحله ۳ از ۳] نصب سرور محلی...
echo ═══════════════════════════════════════════════════════════
echo.
call npm install -g serve
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [توجه] نصب سرور محلی با مشکل مواجه شد.
    echo از سرور داخلی استفاده می‌شود.
    echo.
)

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║     ✓ نصب با موفقیت انجام شد!                             ║
echo ║                                                            ║
echo ║     برای اجرای برنامه، فایل "start.bat" را اجرا کنید.    ║
echo ║                                                            ║
echo ║     اطلاعات ورود:                                         ║
echo ║     نام کاربری: admin                                     ║
echo ║     رمز عبور: admin123                                    ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo آیا می‌خواهید برنامه را الان اجرا کنید؟ (Y/N)
set /p choice=
if /i "%choice%"=="Y" (
    call start.bat
) else (
    echo.
    echo برای اجرای برنامه در آینده، فایل "start.bat" را اجرا کنید.
    echo.
)

pause
