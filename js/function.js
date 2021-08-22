// Genearacion de interfaz de productos
function productosUI(productos, id){
     $(id).empty();
     for (const producto of productos){
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

function seleccionProducto(e) {
     toastr.warning('Intente añadiendo el producto al carrito' , 'Página en mantenimiento' , {
          "closeButton": true,
          "progressBar": true,
          "showDuration": "3",
          "hideDuration": "1",
          "timeOut": "3000",
          "positionClass": "toast-bottom-right",
     });
}

function comprarProducto(e){
     e.preventDefault();
     const idProducto   = e.target.id;
     const añadido = carrito.find(p => p.id == idProducto);
     if(añadido == undefined){
          carrito.push(catalogo.find(p => p.id == idProducto));
     }else{
          agregarCantidad(1, añadido);
     }
     localStorage.setItem("carrito",JSON.stringify(carrito));
     carritoInterfaz(carrito);
     $('#botonFinalizarCompra').show();
     notificacionAdd();
}

function carritoInterfaz(productos){
     $('#carritoCantidad').html(productos.length);
     $('#carritoProductos').empty();
     for (const producto of productos) {
          $('#carritoProductos').append(registroCarrito(producto));
     }
     $('.btnEliminar').on('click', eliminarCarrito);
     $('.btn-add').click(addCantidad);
     $('.btn-sub').click(subCantidad);
}

function registroCarrito(producto){
     console.log(producto);
     return              `<div class="productos-menu row mb-2">
     <img class="img-carrito rounded" src="${producto.image}" alt="${producto.image}">
     <div class="ml-2">
     <p> ${producto.nombre}
     <div>
     <span class="badge badge-warning">$ ${producto.precio}</span>
     <span class="badge badge-dark">${producto.cantidad}</span>
     <span class="badge badge-success"> $ ${subtotal(producto)}</span>
     <a id="${producto.id}" class="btn btn-info btn-add modBtn-editar ml-3 px-2 py-0">+</a>
     <a id="${producto.id}" class="btn btn-warning btn-sub modBtn-editar px-2 py-0">-</a>
     <a id="${producto.id}" class="btn btn-danger btnEliminar modBtn-editar px-2 py-0">x</a>
     </div>
     </p>
     </div>
     </div>
     <hr>
     `
}

//--------------------------
function agregarCantidad(valor, producto) {
     producto.cantidad += valor;
}
function subtotal(producto){
     return producto.cantidad * producto.precio;
}
//--------------------------
function eliminarCarrito(e){
     carrito = carrito.filter(producto => producto.id != e.target.id);
     carritoInterfaz(carrito);
     localStorage.setItem("carrito",JSON.stringify(carrito));
     if (carrito == "") {
          $('#botonFinalizarCompra').hide();
     }
     notificacionEliminar();
}

function addCantidad(){
     let producto = carrito.find(p => p.id == this.id);
     agregarCantidad(1, producto);
     $(this).parent().children()[1].innerHTML = producto.cantidad;
     $(this).parent().children()[2].innerHTML = subtotal(producto);
     localStorage.setItem("carrito",JSON.stringify(carrito));
}

function subCantidad(){
     let producto = carrito.find(p => p.id == this.id);
     if(producto.cantidad > 1){
       agregarCantidad(-1, producto);
       $(this).parent().children()[1].innerHTML = producto.cantidad;
       $(this).parent().children()[2].innerHTML = subtotal(producto);
       localStorage.setItem("carrito",JSON.stringify(carrito));
     }
   }

function notificacionAdd() {
     toastr.success('El producto se ha añadido al carrito' , 'S h o e s +' , {
          "closeButton": true,
          "progressBar": true,
          "showDuration": "3",
          "hideDuration": "1",
          "timeOut": "3000",
     });
}

function notificacionEliminar() {
     toastr.error('El producto se ha eliminado del carrito' , 'S h o e s +' , {
          "closeButton": true,
          "progressBar": true,
          "showDuration": "3",
          "hideDuration": "1",
          "timeOut": "3000",
     });
}