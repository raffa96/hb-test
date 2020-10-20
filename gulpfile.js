const gulp = require("gulp");
const handlebars = require("gulp-compile-handlebars");
const rename = require("gulp-rename");

gulp.task("default", function () {
  const templateData = {
    username: "John",
  };

  const options = {
    ignorePartials: true,
    batch: ["./src/includes"],
    helpers: {
      capitals: function (str) {
        return str.toUpperCase();
      },
    },
  };

  return gulp
    .src("src/pages/*.hbs")
    .pipe(handlebars(templateData, options))
    .pipe(
      rename({
        extname: ".html",
      })
    )
    .pipe(gulp.dest("dist"));
});
