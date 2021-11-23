import { crearListadoIndex } from "./indexListado.js";


const URL="http://localhost:3000/anuncios";
const $divTablaIndex = document.getElementById("divTablaIndex");

let anuncios = [];

document.addEventListener('DOMContentLoaded', function() {  
    console.log("entra al listener")  
    getAll();
 }, false);  


function inyectarListadoIndex()
{
    console.log("llega a inyectar y esta es el anuncios len "+anuncios.length);
    if(anuncios.length > 0)
    {
        console.log("anuncios en inyectar "+anuncios);
        $divTablaIndex.appendChild(crearListadoIndex(anuncios));
    }
    else
    {
        $divTablaIndex.innerHTML = "<p>No hay autos disponibles</p>"
    } 
}

export function getAll(){
    const xhr = new XMLHttpRequest();  

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          anuncios = data;
          inyectarListadoIndex(); 
        } else {
          console.error(`Error: ${xhr.status} : ${xhr.statusText} `);          
          alert(`Error: ${xhr.status} : ${xhr.statusText} `);
        }        
      } else {
         console.log(xhr.readyState);
      }    
    };
  
    xhr.open("GET", URL);
    xhr.send();
  };



