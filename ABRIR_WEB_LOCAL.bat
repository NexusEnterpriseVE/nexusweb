@echo off
cd /d "%~dp0"
echo Nexus Enterprise - servidor local
echo Abre http://localhost:8080 en tu navegador.
start "" http://localhost:8080
py -m http.server 8080 2>nul || python -m http.server 8080
pause
