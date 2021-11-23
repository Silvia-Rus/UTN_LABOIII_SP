import { crearSpinner, actualizarTabla } from "./backendScript.js";
const URL="http://localhost:3000/anuncios";

export let anuncios = [];


///GET
export function getAll(){
    const xhr = new XMLHttpRequest();  

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          anuncios = data;
          actualizarTabla(anuncios);         
        } else {
          console.error(`Error: ${xhr.status} : ${xhr.statusText} `);          
          alert(`Error: ${xhr.status} : ${xhr.statusText} `);
        }
     
      } else {
          crearSpinner();
      }    
    };
  
    xhr.open("GET", URL);
    xhr.send();
  };


///POST
export function createAnuncio(anuncio){

    const nuevoAnuncio = JSON.stringify(anuncio)
    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          anuncios = data;
           
        } else {
          console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
          alert(`Error: ${xhr.status} : ${xhr.statusText} `);
        }
      } else {
      }    
    });
 
    xhr.open("POST", URL);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(nuevoAnuncio);    
};

///DELETE
export function deleteAnuncio(id){

    const xhr = new XMLHttpRequest();  

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4){
        if(xhr.status >= 200 && xhr.status < 300){
            const data = JSON.parse(xhr.responseText);
            anuncios = data;
            actualizarTabla(anuncios); 
            
        }
        else{
            console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
            alert(`Error: ${xhr.status} : ${xhr.statusText} `);
        }
      } else {
      }    
    });

    xhr.open("DELETE", URL + "/" + id);
    xhr.send();    
};

///PUT
export function updateAnuncio(anuncio){

    const anuncioToEdit = JSON.stringify(anuncio);

    const xhr = new XMLHttpRequest();
  
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4){

        if(xhr.status >= 200 && xhr.status < 300){
            const data = JSON.parse(xhr.responseText);
            anuncios = data;
            actualizarTabla(anuncios);             
        }
        else{
            console.error(`Error: ${xhr.status} : ${xhr.statusText} `);
            alert(`Error: ${xhr.status} : ${xhr.statusText} `);
        }
      } else {
      }    
    });

    xhr.open("PUT", URL + "/" + anuncio.id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(anuncioToEdit);   
};