const { src, dest } = require("gulp");

const sass = require("gulp-dart-sass");

const prefix = require("gulp-autoprefixer");

const handlebars = require("gulp-compile-handlebars");

const rename = require("gulp-rename");

function scss() {
  return src("./src/scss/**/*.scss")
    .pipe(sass())
    .pipe(prefix())
    .pipe(dest("./dist/css"));
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
