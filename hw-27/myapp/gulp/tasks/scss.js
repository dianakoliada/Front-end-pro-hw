import dartSass from 'sass';
import gulpSaas from 'gulp-sass';
import rename from 'gulp-rename';
import concat from 'gulp-concat';

import cleanCss from 'gulp-clean-css'; //press big css file
import webpcss from 'gulp-webpcss'; //output WEBP img
import autoprefixer from 'gulp-autoprefixer'; //add wendor prefixes
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSaas(dartSass);

export const scss = () => {
   return app.gulp.src(app.path.src.scss, { sourcemaps: true })
      .pipe(sass({
         outputStyle: 'expanded'
      }))
      .pipe(groupCssMediaQueries())
      .pipe(webpcss(
         {
            webpClass: ".webp",
            noWebpCass: ".no-webp"
         }
      ))
      .pipe(autoprefixer({
         grid: true,
         overrideBrowserslist: ["last 3 versions"],
         cascade: true
      }))
      .pipe(app.gulp.dest(app.path.build.css))  // to get not min css copy
      .pipe(cleanCss())
      .pipe(rename({
         extname: ".min.css"
      }))
      .pipe(concat('style.min.css'))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream());
}