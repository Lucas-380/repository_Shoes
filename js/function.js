//---------Genearacion de interfaz de productos
function productosUI(productos, id) {
    $(id).empty();
    for (const producto of productos) {
        $(id).append(`   <article id="prod" class="col-lg-3 col-md-6 mb-5 cat__img">
                                                            <div id="${producto.id} "class="card cardMod" style="width: 15rem;">
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
    $('.btn_carrito').click(comprarProducto);
    $('.btn-compra').click(seleccionProducto);
}

//--------------------Compra del producto
function comprarProducto(e) {
    e.preventDefault();
    const idProducto = e.target.id;
    const añadido = carrito.find(p => p.id == idProducto);
    if (añadido == undefined) {
        carrito.push(catalogo.find(p => p.id == idProducto));
        notificacionAdd();
    }
    else{
        errorCantidad();
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carritoInterfaz(carrito);
    $('#botonFinalizarCompra').show();
}

//--------------------------Funciones del carrito
function carritoInterfaz(productos) {
    $('#carritoProductos').empty();
    for (const producto of productos) {
        $('#carritoProductos').append(registroCarrito(producto));
    }
    $('.btnEliminar').on('click', eliminarCarrito);
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
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function subCantidad() {
    let carrito = (JSON.parse(localStorage.getItem("carrito")))
    let producto = carrito.find(p => p.id == this.id);
    if (producto.cantidad > 1) {
        agregarCantidad(-1, producto);
        $(this).parent().children()[2].innerHTML = producto.cantidad;
        $(this).parents().children()[8].innerHTML = "$ " + subtotal(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        
    }
}

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

function errorCantidad(e) {
    toastr.warning('Las cantidades las elige al finalizar la compra', 'Ya se ha añadido el producto al carrito', {
        "closeButton": true,
        "progressBar": true,
        "showDuration": "3",
        "hideDuration": "1",
        "timeOut": "5000",
        "positionClass": "toast-top-center",
    });
};