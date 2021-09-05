class Zapatilla {
     constructor(id, nombre, precio, image, cantidad) {
        this.id = parseInt(id);
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.image = image;
        this.cantidad = cantidad || 1;
    }
}

if('nuevosProductos' in localStorage){
    const newProductos = JSON.parse(localStorage.getItem('nuevosProductos'));
    for (const producto of newProductos) {
        catalogo.push( new Zapatilla (producto.id , producto.nombre , producto.precio, producto.image));
    }
}