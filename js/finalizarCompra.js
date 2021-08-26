$(document).ready(function () {
  if ("carrito" in localStorage) {
    productosCarrito = JSON.parse(localStorage.getItem("carrito"));
    compraUI(productosCarrito);
  }
  cuentaUI();
  $("#btn-confirmar").click(alerta);
});
const correo = document.getElementById("correo");
const cliente = document.getElementById("cliente");

precio(JSON.parse(localStorage.getItem("carrito")));
let precioSubtotal = productosEnCarrito.reduce((a, b) => a + b, 0);
let imp = iva(precioSubtotal);

function cuentaUI() {
  $("#cuentaProductos").empty();
  $("#cuentaProductos").append(
    registroCarrito(precioSubtotal, imp, total(precioSubtotal, imp))
  );
}

function compraUI(carrito) {
  $("#listaProductos").empty();
  for (const producto of carrito) {
    $("#listaProductos").append(finalizarCompra(producto));
  }
  $(".btn-delete").click(borrarProducto);
}

function finalizarCompra(producto) {
  return `
                                                       <div class="row finalProductos">
                                                            <button id="${producto.id}" type="button" class="btn modBtn-compra btn-delete">X</button>
                                                            <img class="col-lg-3 img-finalizarCompra" src="${producto.image}" alt="${producto.image}">
                                                            <p class="col-lg-4">${producto.nombre}</p>
                                                            <p class="col-lg-3">${producto.precio} $ARS</p>
                                                            <p class="col-lg-1 mar">${producto.cantidad}</p>
                                                       </div>
                                                       `;
}

function borrarProducto(e) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito = carrito.filter((producto) => producto.id != e.target.id);
  compraUI(carrito);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  window.location.reload();
}

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

function registroCarrito(subtotal, imp, total) {
  return `      <div class="cuentas">
                         <p>Subtotal:  ARS$ ${subtotal}</p>
                         <p>IVA:  ARS$ ${imp}</p>
                         <p class="pago rounded">Total a pagar: ARS$ ${total}</p>
                    </div>
                    <button type="submit" id="btn-confirmar" class="btn btn-confirmacionCompra" value="Send Email">Confirmar compra</button>
                    <a href="../pages/catalogo.html" class="btn btn-cancelarCompra">Cancelar compra</a>`;
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
