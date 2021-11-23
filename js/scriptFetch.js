import { actualizarTabla } from "./backendScript.js";


const URL="http://localhost:3000/anuncios";

export let anuncios = [];


///GET
export function getAll(){

  fetch(URL)
  .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
  .then((data)=>{
    anuncios = data;
    actualizarTabla(anuncios);
  }) 
  .catch(error => {
      console.error(error);
      alert(error);
  })
  .finally(() => {
  });
};


///ALTA
export function createAnuncio(anuncio){  

  const options={
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(anuncio)
  };   


  fetch(URL, options)
  .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
  .then((data)=>{
      anuncios = data;
      actualizarTabla(anuncios);    
  }) 
  .catch(error => {
      console.error(error);
      alert(error);
  })
  .finally(() => {
  });     
};

///BAJA
export function deleteAnuncio(id){

  const options={
    method: "DELETE"        
  };   

  fetch(URL +"/" + id, options)
  .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
  .then((data)=>{
    anuncios = data;
    actualizarTabla(anuncios); 
  }) 
  .catch(error => {
    alert(error);
  })
  .finally(() => {
  });  
};

///MODIFICACIÓN
export function updateAnuncio(anuncio){

  const options={
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
      },
    body: JSON.stringify(anuncio)
  };   

  fetch(URL +"/" + anuncio.id, options)
  .then(response => response.ok ? response.json() : Promise.reject(new Error(`Error: ${response.status} : ${response.statusText} `)))
  .then((data)=>{
    anuncios = data;
    actualizarTabla(anuncios);    
  }) 
  .catch(error => {
    console.error(error);
    alert(error);
  })
  .finally(() => {
  });       
};