@echo off
title Portfolio Frontend (Port 5173)
cd /d "%~dp0portfolio-frontend"
echo ====================================================
echo Starting Portfolio Frontend on http://localhost:5173
echo ====================================================
npm run dev
pause
