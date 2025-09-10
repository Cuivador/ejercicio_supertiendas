//alert(``) jeje lo pegue para obtener los backstrigs
//funcion para mostrar el precio del producto
function precio() {
  let producto = document.getElementById("productos");
  producto.addEventListener("change", function () {//queda a la espera de un cambio en el select de productos para realizar las siguientes instrucciones
    let precioProd = "";//variable inicializada vacia
    switch (this.value) { //apunta al valor seleccionado del select el cual fue el que disparo el evento
      case "papa": // ara cada case si el valor seleccionado coincide con el parametro asignara un valor a la variable precioProd
        precioProd = 1900;
        break;

      case "arroz":
        precioProd = 6300;
        break;

      case "azucar":
        precioProd = 2800;
        break;

      case "cafe":
        precioProd = 15500;
        break;

      case "leche":
        precioProd = 2600;
        break;

      case "manzana":
        precioProd = 8500;
        break;

      case "harina":
        precioProd = 1900;
        break;

      case "pan":
        precioProd = 2650;
        break;
    }
    document.getElementById("precio").value = precioProd;//busca el elemento que coincida con el id precio y le asigna el valor de precioProd
  });
}

let totalVenta=0;//variable acumuladora para guardar el acumulado de la compra

//funcion para calcular la compra
function supermercado() {
  let producto = document.getElementById("productos").value;
  let cantidad = document.getElementById("cantidad").value;
  let totProd, totIva, totProdIva, desc, subTotal;
  const iva = 0.19;
  //Primer switch para hacer la validacion del producto seleccionado y el valor digitado en el input cantidad sea correcto
  switch (true) { 
    case producto === ""://estos case permiten que se mande solo el valor correcto para realizar los calculos
      alert("¡DEBE SELECCIONAR PRIMERO SU PRODUCTO!");
      break;

    case cantidad == "":
      alert("¡CAMPO DE CANTIDAD VACIO!");
      break;

    case cantidad <= 0 || cantidad % 1 != 0:
      alert(
        "¡VALOR ERRONEO! ¡ESTE CAMPO NO ADMITE NUMEROS DECIMALES, NUMEROS NEGATIVOS O EL NUMERO 0!"
      );
      break;
    default: // si el valor de cantidad es el correcto ejecutara los calculos correspondientes
      let precio = parseInt(document.getElementById("precio").value);
      cantidad = parseInt(cantidad);
      totProd = precio * cantidad;
      totIva = totProd * iva;
      totProdIva = totProd + totIva;

      if (cantidad > 5) {
        desc = totProdIva * 0.05;
      } else {
        desc = totProdIva * 0;
      }
      subTotal = totProdIva - desc;
      totalVenta=totalVenta+subTotal;

      document.getElementById("subpago").innerHTML = `Subtotal: $${totProd}
      <br>Descuento 5%: $${desc.toFixed(2)}
      <br>IVA 19%: $${totIva.toFixed(2)}
      <br>Total producto: $${subTotal}`;

      document.getElementById("totalCompra").innerHTML=`Total general de venta: $${totalVenta}`;  // total de la venta acumulada   
      document.getElementById("subtotal").disabled=true;// se desactiva el boton de calcula subtotal para evitar volver a enviar el mismo producto selecionado
      break;
  }
}

function limpiar(){
  document.getElementById("productos").value="";//busca el elemento que coincida con el id y le asigna un valor vacio
  document.getElementById("precio").value="";
  document.getElementById("cantidad").value="";
  document.getElementById("subpago").innerHTML="";//busca el elemento que coincida con el id y reemplaza el contenido de la etiqueta con vacio
  document.getElementById("subtotal").disabled=false;//  se sactiva el boton de calcula subtotal para seleccionar mas productos
}

function totalizar(){
  alert(`El total de la compra es: $${totalVenta}`);
  limpiar();//llama la funcion limpiar
  document.getElementById("totalCompra").innerHTML="";
  totalVenta=totalVenta*0;//al multiplicarla por 0 se reinicia la sumatoria de la variable en 0
}