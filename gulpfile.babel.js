import {dest, src, watch} from "gulp";

import sass from "gulp-dart-sass";

import prefix from "gulp-autoprefixer";

import csso from "gulp-csso";

import sourcemaps from "gulp-sourcemaps";

import babel from "gulp-babel";

import terser from "gulp-terser";

import handlebars from "gulp-compile-handlebars";

import rename from "gulp-rename";

import browserSync from "browser-sync";

const sync = browserSync.create();

const scss = () => {
    return src("./src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefix())
        .pipe(csso())
        .pipe(sourcemaps.write("."))
        .pipe(dest("./dist/css"))
        .pipe(sync.stream());
};

const js = () => {
    return src("./src/js/**/*.js")
        .pipe(babel())
        .pipe(terser())
        .pipe(dest("./dist/js"));
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
exports.js = js;
exports.hbs = hbs;
exports.default = function () {
    sync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch("./src/scss/**/*.scss", scss);
    watch("./src/js/**/*.js", js);
    watch("./src/**/*.hbs", hbs)
    watch("./dist/*.html").on("change", sync.reload);
};
