$('#titles').hide();

$('#carouselExampleIndicators').hide();

$(document).ready(function () {
    if ("carrito" in localStorage) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
        carritoInterfaz(carrito);
        if (carrito == "") {
            $('#botonFinalizarCompra').hide();
        }
    }
    //Peticion de productos Jquery
    const URLGET = "../DATA.json";
    $.get(URLGET, function (datos, estado) {
        if (estado == "success") {
            for (const literal of datos) {
                catalogo.push(new Zapatilla(literal.id, literal.nombre, literal.precio, literal.image));
            }
        } else {
            console.log("ERROR");
        }
        lista(catalogo);
        productosUI(catalogo, '#article');
    })
});
window.addEventListener('load', () => {
    $('#carouselExampleIndicators').slideDown();
    $('#titles').slideDown();
})



//---------------------Filtros de busqueda
$("#busquedaProducto").keyup(function (e) {
    const criterio = this.value.toUpperCase();
    if (criterio != "") {
        const encontrados = catalogo.filter(p => p.nombre.includes(criterio));
        productosUI(encontrados, '#article')
    } else {
        productosUI(catalogo, '#article');
    }
});

$('.inputPrecio').change(function (e) {
    const min = $('#minProducto').val();
    const max = $('#maxProducto').val();
    if ((min >= 0) && (max >= 0)) {
        const encontrados = catalogo.filter(p => p.precio >= min && p.precio <= max);
        productosUI(encontrados, '#article');
    } else {
        productosUI(catalogo, '#article');
    }
});

//-----------------------OPCIONES DE NOTIFICACIONES (toastr)----------------
toastr.options.showMethod = 'slideDown';
toastr.options.hideMethod = 'slideUp';

//-----------------------Animaciones con jquery-------------------------------


const duracion2s = 2000;
const duracion10s = 10000;
$('#title').animate({
    opacity: '1'
}, duracion2s).delay(5000).slideUp();

