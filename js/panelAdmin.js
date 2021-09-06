$(document).ready(function () {
    if ('nuevosProductos' in localStorage) {
        productosRegistrados = JSON.parse(localStorage.getItem("nuevosProductos"));
    }
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
                                                       </div>
                                                       `)
    }
}

//---------------------Filtros de busqueda
$("#filtroAdmin").keyup(function (e) { 
    $('#listaProductos').empty();
    const criterio = this.value.toUpperCase();
    if (criterio != ""){
        const encontrados = catalogo.filter(p => p.nombre.includes(criterio));
        lista(encontrados, '#listaProductos')
    }else{
        lista(catalogo, '#listaProductos');
    }
});
