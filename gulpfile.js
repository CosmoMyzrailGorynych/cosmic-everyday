/* eslint no-console: off */

'use strict';

const nwVersion = '0.38.4';

const notifier = require('node-notifier'),
      path = require('path'),
      fs = require('fs-extra'),
      {spawn} = require('child_process'),
      gulp = require('gulp'),
      concat = require('gulp-concat'),
      gap = require('gulp-append-prepend'),
      sourcemaps = require('gulp-sourcemaps'),
      stylus = require('gulp-stylus'),
      riot = require('gulp-riot'),
      pug = require('gulp-pug'),
      streamQueue = require('streamqueue'),
      gulpif = require('gulp-if'),
      closureCompiler = require('gulp-closure-compiler'),
      NwBuilder = require('nw-builder');

const appManifest = require('./app/package.json');
var isMakingAReselase;

const fileChangeNotifier = p => {
  notifier.notify({
      title: `Updating ${path.basename(p)}`,
      message: `${p}`,
      icon: path.join(__dirname, 'cat.png'),
      sound: false,
      wait: false
  });
};
const spawnise = (app, attrs) => new Promise((resolve, reject) => {
    var process = spawn(app, attrs);
    process.on('exit', code => {
        if (!code) {
            resolve();
        } else {
            reject(code);
        }
    });
    process.stderr.on('data', data => {
        console.error(data.toString());
    });
    process.stdout.on('data', data => {
        console.log(data.toString());
    });
});

const compileStylus = () =>
  gulp.src('./src/styl/theme*.styl')
  .pipe(gulpif(!isMakingAReselase, sourcemaps.init()))
  .pipe(stylus({
    compress: true
  }))
  .pipe(gulpif(!isMakingAReselase, sourcemaps.write()))
  .pipe(gulp.dest('./app/data/'));

const compilePug = () =>
  gulp.src('./src/pug/**/*.pug')
  .pipe(gulpif(!isMakingAReselase, sourcemaps.init()))
  .pipe(pug({
    pretty: false
  }))
  .on('error', err => {
    notifier.notify({
      title: 'Ошибка pug',
      message: err.toString(),
      icon: path.join(__dirname, 'error.png'),
      sound: true,
      wait: true
    });
    console.error('[pug error]', err);
  })
  .pipe(gulpif(!isMakingAReselase, sourcemaps.write()))
  .pipe(gulp.dest('./app/'));

const compileRiot = () =>
  gulp.src('./src/tags/**')
  .pipe(riot({
    compact: false,
    template: 'pug'
  }))
  .pipe(concat('riot.js'))
  .pipe(gap.prependFile('./eslintfix.js'))
  .pipe(gulp.dest('./temp'));

const compileScripts = gulp.series(compileRiot, () =>
  streamQueue({objectMode: true},
    gulp.src('./src/js/3rdParty/riot.js'),
    gulp.src(['./src/js/**', '!./src/js/3rdparty/riot.js']),
    gulp.src('./temp/riot.js')
  )
  .pipe(gulpif(!isMakingAReselase, sourcemaps.init()))
  .pipe(concat('bundle.js'))
  .pipe(gulpif(!isMakingAReselase, sourcemaps.write()))
  .pipe(gulp.dest('./app/data/'))
  .pipe(gulpif(isMakingAReselase, closureCompiler({
    compilerPath: 'bower_components/closure-compiler/closure-compiler-v20190729.jar',
    maxBuffer: 100500,
    continueWithWarnings: true,
    compilerFlags: {
      'language_in': 'ECMASCRIPT6',
      // 'third_party': 'true',
      'warning_level': 'QUIET'
    },
    define: [
      'goog.DEBUG=false'
    ],
    fileName: 'bundle.js'
  })))
  .pipe(gulpif(isMakingAReselase, gulp.dest('./app/data/')))
  .on('error', err => {
    notifier.notify({
      title: 'Ошибка скриптов',
      message: err.toString(),
      icon: path.join(__dirname, 'error.png'),
      sound: true,
      wait: true
    });
    console.error('[scripts error]', err);
  })
  .on('change', fileChangeNotifier)
);

const build = gulp.parallel([compilePug, compileStylus, compileScripts]);


const watchScripts = () => {
  gulp.watch('./src/js/**', compileScripts)
  .on('error', err => {
    notifier.notify({
      title: 'Общая ошибка скриптов',
      message: err.toString(),
      icon: path.join(__dirname, 'error.png'),
      sound: true,
      wait: true
    });
    console.error('[scripts error]', err);
  })
  .on('change', fileChangeNotifier);
};
const watchRiot = () => {
  gulp.watch('./src/tags/**', compileScripts)
  .on('error', err => {
    notifier.notify({
      title: 'Ошибка Riot',
      message: err.toString(),
      icon: path.join(__dirname, 'error.png'),
      sound: true,
      wait: true
    });
    console.error('[pug error]', err);
  })
  .on('change', fileChangeNotifier);
};
const watchStyl = () => {
  gulp.watch('./src/styl/**', compileStylus)
  .on('error', err => {
    notifier.notify({
      title: 'Ошибка Stylus',
      message: err.toString(),
      icon: path.join(__dirname, 'error.png'),
      sound: true,
      wait: true
    });
    console.error('[styl error]', err);
  })
  .on('change', fileChangeNotifier);
};
const watchPug = () => {
  gulp.watch('./src/pug/**/*.pug', compilePug)
  .on('change', fileChangeNotifier)
  .on('error', err => {
    notifier.notify({
      title: 'Ошибка Pug',
      message: err.toString(),
      icon: path.join(__dirname, 'error.png'),
      sound: true,
      wait: true
    });
    console.error('[pug error]', err);
  });
};
const watch = () => {
  watchScripts();
  watchStyl();
  watchPug();
  watchRiot();
};

