import { crearTablaBackend} from "./backendTabla2.js";
import { AnuncioAuto } from "./anuncioAuto.js";
//métodos
//import { getAll, createAnuncio, deleteAnuncio, updateAnuncio, anuncios} from "./scriptXMLHttpRequest.js"; //XMLHttpRequest - CMLHttpRequest
//import { getAll, createAnuncio, deleteAnuncio, updateAnuncio, anuncios} from "./scriptFetch.js"; //Fetch
import { getAll, createAnuncio, deleteAnuncio, updateAnuncio, anuncios} from "./scriptAxios.js"; //Axios


const $divTablaBackend = document.getElementById("divTablaBackend"); 
const $divAlert = document.getElementById("divAlert");

export let anunciosParaExportar = anuncios;
getAll();
actualizarTablaConSpinner(anuncios); 

//los eventos para filtrar por check
const $formulario = document.forms[0]; 
const $filtroTransaccion = document.getElementById("txtFiltroTransaccion");
const $chkTitulo = document.getElementById("titulo");
const $chkTransaccion = document.getElementById("transaccion");
const $chkDescripcion = document.getElementById("descripcion");
const $chkPrecio = document.getElementById("precio");
const $chkNum_Puertas = document.getElementById("num_Puertas");
const $chkNum_Kms = document.getElementById("num_KMS");
const $chkNum_Potencia = document.getElementById("num_Potencia");

$chkTitulo.addEventListener("change", eventoCheck);
$chkTransaccion.addEventListener("change", eventoCheck);
$chkDescripcion.addEventListener("change", eventoCheck);
$chkPrecio.addEventListener("change", eventoCheck);
$chkNum_Puertas.addEventListener("change", eventoCheck);
$chkNum_Kms.addEventListener("change", eventoCheck);
$chkNum_Potencia.addEventListener("change", eventoCheck);



function eventoCheck(){
    actualizarTabla(anuncios);
}


$filtroTransaccion.addEventListener("change", (e)=>{
    
    const $textoSelect = document.getElementById("txtFiltroTransaccion").value;
    
    if($textoSelect == "todos")
    {
        actualizarTabla(anuncios);
        document.getElementById("celdaPromedio").value = "";
    }
    else
    {
        var listaFiltrada = anuncios.filter(a => a.transaccion ===  $textoSelect).map(a => a);
        actualizarTabla(listaFiltrada);
        document.getElementById("celdaPromedio").value = promedio(listaFiltrada);      
    } 

});

function promedio(data){

    if(data.length > 0)
    {
        var suma = data.reduce((prev, actual) => {
            return prev + actual.precio;
        }, 0);
        return suma / data.length;
    }
    else
    {
        return "";
    }
}


window.addEventListener("click", (e)=>{    

    if(e.target.matches("td"))
    {
        const id = e.target.parentElement.id; 
        const anuncioElegido = anuncios.find((anuncio)=> anuncio.id == id);

        cargarFormulario(anuncioElegido);
    }
    else if(e.target.matches("#eliminar")){

        handlerDelete(parseInt($formulario.txtId.value));
    }
    else if(e.target.matches("#cancelar")){

        $formulario.reset();
    }

})

function cargarFormulario(anuncio)
{
    const {txtId, txtTitulo, rdoOperacion, txtDescripcion, nmbrPrecio, nmbrPuertas, nmbrKms, nmbrPotencia} = $formulario;
    
    txtId.value = anuncio.id;
    txtTitulo.value = anuncio.titulo;
    rdoOperacion.value = anuncio.transaccion;
    txtDescripcion.value = anuncio.descripcion;
    nmbrPrecio.value = anuncio.precio;
    nmbrPuertas.value = anuncio.nroPuertas;
    nmbrKms.value = anuncio.km;
    nmbrPotencia.value = anuncio.potencia; 

    cambioBotonesModificarEliminar();

}

