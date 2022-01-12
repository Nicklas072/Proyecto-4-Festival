
document.addEventListener('DOMContentLoaded', function(){

    iniciarApp();
});

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        console.log(sobreFestival.getBoundingClientRect() )

        if(sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }

    });
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a'); //seleccionamos el nav y sus a

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault(); //quitamos su accion por default


            const seccionScroll = e.target.attributes.href.value;  //marcamos los atributos del href
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior : "smooth"}); //efecto
        });

    });
}

function crearGaleria(){                             // SI PRESTAS ATENCION, ESTE CODIGO SE LEE SOLO
    const galeria = document.querySelector('.galeria-imagenes')  //galeria-imagenes es el selector del UL que hicimos en el html

     for(let i = 1; i <= 12; i++){
         const  imagen = document.createElement('picture');  // creamos los elementos que van a contener las imagenes
         imagen.innerHTML = `  
             <source srcset="build/img/thumb/${i}.webp" type="image/webp">

             <img loading="lazy" width="200" height="300" src="buil/img/thumb/${i}.jpg" alt="imagen galeria">
         `;  //el for recorre la carpeta de  la ubicacion incrementando de uno en uno para ir recorriendo todos


         imagen.onclick = function(){
             mostrarImagen(i);
         }
      galeria.appendChild(imagen) // inserta lo creado en el cobjeto imagen en el objeto galeria que esta conectaa al UL
  }
}

function mostrarImagen(id){
    const  imagen = document.createElement('picture'); //cre   mento que nos va a mostrar temporalmente la imagen
    imagen.innerHTML = `  
        <source srcset="build/img/grande/${id}.webp" type="image/webp">

        <img loading="lazy" width="200" height="300" src="buil/img/grande/${id}.jpg" alt="imagen galeria">
    `; // busca y guarda en el parametro la imagen seleccionada
     
    // CREA EL OVERLAY CON LA IMAGEN
    const overlay = document.createElement('DIV'); //crea el elemento donde va a ir la imagen
    overlay.appendChild(imagen); //deposita la imagen en dicho elemento
    overlay.classList.add('overlay'); //le da una clase para poder ponerle estilo en el scss
    overlay.onclick = function(){
        const body = document.querySelector('body'); 
        body.classList.remove('fijar-body');
        overlay.remove();

    }

    //BOTON (SOLO EL BOTON) PARA CERRAR LA VENTANA MODAL (ASI SE LES CONOCE)
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
        cerrarModal.classList.add('btn-cerrar');

         // FIJA EL SCROLL CUANDO ABRIMOS Y LO DEVUELVE AL CERRAR
    cerrarModal.onclick = function(){ //lE ESTAMOS DANDO FUNCION AL OBJETO CERRARmODAL
        const body = document.querySelector('body'); 
        body.classList.remove('fijar-body')

        overlay.remove();
    }


    overlay.appendChild(cerrarModal);


      //AÑADE AL HTML
    const body = document.querySelector('body'); //selecciona donde va a ir el elemento con la imagen
    body.appendChild(overlay); // depoosita el div en la clase body
    body.classList.add('fijar-body')




}
