const {src,dest,watch} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = (require('gulp-sass'))(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');

let fnHTML = () =>{
    return src('./src/html/**/*.html')
    .pipe(htmlmin())
    .pipe(dest('./dist/html'));
}
let fnCopyIndex = () => {
    return src('./src/index.html').pipe(dest('./dist'));
}
let fncss = () => {
    return src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
let fnjs = () => {
    return src('./src/js/**/*.js')
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'));
}
let fnimg = () =>{
    return src('./src/**/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
let fnlib = () =>{
    return src('./src/lib/**/*')
    .pipe(dest('./dist/lib'));
}
exports.html = fnHTML;
