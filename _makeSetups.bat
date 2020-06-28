echo OFF

set rootDir="D:\_namespace\_cosmicEveryday"
set packageDir="D:\_namespace\_cosmicEveryday\app"
set outputDir=D:\_namespace\_cosmicEverydayBuilds

cd /D %rootDir%
call "C:\Program Files (x86)\Inno Setup 5\compil32.exe" /cc "D:\_namespace\_cosmicEveryday\setup_win64_patch.iss"
call "C:\Program Files (x86)\Inno Setup 5\compil32.exe" /cc "D:\_namespace\_cosmicEveryday\setup_win32_patch.iss"
call "C:\Program Files (x86)\Inno Setup 5\compil32.exe" /cc "D:\_namespace\_cosmicEveryday\setup_win64.iss"
call "C:\Program Files (x86)\Inno Setup 5\compil32.exe" /cc "D:\_namespace\_cosmicEveryday\setup_win32.iss"

echo Everything is done c:
echo Output directory: %outputDir%
