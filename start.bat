@echo off
where npm >nul 2>&1
if errorlevel 1 (
  echo Node.js is not installed or not in PATH.
  echo Download from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing dependencies...
  call npm install
)
echo Starting QazTU at http://localhost:5173
echo Login: admin / admin123
start http://localhost:5173
call npm run dev
