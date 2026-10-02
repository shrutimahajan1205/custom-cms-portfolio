@echo off
title Custom CMS Admin Panel (Port 5174)
cd /d "%~dp0cms-admin"
echo ====================================================
echo Starting Custom CMS Admin Dashboard on http://localhost:5174
echo Default credentials: admin / admin123
echo ====================================================
npm run dev
pause
