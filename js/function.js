//---------Genearacion de interfaz de productos
function productosUI(productos, id) {
    $(id).empty();
    for (const producto of productos) {
        $(id).append(`   <article class="col-lg-3 col-md-6 mb-5 cat__img">
                                                            <div class="card cardMod" style="width: 15rem;">
                                                            <img src="${producto.image}" alt="${producto.image}">
                                                                 <div class="card-body">
                                                                      <p class="card-text">ZAPATILLAS ${producto.nombre}</p>
                                                                      <p class="card-text precio">AR$${producto.precio}
                                                                      <button id="${producto.id}" class="btn_carrito"></button>
                                                                           <button id="${producto.id}" class="botonCat btn-compra">COMPRAR</button>
                                                                      </p>
                                                                 </div>
                                                            </div>
                                                       </article>
                                                       `);
    }
}

//--------------------Compra del producto
function comprarProducto(e) {
    e.preventDefault();
    const idProducto = e.target.id;
    const añadido = carrito.find(p => p.id == idProducto);
    if (añadido == undefined) {
        carrito.push(catalogo.find(p => p.id == idProducto));
    } else {
        agregarCantidad(1, añadido);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carritoInterfaz(carrito);
    $('#botonFinalizarCompra').show();
    notificacionAdd();
}

//--------------------------Funciones del carrito
function carritoInterfaz(productos) {
    $('#carritoCantidad').html(productos.length);
    $('#carritoProductos').empty();
    for (const producto of productos) {
        $('#carritoProductos').append(registroCarrito(producto));
    }
    $('.btnEliminar').on('click', eliminarCarrito);
    $('.btn-add').click(addCantidad);
    $('.btn-sub').click(subCantidad);
}

function registroCarrito(producto) {
    return `            <div class="productos-menu row mb-2">
    
                                <img class="img-carrito rounded" src="${producto.image}" alt="${producto.image}">
                                <div class="ml-2">
                                    <p> ${producto.nombre}
                                        <div class="row ml-1">
                                            <p class="precioCarrito">$ ${producto.precio}</p>
                                            <button id="${producto.id}" type="button" class="btn modBtn-compra btnEliminar btnX-carrito">X</button>
                                        </div>
                                    </p>
                                </div>
                            </div>
                            <hr>
     `
}

$('.toggle-btn').click(sidebar);

function sidebar() {
    $('#sidebar').toggleClass('active');
}

function agregarCantidad(valor, producto) {
    producto.cantidad += valor;
}

function subtotal(producto) {
    return producto.cantidad * producto.precio;
}

function eliminarCarrito(e) {
    carrito = carrito.filter(producto => producto.id != e.target.id);
    carritoInterfaz(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    if (carrito == "") {
        $('#botonFinalizarCompra').hide();
    }
    notificacionEliminar();
}

function addCantidad() {
    let carrito = (JSON.parse(localStorage.getItem("carrito")))
    let producto = carrito.find(p => p.id == this.id);
    agregarCantidad(1, producto);
    $(this).parent().children()[2].innerHTML = producto.cantidad;
    $(this).parents().children()[8].innerHTML = "$ " + subtotal(producto);

    // $('#cuentaProductos').children()[0].innerHTML = totales();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function subCantidad() {
    let carrito = (JSON.parse(localStorage.getItem("carrito")))
    let producto = carrito.find(p => p.id == this.id);
    if (producto.cantidad > 1) {
        agregarCantidad(-1, producto);
        $(this).parent().children()[2].innerHTML = producto.cantidad;
        $(this).parents().children()[8].innerHTML = "$ " + subtotal(producto);
        
        // $('#cuentaProductos').children()[0].innerHTML = totales();
        localStorage.setItem("carrito", JSON.stringify(carrito));
        
    }
}
//---------------------Filtros de busqueda
$("#busquedaProducto").keypress(function (e) { 
    const criterio = this.value.toUpperCase();
    if (criterio != ""){
        const encontrados = catalogo.filter(p => p.nombre.includes(criterio))
        productosUI(encontrados, '#article')
    }
});

//----------------------Notificaciones
function notificacionAdd() {
    toastr.success('El producto se ha añadido al carrito', 'S h o e s +', {
        "closeButton": true,
        "progressBar": true,
        "showDuration": "3",
        "hideDuration": "1",
        "timeOut": "3000",
        "positionClass": "toast-top-center",
    });
}

function notificacionEliminar() {
    toastr.error('El producto se ha eliminado del carrito', 'S h o e s +', {
        "closeButton": true,
        "progressBar": true,
        "showDuration": "3",
        "hideDuration": "1",
        "timeOut": "3000",
        "positionClass": "toast-top-center",
    });
}

function seleccionProducto(e) {
    toastr.warning('Intente añadiendo el producto al carrito', 'Página en mantenimiento', {
        "closeButton": true,
        "progressBar": true,
        "showDuration": "3",
        "hideDuration": "1",
        "timeOut": "3000",
        "positionClass": "toast-top-center",
    });
}