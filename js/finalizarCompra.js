$(document).ready(function () {
    if ("carrito" in localStorage) {
        productosCarrito = JSON.parse(localStorage.getItem("carrito"));
        compraUI(productosCarrito);
    }
    cuentaUI();
    $("#btn-continuar").click(totales);
});

function cuentaUI() {
    $("#cuentaProductos").empty();
    $("#cuentaProductos").append(
        `<div class="cuentas w-100">
               <button id="btn-continuar" class="btn">Finalizar compra</button>
          </div>`
    );
}

function totales() {
    precio(JSON.parse(localStorage.getItem("carrito")));
    let precioSubtotal = productosEnCarrito.reduce((a, b) => a + b, 0);
    let imp = iva(precioSubtotal);

    function precio(carrito) {
        for (const producto of carrito) {
            const productos = producto.precio * producto.cantidad;
            productosEnCarrito.push(productos);
        }
    }

    function iva(subtotal) {
        return subtotal * 0.21;
    }

    function total(subtotal, iva) {
        return (subtotal + iva).toFixed(2);
    }
    $('.posicion').css("margin-left", "4.5rem");
    $('.btn-add').hide();
    $('.btn-sub').hide();
    $("#cuentaProductos").empty();
    $("#cuentaProductos").append(
        registroCarrito(precioSubtotal, imp, total(precioSubtotal, imp)));
    $("#btn-confirmar").click(alerta);
}

function compraUI(carrito) {
    $("#listaFinalizarCompra").empty();
    for (const producto of carrito) {
        $("#listaFinalizarCompra").append(finalizarCompra(producto));
    }
    $(".btn-delete").click(borrarProducto);
    $('.btn-add').click(addCantidad);
    $('.btn-sub').click(subCantidad);
}

function finalizarCompra(producto) {
    return `
                <div class="row finalProductos">
                    <button id="${producto.id}" type="button" class="btn modBtn-compra btn-delete ml-4 mr-3">X</button>
                    <img class="img-finalizarCompra" src="${producto.image}" alt="${producto.image}">
                    <p class="col-lg-3">${producto.nombre}</p>
                    <div class="row col-lg-6">
                        <p class="col-lg-4">$ ${producto.precio}</p>
                        <button id="${producto.id}" class="btn btn-add ml-4 mr-3">+</button>
                            <p class="posicion">${producto.cantidad}</p>
                        <button id="${producto.id}" class="btn btn-sub ml-4 mr-3">-</button>
                    </div>
                        <p class="">$ ${subtotal(producto)}</p>
                </div>
                <hr>
                `;
}

function borrarProducto(e) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito = carrito.filter((producto) => producto.id != e.target.id);
    compraUI(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.location.reload();
}
if ("carrito" in localStorage) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    if (carrito == "") {
        window.location.replace('../pages/catalogo.html')
    }
}

function registroCarrito(subtotal, imp, total) {
    return `   <div class="cuentas col-lg-6">
                        <p>Subtotal:  ARS$ ${subtotal}</p>
                        <p>IVA:  ARS$ ${imp}</p>
                        <p class="pago rounded">Total a pagar: ARS$ ${total}</p>
                    </div>
                    <div class="col-lg-5">
                        <button type="submit" id="btn-confirmar" class="btn btn-success col-6" value="Send Email">Confirmar compra</button>
                        <a href="../pages/catalogo.html" class="btn btn-danger col-6">Cancelar compra</a>
                    </div>
                    `;
}

function registroCarritoVacio() {
    $("#cuentaProductos").empty();
    $("#cuentaProductos").append(
        `<div class="cuentas">
               <h2>Vuelva a agregar Productos al carrito</h2>
          </div>`
    );
}

function confirmarCompra(e) {
    const URL = "https://jsonplaceholder.typicode.com/posts";
    $.post(URL, JSON.stringify(carrito), function (datos, estado) {
        console.log(datos);
        console.log(estado);
    });
    carrito = carrito.filter((producto) => producto.id != e.target.id);
    compraUI(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    registroCarritoVacio();
}

function alerta() {
    if (correo.value === "" || cliente.value === "") {
        swal({
            icon: "warning",
            title: "Oops...",
            text: "Ingrese todos los datos requeridos",
            buttons: false,
            timer: 2000,
        });
    } else {
        swal({
            title: "¿Estas seguro de que quieres comprar lo seleccionado?",
            text: "¡ Solo estamos a un paso !",
            buttons: ["Aún no", "Confirmar compra"],
        }).then((confirmar) => {
            if (confirmar) {
                swal("Se ha realizado la compra", {
                    icon: "success",
                });
                confirmarCompra();
            } else {
                swal("Puede seguir buscando en nuestro catalogo");
            }
        });
    }
}