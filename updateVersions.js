const fs = require('fs'),
      path = require('path'),
      chalk = require('chalk');

const setupConfigs = [{
        file: './windowsInstallers/x64_Full.nsi'
    }, {
        file: './windowsInstallers/x86_Full.nsi'
    }];
const packageFile = './app/package.json';
const butlerWinFile = './../_cosmicEverydayBuilds/butlebut.bat';
const butlerLinuxFile = './../_cosmicEverydayBuilds/butlebut.sh';
const amazonWinFile = './_uploadToAWS.bat';
const amazonLinuxFile = './_uploadToAWS.sh';

var updatePackageVersion = version => {
    var package = require(packageFile);
    package.version = version;
    fs.writeFile(packageFile, JSON.stringify(package, null, 2), {
        encoding: 'utf-8'
    }, err => {
        if (err) {throw err;}
    });
};
var updateButlerVersion = version => {
    fs.readFile(butlerWinFile, {
        encoding: 'utf-8'
    }, (err, data) => {
        if (err) {throw err;}
        data = data.split('\n');
        data[0] = `set version=${version}`;
        fs.writeFile(butlerWinFile, data.join('\n'), err => {
            if (err) {
                throw err;
            }
        });
    });
    fs.readFile(butlerLinuxFile, {
        encoding: 'utf-8'
    }, (err, data) => {
        if (err) {throw err;}
        data = data.split('\n');
        data[0] = `version=${version}`;
        fs.writeFile(butlerLinuxFile, data.join('\n'), err => {
            if (err) {
                throw err;
            }
        });
    });
};
var updateAmazonVersion = version => {
    fs.readFile(amazonWinFile, {
        encoding: 'utf-8'
    }, (err, data) => {
        if (err) {throw err;}
        data = data.split('\n');
        data[0] = `set version=${version}`;
        fs.writeFile(amazonWinFile, data.join('\n'), err => {
            if (err) {
                throw err;
            }
        });
    });
    fs.readFile(amazonLinuxFile, {
        encoding: 'utf-8'
    }, (err, data) => {
        if (err) {throw err;}
        data = data.split('\n');
        data[0] = `version=${version}`;
        fs.writeFile(amazonLinuxFile, data.join('\n'), err => {
            if (err) {
                throw err;
            }
        });
    });
};
var updateSetupVersion = version => {
    setupConfigs.forEach(setup => {
        fs.readFile(path.join('./', setup.file), {
            encoding: 'utf-8'
        }, (err, data) => {
            if (err) {throw err;}
            data = data.split('\n');
            data[1] = `!define VERSIONMAJOR ${version.split('.')[0]}`;
            data[2] = `!define VERSIONMINOR ${version.split('.')[1]}`;
            data[3] = `!define VERSIONBUILD ${version.split('.')[2]}`;
            fs.writeFile(path.join('./', setup.file), data.join('\n'), err => {
                if (err) {
                    throw err;
                }
            });
        });
    });
};

var inquirer = require('inquirer');
inquirer.prompt([{
    type: 'input',
    name: 'version',
    message: 'Input new version:',
    validate: string => {
        var parts = string.split('.');
        if (parts.length !== 3) {
            return 'This is not a valid semver number!';
        }
        for (let i = 0; i < 3; i++) {
            if (isNaN(parseInt(parts[i], 10))) {
                return 'This is not a valid semver number!';
            }
        }
        return true;
    }
}]).then(answers => {
    updatePackageVersion(answers.version);
    updateSetupVersion(answers.version);
    updateButlerVersion(answers.version);
    // updateAmazonVersion(answers.version);
    console.log(chalk.green('Done!'));
});
