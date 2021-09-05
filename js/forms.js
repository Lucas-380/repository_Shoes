//------------------------Crear Cuenta--------------------------------
$('#form-crearCuenta').submit(function (e) { 
    e.preventDefault();
    const inputs = $("#form-crearCuenta :input");
    const data = { nombre: inputs[0].value,  
                            apellido: inputs[1].value,
                            email: inputs[2].value,
                            contraseña: inputs[3].value,
                            calle1: inputs[4].value,
                            calle2: inputs[5].value,
                            ciudad: inputs[6].value,
                            estado: inputs[7].value,
                            cp: inputs[8].value,
                            condiciones: inputs[9].value };
    $.post("https://jsonplaceholder.typicode.com/posts", data,  (data, estado) => {
        console.log(estado);
        console.log(data);
        if(estado == "success"){
            swal("Cuenta creada", "Tu cuenta ya esta disponible", "success");  
        }else{
            swal("Ups", "Algo ha salido mal, vuelva a intentarlo", "warning");  
        };
    });
});

//-------------------------Form de contacto---------------------------
$('#formContacto').submit(function (e) { 
    e.preventDefault();
    const inputs = $("#formContacto :input");
    const data = { nombre: inputs[0].value,  
                            apellido: inputs[1].value,
                            email: inputs[2].value,
                            motivo: inputs[3].value,
                            comentario: inputs[4].value };
    $.post("https://jsonplaceholder.typicode.com/posts", data,  (data, estado) => {
        console.log(estado);
        console.log(data);
        if(estado == "success"){
        swal("Gracias por ponerte en contacto", "Una respuesta sera enviada al mail pronto", "success");  
        }else{
            swal("Ups", "Algo ha salido mal, vuelva a intentarlo", "warning");  
        };
    });
});

//---------------------------------Newsletter---------------------------------
$('#formNewsletter').submit(function (e) { 
    e.preventDefault();
    const inputs = $("#formNewsletter :input");
    const data = { email: inputs[0].value };
    $.post("https://jsonplaceholder.typicode.com/posts", data,  (data, estado) => {
        console.log(estado);
        console.log(data);
        if(estado == "success"){
        swal("Te has suscrito a nuestro Newsletter", "Pronto recibiras nuestras noticias a tu mail", "success");  
        }else{
            swal("Ups", "Algo ha salido mal, vuelva a intentarlo", "warning");  
        };
    });
});
