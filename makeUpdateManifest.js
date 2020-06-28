/* eslint no-console: "off" */

const fs = require('fs');
const {join} = require('path');
const HOST = 'https://s3-us-west-2.amazonaws.com/cosmicreleases/0/',
      OLD_MANIFEST = './app/package.json',
      MANIFEST_FILE = './../_cosmicEverydayBuilds/package.json',
      RELEASES = join('.');
const manifest = require(OLD_MANIFEST);
const platforms = [
        ['-linux-x86.7z', 'linux'],
        ['-linux-x64.7z', 'linux64'],
        ['-mac-x64.zip', 'darwin'],
        ['_x32.exe', 'win32'],
        ['_x64.exe', 'win64']
    ];
var getPlatform = function(file) {
    const match = platforms.find(pair => file.indexOf(pair[0]) !== -1);
    return match? match[1] : null;
};

fs.readdir(RELEASES, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }
    manifest.packages = {};
    delete manifest.dependencies;
    delete manifest.devDependencies;
    delete manifest.window;
    delete manifest.stylintrc;
    delete manifest.main;
    delete manifest.build;
    delete manifest.scripts;
    files.forEach(file => {
        const platform = getPlatform(file);
        manifest.packages[platform] = {
            url: HOST + file,
            size: fs.statSync(join(RELEASES, file)).size
        };
    });
    delete manifest.packages.null;
    fs.writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(MANIFEST_FILE + ' updated.');
    });
});
