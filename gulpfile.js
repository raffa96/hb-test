const {src, dest, watch} = require("gulp");

const sass = require("gulp-dart-sass");

const prefix = require("gulp-autoprefixer");

const csso = require("gulp-csso");

const sourcemaps = require("gulp-sourcemaps");

const handlebars = require("gulp-compile-handlebars");

const rename = require("gulp-rename");

const browserSync = require("browser-sync").create();

function scss() {
    return src("./src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefix())
        .pipe(csso())
        .pipe(sourcemaps.write("."))
        .pipe(dest("./dist/css"))
        .pipe(browserSync.stream());
}

function hbs() {
    return src("./src/pages/*.hbs")
        .pipe(
            handlebars(
                {},
                {
                    ignorePartials: true,
                    batch: ["./src/partials"],
                }
            )
        )
        .pipe(
            rename({
                extname: ".html",
            })
        )
        .pipe(dest("./dist"));
}

exports.scss = scss;
exports.hbs = hbs;

exports.default = function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch("./src/scss/**/*.scss", scss);
    watch("./src/**/*.hbs", hbs)
    watch("./dist/*.html").on("change", browserSync.reload);
};
