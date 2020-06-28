cd ./../_cosmicEverydayBuilds
echo Deleting old update manifest…
rm ./package.json

cd ./../_cosmicEveryday
echo Making update manifest...
node makeUpdateManifest.js

echo Everything is done c:
echo Output directory: ./../_cosmicEverydayBuilds