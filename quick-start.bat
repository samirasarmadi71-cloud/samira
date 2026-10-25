@echo off
chcp 65001 >nul
title سیستم حسابداری سرمد - اجرای سریع
color 0B

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║     سیستم حسابداری سرمد - اجرای سریع                     ║
echo ║     (بدون نیاز به نصب سرور اضافی)                        ║
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
echo [اطلاعات] راه‌اندازی سرور با Vite Preview...
echo ═══════════════════════════════════════════════════════════
echo.
echo برنامه در آدرس زیر در دسترس خواهد بود:
echo.
echo     http://localhost:4173
echo.
echo برای توقف برنامه، کلیدهای Ctrl+C را فشار دهید.
echo.
echo ═══════════════════════════════════════════════════════════
echo.

:: Try to open browser after a delay
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:4173"

:: Run Vite preview
call npx vite preview --port 4173

pause
