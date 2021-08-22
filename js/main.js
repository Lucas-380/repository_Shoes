$(document).ready(function () {
     if("carrito" in localStorage){
         carrito = JSON.parse(localStorage.getItem("carrito"));
         carritoInterfaz(carrito);
         if (carrito == "") {
          $('#botonFinalizarCompra').hide();
     }
     }
     $(".dropdown-menu").click(function (e) { 
         e.stopPropagation();
     });
     $('#carouselExampleIndicators').hide();
     //Peticion de productos Jquery
     const URLGET ="../DATA.json";
     $.get(URLGET, function (datos, estado){
          if(estado == "success"){
               for (const literal of datos){
                    catalogo.push(new Zapatilla(literal.id, literal.nombre, literal.precio, literal.image));
               }
          }else{ console.log("ERROR"); }
          productosUI(catalogo, '#article');
          $('.btn_carrito').click(comprarProducto);
          $('.btn-compra').click(seleccionProducto);
     })
});

window.addEventListener('load', () => {
     $('#carouselExampleIndicators').slideDown();
})

//-----------------------OPCIONES DE NOTIFICACIONES (toastr)----------------
toastr.options.showMethod = 'slideDown';
toastr.options.hideMethod = 'slideUp';

//-----------------------Animaciones con jquery-------------------------------
$('#dropdownMenuButton').click(function (e) {
     $("#probando").slideToggle();
})

const duracion2s = 2000;
const duracion10s = 10000;
$('#title').animate({
     opacity: '1'
},duracion2s).delay(5000).slideUp();