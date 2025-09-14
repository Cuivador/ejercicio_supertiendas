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
        precioProd = 2300;
        break;

      case "pan":
        precioProd = 2650;
        break;
    }
    document.getElementById("precio").value = precioProd;//busca el elemento que coincida con el id precio y le asigna el valor de precioProd
    corregido();//funcion que cambia el color del campo cuando ya se ha ingresado un valor
  });
}
//funcion para cambiar el color del select de productos cuando se realiza la correccion del dato
function corregido(){
  let prod = document.getElementById("productos");
  if(prod.value!=""){
    prod.style.backgroundColor="";
  }
}
//funcion para cambiar el color del campo valor cuando se realiza la correccion del dato
function corregido2(){
  let cant = document.getElementById("cantidad");
    if(cant.value!="" && cant.value > 0 ){
    cant.style.backgroundColor="";
    }
}

let totalVenta=0;//variable acumuladora para guardar el acumulado de la compra
let totVentas = [];

//funcion para calcular la compra
function supermercado() {
  let prod = document.getElementById("productos");
  let producto =prod.value;
  let cant = document.getElementById("cantidad");
  let cantidad = cant.value;
  let totProd, totIva, totProdIva, desc, subTotal;
  const iva = 0.19;
  //Primer switch para hacer la validacion del producto seleccionado y el valor digitado en el input cantidad sea correcto
  switch (true) { 
    case producto === ""://estos case permiten que se mande solo el valor correcto para realizar los calculos
      alert("¡DEBE SELECCIONAR PRIMERO SU PRODUCTO!");
      prod.focus();//accion para enfocar el elemento y resaltarlo en rojo
      prod.style.backgroundColor="#F28B82";//cambia el el color de fondo del elemento enfocado
      break;

    case cantidad === "":
      alert("¡CAMPO CANTIDAD VACIO! ¡DEBE DIGITAR UN VALOR EN CANTIDAD PARA CALCULAR!");
      cant.focus();//accion para enfocar el elemento y resaltarlo en rojo
      cant.style.backgroundColor="#F28B82";//cambia el el color de fondo del elemento enfocado
      break;

    case cantidad <= 0 || cantidad % 1 != 0: 
      alert("¡VALOR ERRONEO! ¡ESTE CAMPO NO ADMITE NUMEROS NEGATIVOS O EL NUMERO 0 O NUMEROS DECIMALES!");
      cant.focus();//accion para enfocar el elemento y resaltarlo en rojo
      cant.style.backgroundColor="#F28B82";//cambia el el color de fondo del elemento enfocado
      break;

    default: // si el valor de cantidad es el correcto ejecutara los calculos correspondientes
      corregido2();
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
      
      document.getElementById("lSubtotal").value=totProd.toFixed(2);
      document.getElementById("lDescuento").value=desc.toFixed(2);
      document.getElementById("lIVa").value=totIva.toFixed(2);
      document.getElementById("lTotal").value=subTotal.toFixed(2);
      document.getElementById("lTotalGeneral").value=totalVenta.toFixed(2);


      /*document.getElementById("subpago").innerHTML = `Subtotal: $${totProd}
      <br>Descuento 5%: $${desc.toFixed(2)}
      <br>IVA 19%: $${totIva.toFixed(2)}
      <br>Total producto: $${subTotal}`;

      document.getElementById("totalCompra").innerHTML=`Total general de venta: $${totalVenta}`;*/  // total de la venta acumulada   
      document.getElementById("subtotal").disabled=true;// se desactiva el boton de calcula subtotal para evitar volver a enviar el mismo producto selecionado
      break;
  }
}

function limpiar(){
  document.getElementById("productos").value="";
  document.getElementById("precio").value="";
  document.getElementById("cantidad").value="";

  document.getElementById("lSubtotal").value="";//busca el elemento que coincida con el id y le asigna un valor vacio
  document.getElementById("lDescuento").value="";
  document.getElementById("lIVa").value="";
  document.getElementById("lTotal").value="";//busca el elemento que coincida con el id y reemplaza el contenido de la etiqueta con vacio
  document.getElementById("subtotal").disabled=false;//  se sactiva el boton de calcula subtotal para seleccionar mas productos
  
  //adicionalmente limpiar sera usado para eliminar las ventas del dia y ocultara su caja contenedora en caso de estar en pantalla
  document.getElementById("ventaDelDia").innerHTML="";
  document.getElementById("cajaVentas").style.visibility="hidden"; 
}
//funcion para que el cliente pague el total de la compra
function totalizar(){
  if(totalVenta!=0){ //permita la ejecucion del codigo cuando se hay calculado por lo menos un subtotal
    totVentas.push(totalVenta);// almacena el total de ventas en un array para usarlo mas adelante
    alert(`El total de la compra es: $${totalVenta}`);
    limpiar();//llama la funcion limpiar
    document.getElementById("lTotalGeneral").value="";
    totalVenta=totalVenta*0;//al multiplicarla por 0 se reinicia la sumatoria de la variable en 0
    document.getElementById("ventaDia").disabled=false;//habilita el boton venta del dia cuando tenga al menos un valor insertado
  }
}
//funcion para mostrar las ventas generadas cuando se cierra la caja 
function ventaDia(){
  alert(`¡Generando venta del dia!`);
  document.getElementById("cajaVentas").style.visibility="visible";
  let TotVentaDia=0, valores;
  for(let t=0; t<totVentas.length; t++){
    TotVentaDia=TotVentaDia+totVentas[t];
    valores=document.getElementById("ventaDelDia");
    valores.innerHTML +=`Cliente ${t+1} - compra $${totVentas[t]}<br>`;
  }
  valores.innerHTML +=`Total Acumulado - $${TotVentaDia}`;
  while(totVentas.length>0){//ciclo para eliminar el ultimo elemento del array hasta que ya no queden elementos
    totVentas.pop();//elimina el ultimo elemento del array
  }
  document.getElementById("ventaDia").disabled=true;//y desactivara el boton de venta del dia 
  document.getElementById("subtotal").disabled=true;//tambien se desactiva el boton subtotal para no dejar agregar mas productos
  //debe proceder a usar el boton limpiar para volver a habilitar de nuevo el boton calcular subtotal
}