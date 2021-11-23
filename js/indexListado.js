



export const crearListadoIndex = (data) =>{

    const parrafo = document.createElement("p"); 

    data.forEach(element => {

        console.log("entra aquí");

        const card1 = "<div class='row'>";
        const card2 = "<div class='row cards' style='width: auto; margin: auto auto;'>";
        const card3 = "<div class='card bg-light' style='width: 60rem;'>"
        const card4 =  "<div class='card-body'>"   
        const titulo = "<h5 class='card-title'>"+element.titulo+"</h5>";
        const descripcion = "<p class='card-text'>"+element.descripcion+"</p>";
        const precio = "<p>Precio: "+element.precio+"$</p>";
        const puertas = "<p><i class='fas fa-door-open' aria-hidden='true'></i> Puertas: "+element.nroPuertas+"</p>";
        const km = "<p> <i class='fa fa-tachometer' aria-hidden='true'></i>Km: "+element.km+"</p>";
        const potencia = "<p>  <i class='fas fa-bolt' aria-hidden='true'></i>Potencia: "+element.potencia+"</p>";
        const link = "<a href='#' class='btn btn-primary'>Ver vehículo</a>";
        const cerrarDiv = "</div></div></div></div>";

        parrafo.innerHTML += card1+card2+card3+card4+titulo+descripcion+precio+puertas+km+potencia+link+cerrarDiv;

    });

    console.log(parrafo);
    return parrafo;

}