const launchNw = () => {
  var nw = new NwBuilder({
      files: './app/**',
      version: nwVersion,
      platforms: ['osx64', 'win32', 'win64', 'linux32', 'linux64'],
      flavor: 'sdk'
  });
  return nw.run().catch(function (error) {
      console.error(error);
  })
  .then(launchNw);
};

const packNw = done => {
  var nw = new NwBuilder({
      files: ['./app/**'],
      platforms: ['osx64', 'win32', 'win64', 'linux32', 'linux64'],
      version: nwVersion,
      flavor: 'normal',
      buildType: 'versioned',
      zip: false,
      macIcns: './ico.png.icns',
      winIco: './ico.ico'
  });
  nw.build()
  .then(() => {
      console.log('Binaries done');
      done();
  })
  .catch(function (error) {
      console.error(error);
      done(error);
  });
};
const copyLinuxSpecific = done => {
  fs.copy('./_linuxOnly/.', `./../_cosmicEverydayBuilds/CosmicEveryday-${appManifest.version}-linux-x64`)
  .then(() => fs.copy('./_linuxOnly/.', `./../_cosmicEverydayBuilds/CosmicEveryday-${appManifest.version}-linux-x86`))
  .then(() => {done();});
};

/*
const pack7z = done => {
  spawnise('7z', ['a', `./../_cosmicEverydayBuilds/CosmicEveryday-${appManifest.version}-linux-x64.7z`, `./../_cosmicEverydayBuilds/CosmicEveryday-${appManifest.version}-linux-x64/.`])
  .then(() => spawnise('7z', ['a', `./../_cosmicEverydayBuilds/CosmicEveryday-${appManifest.version}-linux-x86.7z`, `./../_cosmicEverydayBuilds/CosmicEveryday-${appManifest.version}-linux-x86/.`]))
  .then(() => spawnise('7z', ['a', `./../_cosmicEverydayBuilds/CosmicEveryday-${appManifest.version}-mac-x64.7z`, `./../_cosmicEverydayBuilds/CosmicEveryday-${appManifest.version}-mac-x64/.`]))
  .then(() => spawnise('7z', ['a', `./../_cosmicEverydayBuilds/CosmicEveryday-${appManifest.version}-win-x64.7z`, `./../_cosmicEverydayBuilds/CosmicEveryday-${appManifest.version}-win-x64/.`]))
  .then(() => spawnise('7z', ['a', `./../_cosmicEverydayBuilds/CosmicEveryday-${appManifest.version}-win-x86.7z`, `./../_cosmicEverydayBuilds/CosmicEveryday-${appManifest.version}-win-x86/.`]))
  .then(() => {done();});
};
*/

const test = done => {
  spawnise('node', ['nightwatch.js'])
  .then(() => {done();});
};

const channelPostfix = 'new';
const deployOnly = done => {
  console.log(`For channel ${channelPostfix}`);
  var pack = require('./app/package.json');
  spawnise('./butler', ['push', `./build/CosmicEveryday - v${pack.version}/linux32`, `comigo/cosmic-everyday:linux32${channelPostfix? '-' + channelPostfix: ''}`, '--userversion', pack.version])
  .then(() => spawnise('./butler', ['push', `./build/CosmicEveryday - v${pack.version}/linux64`, `comigo/cosmic-everyday:linux64${channelPostfix? '-' + channelPostfix: ''}`, '--userversion', pack.version]))
  .then(() => spawnise('./butler', ['push', `./build/CosmicEveryday - v${pack.version}/osx64`, `comigo/cosmic-everyday:osx64${channelPostfix? '-' + channelPostfix: ''}`, '--userversion', pack.version]))
  .then(() => spawnise('./butler', ['push', `./build/CosmicEveryday - v${pack.version}/win32`, `comigo/cosmic-everyday:win32${channelPostfix? '-' + channelPostfix: ''}`, '--userversion', pack.version]))
  .then(() => spawnise('./butler', ['push', `./build/CosmicEveryday - v${pack.version}/win64`, `comigo/cosmic-everyday:win64${channelPostfix? '-' + channelPostfix: ''}`, '--userversion', pack.version]))
  .then(() => {
      done();
  })
  .catch(done);
};

const defaultTask = gulp.series(
  [build, done => {
    watch();
    launchNw();
    done();
  }]
);
const release = gulp.series([done => {
  isMakingAReselase = true;
  done();
}, build, packNw, copyLinuxSpecific/* , pack7z*/]);
const makeBinaries = gulp.series([done => {
  isMakingAReselase = true;
  done();
}, build, packNw, copyLinuxSpecific]);

gulp.task('default', defaultTask);
gulp.task('test', test);
gulp.task('release', release);
gulp.task('binaries', makeBinaries);
gulp.task('deployOnly', deployOnly);
