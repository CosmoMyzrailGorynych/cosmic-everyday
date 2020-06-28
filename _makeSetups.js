const nsis = require('makensis');

const scripts = [
    './windowsInstallers/x64_Full.nsi',
    './windowsInstallers/x86_Full.nsi'
];

scripts.forEach(script => {
    nsis.compile(script, {})
    .then(output => console.log(output))
    .catch(err => console.error(err.status, err.stderr));
});
