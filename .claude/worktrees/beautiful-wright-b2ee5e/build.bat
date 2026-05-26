@echo off
if "%1"=="" (
    echo Drag a content JSON file onto this script to build it.
    echo Or run: build.bat my-content.json
    pause
    exit /b 1
)
py "%~dp0build.py" "%1"
pause
