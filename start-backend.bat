@echo off
title Custom CMS Backend API (Port 5000)
cd /d "%~dp0backend"
echo ====================================================
echo Starting Custom CMS Backend API on http://127.0.0.1:5000
echo ====================================================
python run.py
pause
