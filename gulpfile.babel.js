import {dest, src, watch} from "gulp";

import sass from "gulp-dart-sass";

import prefix from "gulp-autoprefixer";

import csso from "gulp-csso";

import sourcemaps from "gulp-sourcemaps";

import handlebars from "gulp-compile-handlebars";

import rename from "gulp-rename";

import browserSync from "browser-sync";

import concat from "gulp-concat";

const sync = browserSync.create();

const scss = () => {
    return src("./src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefix())
        .pipe(csso())
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write("."))
        .pipe(dest("./dist/css"))
        .pipe(sync.stream());
};

const hbs = () => {
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
};

exports.scss = scss;
exports.hbs = hbs;
exports.default = () => {
    sync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch("./src/scss/**/*.scss", scss);
    watch("./src/**/*.hbs", hbs)
    watch("./dist/*.html").on("change", sync.reload);
};
