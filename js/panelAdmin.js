$(document).ready(function () {
     if('nuevosProductos' in localStorage){
          productosRegistrados = JSON.parse(localStorage.getItem("nuevosProductos"));
          lista(productosRegistrados);
     }
     else{
          lista(catalogo);
     }
     const URLGET ="../DATA.json";
     $.get(URLGET, function (datos, estado){
          if(estado == "success"){
               for (const literal of datos){
                    catalogo.push(new Zapatilla(literal.id, literal.nombre, literal.precio, literal.image));
               }
          }else{ console.log("ERROR"); }
          lista(catalogo);
     })

});

$('#registroProductos').submit(function () { 
     const inputs = $('#registroProductos').children();
     const nuevo = new Zapatilla(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
     productosRegistrados.push(nuevo);
     localStorage.setItem('nuevosProductos', JSON.stringify(productosRegistrados));
});

function lista(catalogo) {
     for (const producto of catalogo) {
          $('#listaProductos').append(`
                                                  <div class=" row productosLista">
                                                  <p class="col-lg-1">${producto.id}</p>
                                                  <p class="col-lg-4">${producto.nombre}</p>
                                                       <p class="col-lg-3">${producto.precio} $ARS</p>
                                                       <p class="col-lg-3">${producto.cantidad}</p>
                                                       <button id="${producto.id}" type="button" class="btn modBtn-editar b-delete">Eliminar</button>
                                                       </div>
                                                       `)
                                                  }
                                             }
