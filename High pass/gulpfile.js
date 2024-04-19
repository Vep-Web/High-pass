const {src, dest, series, watch} = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const uglify = require('gulp-uglify-es').default
const sourcemap = require('gulp-sourcemaps')
const del = require('del')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const prod = require('yargs').argv
const gulpif = require('gulp-if')
const browserSync = require('browser-sync').create()


const clean = () => {
  return del(['dist/*'])
}


const resources = () => {
  return src('src/resources/**')
    .pipe(dest('dist/resources'))
}


const styles = () => {
  return src('src/scss/**/*.scss')
    .pipe(sass({
      outpputStyles: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpif(prod.prod, cleanCSS({
      level: 2
    })))
    .pipe(gulpif(prod.prod, sourcemap.init()))
    .pipe(concat('main.css'))
    .pipe(autoprefixes({
      cascade: false
    }))
    .pipe(gulpif(prod.prod, sourcemap.write()))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}


const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}


const svgSprites = () => {
  return src('src/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/img'))
}

const images = () => {
  return src([
      'src/img/**/*.webp',
    ])
    .pipe(image())
    .pipe(dest('dist/img'))
}


const scripts = () => {
  return src([
      //'node_modules/inputmask/dist/inputmask.min.js',
      //'node_modules/just-validate/dist/just-validate.production.min.js',
      //'node_modules/ymaps/dist/ymaps.esm.js',
      'src/js/main.js',
    ])
    .pipe(gulpif(prod.prod, sourcemap.init()))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify({
      toplevel: true
    }).on('error', notify.onError()))
    .pipe(gulpif(prod.prod, sourcemap.write()))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

const copy = () => {
  return src('src/img/svg/map.svg')
    .pipe(dest('dist/img/svg/'))
}


const fonts = () => {
  return src('src/fonts/**.woff2')
    .pipe(dest('dist/fonts/'))
}


const normal = () => {
  return src('src/fonts/**.woff2')
    .pipe(dest('dist/fonts/'))
}


const watchFiles = () => {
  gulpif(prod.prod, browserSync.init({
    server: {
      baseDir: 'dist'
    }
  }))
}


watch('src/**/*.html', htmlMinify)
watch('src/scss/**/*.scss', styles)
watch('src/img/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/fonts/**.woff2', fonts)
watch('src/resources/**', resources)


exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, resources, htmlMinify, fonts, scripts, copy, styles, images, svgSprites, watchFiles)