function cambioBotonesModificarEliminar()
{

    //cambio el texto del botón enviar
    const botonEnviar = document.getElementById("enviar");
    botonEnviar.value = "\uf0c7 Modificar";

    //muestro el botón eliminar
    const botonEliminar = document.getElementById("eliminar");
    botonEliminar.hidden = false;

    //cambio el texto del título
    const tituloCRUD = document.getElementById("tituloCRUD");
    tituloCRUD.innerHTML = "<h2>Modificar</h2>";
}

function cambioBotonesAlta()
{
      
     //cambio el texto del botón enviar
     const botonEnviar = document.getElementById("enviar");
     botonEnviar.value = "\uf0c7 Guardar";
 
     //muestro el botón eliminar
     const botonEliminar = document.getElementById("eliminar");
     botonEliminar.hidden = true;
 
     //cambio el texto del título
     const tituloCRUD = document.getElementById("tituloCRUD");
     tituloCRUD.innerHTML = "<h2>Alta Producto</h2>";
     
}

$formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
   
    const {txtId, txtTitulo, rdoOperacion, txtDescripcion, nmbrPrecio, nmbrPuertas, nmbrKms, nmbrPotencia} = $formulario;
    const formAnuncio = new AnuncioAuto(txtId.value, txtTitulo.value, rdoOperacion.value, nmbrPrecio.value, txtDescripcion.value, nmbrPuertas.value, nmbrKms.value, nmbrPotencia.value)

    //if(formAnuncio.id === ''){ 
    if(txtId.value === ''){ 
       
        formAnuncio.id = Date.now();
        handlerCreate(formAnuncio);
    }
    else{ 
        
        handlerUpdate(formAnuncio);
    }

});


//ALTA
const handlerCreate = (nuevoAnuncio) =>{

    createAnuncio(nuevoAnuncio);
    actualizarTablaConSpinner(anuncios);
    $formulario.reset();
    alerta("Elemento creado con éxito.");

};

//BAJA
const handlerDelete = (id) => {

    if(confirm("¿Desea eliminar? \n Esta operación es irreversible"))
    {
        deleteAnuncio(id);
        actualizarTablaConSpinner(anuncios);   
       $formulario.reset();
       $formulario.txtId.value = '';
       cambioBotonesAlta();

       alerta("Elemento borrado con éxito.");
    }

    console.log(anuncios);
 
};

//MODIFICACIÓN
const handlerUpdate = (anuncioAEditar) =>{
    

    if(confirm("¿Desea modificar?"))
    {
        updateAnuncio(anuncioAEditar);
     
        $formulario.reset();  
    
        cambioBotonesAlta()
        alerta("Modificación realizada con éxito.");
    }

}

export function borrarHijosElemento(elemento){
    while(elemento.hasChildNodes())
    {
        elemento.removeChild(elemento.firstElementChild);
    }
}

export function actualizarTablaConSpinner(anuncios)
{
    $divTablaBackend.appendChild(crearSpinner());

    setTimeout(() => {
        actualizarTabla(anuncios);
    }, 2000);

}

export function actualizarTabla(anuncios)
{
    borrarHijosElemento($divTablaBackend);


        if(anuncios.length ==0)
        {
            const p = document.createElement("p");
            const contenido = document.createTextNode("");
            p.appendChild(contenido);
            $divTablaBackend.appendChild(p);

        }
        else{
            $divTablaBackend.appendChild(crearTablaBackend(anuncios));
        }
        
    //}, 2000);

}

//SPINNER
export function crearSpinner() {
    const spinner = document.createElement("img");
    spinner.src = "./assets/spinner.gif";
    spinner.alt = "Progressbar";
    spinner.width = 300;
    return spinner;
};


//ALERTAS
function alerta ( texto ) {

    $divAlert.innerHTML="<div class='alert alert-dark' role='alert'><p class='text-center'>"+texto+"</p></div>";
    
    setTimeout(()=>{
        borrarHijosElemento($divAlert);
    }, 2000);
    
  }


