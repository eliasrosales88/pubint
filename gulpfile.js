var gulp = require("gulp"); // importamos la libreria gulp
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require('gulp-html-import');
var tap = require("gulp-tap");
var browserify = require("browserify");
var buffer = require("gulp-buffer");
var sourcemaps = require("gulp-sourcemaps");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var imagemin = require("gulp-imagemin");
var responsive = require("gulp-responsive");


// definimos la tarea por defecto
gulp.task("default", ["img", "html", "sass", "js"], function(){

    // iniciamos el servidor de desarrollo
    browserSync.init({ server: "dist/" });

    // observa cambios en los archivos SASS, y entonces ejectua la tarea 'sass'
    gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"],["sass"]);

    // obsevar cambio en los archivos html y entonces ejectua la tarea 'html'
    gulp.watch(["src/*.html", "src/**/*.html"], ["html"]); 

    // observa cambios en los archivos JS y entonces ejectua la tarea 'js'
    gulp.watch(["src/js/*.js", "src/js/**/*.js"], ["js"]);
});

    


// definimos la tarea de COMPILAR SASS
gulp.task("sass", function(){
    gulp.src("src/scss/style.scss") // cargamos el archivo styles.scss
        .pipe(sourcemaps.init()) // comienza a capturar los sourcemaps
        .pipe(sass().on("error", function(error){      // lo compilamos con gulp-sass
            return notify().write(error);              // si ocurre un error mostramos una notificacion
        })) 
        .pipe(postcss([
            autoprefixer(), // transforma el css dandole compatibilidad a versiones antiguas
            cssnano() // comprime/minifica el CSS
            ]))
        .pipe(sourcemaps.write("./")) // guarda el sourcemap en la misma carpeta que el CSS
        .pipe(gulp.dest("dist/")) // guardamos el resultado en la carpeta css
        .pipe(browserSync.stream())  // con esto recargamos solamente el css del navegador
        .pipe(notify("SASS Compilado!")); // muestra notificaciones en pantalla
});

// Copiar e importar HTML
gulp.task("html", function () {
    gulp.src("src/*.html")
        .pipe(gulpImport("src/components/")) // remplaza los @import del html
        .pipe(htmlmin({collapseWhitespace: true})) // minifica el html
        .pipe(gulp.dest("dist/")) 
        .pipe(browserSync.stream())
        .pipe(notify("HTML importado"));
});

 // COMPILAR  Y GENERAR UN UNICO JAVASCRIPT

 gulp.task("js", function(){
     gulp.src("src/js/main.js")
         .pipe(tap(function(file){ // tap nos permite ejecutar una funcion por cada fichero seleccionado en gulp.src
            // reemplazamos el contenido del fichero por lo que nos devuelve browserify pasandole el fichero
            file.contents = browserify(file.path, {debug: true}) // creamos una instancia de browserify en base al archivo
                            .transform("babelify", {presets: ["es2015"]}) // traduce nuestro codigo de ES6 -> ES5
                            .bundle() // compilamos el archivo
                            .on("error", function(error){ // en caso de error, mostramos una notificacion
                                return notify().write(error);
                            });

         }))
         .pipe(buffer())// convertimos a buffer para que funcione el siguiente pipe
         .pipe(sourcemaps.init({loadMaps: true})) // captura los sourcemaps del archivo fuente
         .pipe(uglify()) // minificamos el JavaScript
         .pipe(sourcemaps.write('./')) // guarda los sourcemaps en el mismo directorio que el archivo fuente
         .pipe(gulp.dest("dist/")) // lo guardamos en la carpeta dist
         .pipe(browserSync.stream()) // recargamos el navegador
         .pipe(notify("JS Compilado"));
 });


 // Tarea que optimiza y crea las imagenes responsive
 gulp.task("img", function(){
    gulp.src("./src/img/*")
    .pipe(responsive({ // generamos las versiones responsive
        '*': [ 
            { width: 350, rename: {suffix: "-350px"}},
            { width: 767, rename: {suffix: "-767px"}},
            { width: 1024, rename: {suffix: "-1024px"}}
        ]
    }))
     .pipe(imagemin()) // optimizamos el peso de las imagenes
     .pipe(gulp.dest("./dist/img/"))
 });