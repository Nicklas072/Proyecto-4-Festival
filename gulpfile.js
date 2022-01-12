const {src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');                  
const autoprefixer = require('autoprefixer'); //hace que funcione en cualquier navegador
const cssnano = require('cssnano'); // comprime el css
const postcss = require('gulp-postcss'); // da algunas transformaciones por medio de los anteriores  
const sourcemaps = require('gulp-sourcemaps');
//IMAGENES 

const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin');     // todo para optimiar imagenes
const webp = require('gulp-webp');

// Javascript
const terser = require('gulp-terser-js');


function css(done){
    src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(plumber() )
        .pipe( sass() )
        .pipe( postcss([autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css') )

    done();
}



function imagenes( done ){

    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{jpg,png}')
        .pipe( cache( imagemin (opciones) ) )
        .pipe (dest('build/img') )

    done();
}



function versionWebp( done ){

     const opciones = {  //opciones que da .pipe webp()

         quality: 50
      };

  src('src/img/**/*.{jpg,png}') // identificamos la carpeta donde estan y los formatos de las imagenes a convertir.
     .pipe( webp(opciones) ) // convierte las imagenes de wpp y les apunta su calidad.
     .pipe( dest('build/img') ) //las almacena en el disco duro .

     done();
 }

 function javascript( done ){
     src('src/js/**/*.js')
     .pipe(sourcemaps.init())
     .pipe(terser() )
     .pipe(sourcemaps.write('.') )
        .pipe(dest('build/js'));

        done();
 }

function dev( done ) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel( imagenes, versionWebp, javascript, dev); // Paralell es una de las dos herramientas que nos da gulp para iniciar procesos en simultaneo
