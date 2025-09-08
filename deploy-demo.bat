@echo off
echo 🚀 Deploying React Cool Toast Demo to Vercel...

REM Create a temporary directory for deployment
set TEMP_DIR=temp-demo-deploy
if exist %TEMP_DIR% rmdir /s /q %TEMP_DIR%
mkdir %TEMP_DIR%

REM Copy demo files
xcopy demo-vercel\* %TEMP_DIR%\ /E /I /Y

echo 📦 Demo files ready for deployment!
echo 📁 Files in %TEMP_DIR%:
dir %TEMP_DIR%

echo.
echo 🎯 Next steps:
echo 1. Push the %TEMP_DIR% folder to a new GitHub repository
echo 2. Connect the repository to Vercel
echo 3. Deploy automatically
echo.
echo Or run: vercel --prod (if you have Vercel CLI installed)

pause
