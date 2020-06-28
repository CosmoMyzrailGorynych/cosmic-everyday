echo OFF

set rootDir="D:\_namespace\_cosmicEveryday"
set packageDir="D:\_namespace\_cosmicEveryday\app"
set outputDir="D:\_namespace\_cosmicEverydayBuilds"

cd /D %outputDir%

echo Deleting old update manifest…
del package.json
echo Making update manifest...
call node "%rootDir%\makeUpdateManifest.js"

echo Everything is done c:
echo Output directory: %outputDir%
