/**
 * Created by Jorge Sarmiento on 11/12/2015.
 */

productos = [
    {
        nombre: "Jugo",
        precio: 5,
        cantidad:50
    },{
        nombre: "Cereal",
        precio: 12,
        cantidad:20
    },{
        nombre: "Leche",
        precio: 6,
        cantidad:70
    },{
        nombre: "Carne",
        precio: 20,
        cantidad: 40
    },{
        nombre: "Pollo",
        precio: 22,
        cantidad: 120
    },{
        nombre: "Chocolate",
        precio: 3,
        cantidad: 80
    }
];

function element(el){
    return document.getElementById(el);
}

function login(){
    if(element("u").value==""){
        element("erruser").innerHTML = "Debe ingresar un nombre de usuario.";
    } else if(element("p").value==""){
        element("errpw").innerHTML = "Por favor ingrese su contraseña.";
    } else{
        localStorage.setItem("nombre", element("u").value);
        alert("Bienvenido, " + element("u").value);
        window.location = "../Test/cart.html";
    }
}

function cart(){
    if(localStorage.getItem("nombre") == null || localStorage.getItem("nombre") == ""){
        alert("Estimado usuario, usted no se ha logeado y por medidas de seguridad sera regresado a la pagina de inicio.");
        window.location = "../Test/index.html";
    }
    element("user").innerHTML += localStorage.getItem("nombre");
    for(var i = 0;i<productos.length;i++){
        element("tabla").innerHTML+= '<tr>'
            + '<td>'+productos[i].nombre+'</td>'
            + '<td>'+productos[i].precio+'</td>'
            + '<td>'+productos[i].cantidad+'</td>'
            + '<td><input type="number"'
            +'id="cant'+i+'"'
            +'min="1" max="'+productos[i].cantidad+'"></td>'
            + '</tr>';

    }
}

function calcTotal(){
    var factura = {
        productos: [],
        total: 0
    };

    var total = parseInt(0);
    for(var i = 0; i<productos.length; i++){
        if(element("cant"+i).value != null && element("cant"+i).value != ""){
            factura.productos.push(new Object({
                nombre: productos[i].nombre,
                cantidad: element("cant"+i).value
            }));
            factura.total+= parseInt(element("cant"+i).value)*productos[i].precio;
        }
    }
    console.log(factura);
    return factura;
}

function purchase(){
    localStorage.setItem("factura", JSON.stringify(calcTotal()));
    element("compra").innerHTML = '';
    element("compra").innerHTML = '<h2>Debe pagar '+ calcTotal().total +' por los ' +
        'productos. Mostrando factura en 5 segundos.</h2>';
    window.setTimeout(function(){ window.location = "../Test/checkout.html"}, 5000);
    //window.location = "../Test/checkout.html";

}

function showReceipt(){
    if(localStorage.getItem("nombre") == null || localStorage.getItem("nombre") == ""){
        alert("Estimado usuario, usted no se ha logeado y por medidas de seguridad sera regresado a la pagina de inicio.");
        window.location = "../Test/index.html";
    }
    //Me veo en la obligacion de pasar la factura como un string para convertirlo luego a objeto,
    //ya que de pasarlo como objeto pierdo la informacion.

    var factura = JSON.parse(localStorage.getItem("factura"));
    element("user").innerHTML += localStorage.getItem("nombre")
        + (new Date().getHours() <= 18 ? ", que tengas un buen dia.":", que pases buenas noches.");
    for(var i=0; i<factura.productos.length; i++){
        element("fact").innerHTML+= '<tr>'
            + '<td>'+factura.productos[i].nombre+'</td>'
            + '<td>'+factura.productos[i].cantidad+'</td>'
            + '</tr>';

        element("total").innerHTML = '<h2>El total de tus compras es de '+ factura.total +'</h2>';
    }
}