
const $chkTitulo = document.getElementById("titulo");
const $chkTransaccion = document.getElementById("transaccion");
const $chkDescripcion = document.getElementById("descripcion");
const $chkPrecio = document.getElementById("precio");
const $chkNum_Puertas = document.getElementById("num_Puertas");
const $chkNum_Kms = document.getElementById("num_KMS");
const $chkNum_Potencia = document.getElementById("num_Potencia");


function crearYAppendearTH(key, cabecera, texto)
{
    const th = document.createElement("th");
    const contenido = document.createTextNode(key);
    th.appendChild(contenido);
    th.textContent = texto;  
    cabecera.appendChild(th);
}

function crearTD(element)
{
    const td = document.createElement("td");
    td.textContent = element;
    return td;

}
export const crearTablaBackend = (data) =>{ //esto devuelve una tabla completa. esa tabla la cuelgo en el div. 

    const tabla = document.createElement("table");//aquí creamos lo que vamos a retornar
    tabla.classList.add('table');
    tabla.setAttribute('id','tablaBackend');
    const thead = document.createElement("thead");
    thead.classList.add('thead-dark');
    const tbody = document.createElement("tbody");
    const cabecera = document.createElement("tr"); //genero la row

  
    for (const key in data[0]) {
        if(key !== "id"){
            //const th = crearTH(key);   
            switch(key){
                case "titulo":
                    if(!$chkTitulo.checked) 
                    {        
                        crearYAppendearTH(key, cabecera, "Título")
                    }               
                    break;
                case "transaccion":
                    if(!$chkTransaccion.checked) 
                    {              
                        crearYAppendearTH(key, cabecera, "Transacción")
                    }     
                    break;
                case "precio":
                    if(!$chkPrecio.checked)
                    {              
                        crearYAppendearTH(key, cabecera, "Precio")
                    }     
                    break;
                case "descripcion":
                    if(!$chkDescripcion.checked) 
                    {              
                        crearYAppendearTH(key, cabecera, "Descripción")
                    }     
                    break;
                case "nroPuertas":
                    if(!$chkNum_Puertas.checked) 
                    {              
                        crearYAppendearTH(key, cabecera, "Puertas")
                    }     
                    break;
                case "potencia":
                    if(!$chkNum_Potencia.checked) 
                    {              
                        crearYAppendearTH(key, cabecera, "Potencia")
                    }     
                    break;             
                case "km":
                    if(!$chkNum_Kms.checked) 
                    {              
                        crearYAppendearTH(key, cabecera, "KMs")
                    }     
                    break;
                default:
                    crearYAppendearTH(key, cabecera, key)
                    break;
            }
        }                
    }
    Object.values(data).forEach((element) => {
    //data.forEach(element => {
        const tr = document.createElement("tr"); 
        //console.log(element)
        for (const key in element) {
            if(key === "id"){
                tr.setAttribute("id", element[key]);
            }
            else{
                const td = crearTD(element[key])
                //console.log(td)             
                    switch(key){
                        case "titulo":
                            if(!$chkTitulo.checked) ///ESTE ANDA
                            {
                                tr.appendChild(td);
                            }           
                            break;
                        case "transaccion":
                            if(!$chkTransaccion.checked) ///ESTE ANDA
                            {
                                tr.appendChild(td);
                            }   
                            break;
                        case "precio":
                            if(!$chkPrecio.checked) ///ESTE ANDA
                            {
                                tr.appendChild(td);
                            }   
                            break;
                        case "descripcion":
                            if(!$chkDescripcion.checked) ///ESTE ANDA
                            {
                                tr.appendChild(td);
                            }   
                            break;
                        case "nroPuertas":
                            if(!$chkNum_Puertas.checked) ///ESTE ANDA
                            {
                                tr.appendChild(td);
                            }   
                            break;
                        case "potencia":
                            if(!$chkNum_Potencia.checked) ///ESTE ANDA
                            {
                                tr.appendChild(td);
                            }   
                            break;               
                        case "km":
                            if(!$chkNum_Kms.checked) ///ESTE ANDA
                            {
                                tr.appendChild(td);
                            }   
                            break;
                      
                    }
                }
        }
        tbody.appendChild(tr);
    });

    thead.appendChild(cabecera); //le añadimos la cabecera al thead
    tabla.appendChild(thead); //le añadimos el thead a la tabla
    tabla.appendChild(tbody); //le añadimos el tbody a la tabla

    return tabla;

}

