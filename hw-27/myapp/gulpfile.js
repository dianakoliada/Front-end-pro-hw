// main module
import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js'

//pass the values into global variable
global.app = {
   path: path,
   gulp: gulp,
   plugins: plugins
}

// import tasks
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';

// watch changes in files
function watcher() {
   gulp.watch(path.watch.files, copy);
   gulp.watch(path.watch.html, html);
   gulp.watch(path.watch.scss, scss);
   gulp.watch(path.watch.js, js);
}

const mainTasks = gulp.parallel(copy, html, scss, js);

// build tasks script
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

// do script by default
gulp.task('default', dev);
