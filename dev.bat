@echo off
chcp 65001 >nul
title سیستم حسابداری سرمد - حالت توسعه
color 0E

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║     سیستم حسابداری سرمد - حالت توسعه (Development)       ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

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
echo [اطلاعات] راه‌اندازی سرور توسعه Vite...
echo ═══════════════════════════════════════════════════════════
echo.
echo برنامه در آدرس زیر در دسترس خواهد بود:
echo.
echo     http://localhost:5173
echo.
echo این حالت برای توسعه مناسب است و تغییرات کد به صورت
echo خودکار اعمال می‌شوند (Hot Module Replacement).
echo.
echo برای توقف برنامه، کلیدهای Ctrl+C را فشار دهید.
echo.
echo ═══════════════════════════════════════════════════════════
echo.

:: Try to open browser after a delay
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:5173"

:: Run Vite dev server
call npm run dev

pause
