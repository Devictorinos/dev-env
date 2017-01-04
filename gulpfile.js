const gulp         = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass         = require('gulp-ruby-sass');
const watch        = require('gulp-watch');
const batch        = require('gulp-batch');
const gutil        = require('gulp-util');
const ftp          = require('gulp-ftp');
//const cleanCSS     = require('gulp-clean-css');//need install
//const cssmin       = require('gulp-cssmin');//need install
const newer        = require('gulp-newer');
const changed      = require('gulp-changed');
const rename       = require('gulp-rename');

const src = {
    //sass: 'sass/ltr.scss',
    sass: 'sass/style.scss',
    watch: 'sass/**/*.scss',
    dest: 'css/'
};

const config = {
        src: {
            css: '',
            //css: 'C:/Work/phpstorm_projects/reshetyeruka.co.il/wp-content/themes/topproject/style.css',
            //css: 'C:/Work/phpstorm_projects/reshetyeruka.co.il/wp-content/themes/topproject/ltr.css',
            dest: ''
            //dest: 'C:/Work/phpstorm_projects/reshetyeruka.co.il/wp-content/themes/topproject/'
        },

        host: 'cp6.leos.co.il',
        user: '',
        pass: '',
        port: 21,
        rootPath: ''
}

gulp.task('sass', () =>
    sass(src.sass, {style: 'expanded'})
        .on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['> 0%'],
            cascade: false
        }))
        //.pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(src.dest))
);


gulp.task('watch:sass', () =>
     gulp.watch(src.watch, ['sass'])
);

gulp.task('transfer:ftp', () =>
      setTimeout(() =>
        gulp.src(config.src.css)
            .pipe(ftp({
                host: config.host,
                remotePath: config.rootPath,
                port: 21,
                user: config.user,
                pass: config.pass
            }))
            .pipe(gutil.noop())
    ,1000)


);
