@echo off
title Custom CMS & Portfolio Master Launcher
echo =====================================================================
echo  STARTING COMPLETE CUSTOM CMS + PORTFOLIO ECOSYSTEM
echo =====================================================================
echo.
echo  1. Backend API (Flask):        http://127.0.0.1:5000/api/health
echo  2. Public Portfolio:           http://localhost:5173
echo  3. Custom CMS Admin Panel:     http://localhost:5174
echo.
echo  Default Admin Login:           admin / admin123
echo =====================================================================
echo.

start "Backend API (Flask)" cmd /c "cd /d %~dp0backend && python run.py"
timeout /t 3 /nobreak >nul

start "Custom CMS Admin (Vite)" cmd /c "cd /d %~dp0cms-admin && npm run dev"
timeout /t 2 /nobreak >nul

start "Portfolio Frontend (Vite)" cmd /c "cd /d %~dp0portfolio-frontend && npm run dev"

echo.
echo [OK] All services launched!
echo Opening browser to http://localhost:5173 and http://localhost:5174 ...
timeout /t 4 /nobreak >nul

start http://localhost:5173
start http://localhost:5174
