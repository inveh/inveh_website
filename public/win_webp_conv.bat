@echo off
cd /d "%~dp0"
for %%i in (*.jpg *.jpeg *.png) do (
    ffmpeg -i "%%i" -q:v 75 "%%~ni.webp"
)
pause
