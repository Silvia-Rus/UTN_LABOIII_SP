import { actualizarTabla, actualizarTablaConSpinner } from "./backendScript.js";

const URL="http://localhost:3000/anuncios";

export let anuncios = [];


export function getAll(){

  axios.get(URL)
  .then(({data}) => {
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

export const createAnuncio = async(anuncio) => {

    const nuevaAnuncio = anuncio;

    const options={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(anuncio)
    };  

    try{
        const {data} = await axios(URL, options);
    }
    catch(error){
        console.error(error.response);
    }
    finally{
    }   
};

//ALTA
/*export function createAnuncio(anuncio){
  
  axios.post(URL, anuncio)
  .then(({data}) => {
    anuncios = data;
    actualizarTablaConSpinner(anuncios);
  }) 
  .catch(error => {
      console.error(error);
      alert(error);
  })
  .finally(() => {
  });
}*/

///BAJA
export const deleteAnuncio = async(id) => {

  try{
    const {data} = await axios.delete(URL + "/" + id);
    anuncios = data;
    actualizarTablaConSpinner(anuncios);
    alert(error.response);
  }
  catch(error){
      console.error(error.response);
  }
  finally{
  }    
};

///MODIFICACIÓN
  export function updateAnuncio(anuncio){
    axios.put(URL+ "/" + anuncio.id, anuncio)
    .then(({data}) => {
      anuncios = data;
      actualizarTablaConSpinner(anuncios);
    }) 
    .catch(error => {
        console.error(error);
        alert(error);
    })
    .finally(() => {
    });
  }

  