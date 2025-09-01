@echo off
echo 🧠 Brain Tumor Detection - Setup Script
echo =====================================
echo.

echo Installing React dependencies...
cd frontend
call npm install

if %errorlevel% equ 0 (
    echo.
    echo ✅ Setup completed successfully!
    echo.
    echo To start the application:
    echo 1. Run: start-backend.bat
    echo 2. Run: start-frontend.bat
    echo.
    pause
) else (
    echo.
    echo ❌ Setup failed. Please check Node.js installation.
    echo.
    pause
)