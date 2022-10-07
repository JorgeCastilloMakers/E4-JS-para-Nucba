// Para esta entrega vamos a trabajar con asincronismo, utilizando la API de Pokemon.

// Deberán:

// 👉 Crear un input de tipo number ,un botón y un contenedor vacío tal como hicimos en las entregas anteriores.
// 👉 Con el número que se ponga, hacer una llamada a la pokeapi y renderizar una card con los datos del Pokémon encontrado. Lo mínimo que deberá tener la card es el nombre, su tipo principal (pueden intentar poner todos) , su altura y peso (expresada en metros y kilogramos, tendrán que dividir el alto y peso que les llegue por 10), y una de sus imágenes.

// 👉 En caso de que no se encuentre ningún pokemon, renderizar un mensaje de error. En caso de que no se ingrese un número, renderizar otro mensaje de error acorde.



// Les dejamos un ejemplo de como puede ser la llamada a la API:
// 👉 https://pokeapi.co/api/v2/pokemon/890

// Revisen la API (https://pokeapi.co/) , investiguen el objeto y vean como conseguir los datos que necesitan.

// 🆙 Entregar el link de Github , en el cual debe estar linkeado el deploy del Vercel de su aplicación (mediante Github nosotros deberíamos poder ver el Vercel vinculado a su repositorio). 



//Función para renderizar las cards con los datos de la api
const renderPoke = (pokemon) => {
    displayPoke.innerHTML = `
                            <div class="${pokemon.Tipo}" >
                                <div><img src="${pokemon.Pic}"></div>
                                <div class="name"><h2>${pokemon.Nombre.toUpperCase()}</h2><h3>Exp ${pokemon.Exp}</h3></div>
                                <div class="stats">
                                    <h2 class="id">#${pokemon.Id}</h2>
                                    <div class="data">
                                        <h3>
                                            <i class="fa-solid fa-diamond ${pokemon.Tipo}"></i>${pokemon.Tipo}
                                        </h3>
                                        <h3>
                                            <i class="fa-solid fa-up-down ${pokemon.Tipo}"></i>${pokemon.Altura}
                                        </h3>
                                        <h3>
                                            <i class="fa-solid fa-scale-unbalanced ${pokemon.Tipo}"></i>${pokemon.Peso}
                                        </h3>
                                    </div>
                                </div>

                            </div>`
                        }

//Función para borrar la card cuando surja un error.
const deleteRender = () => {
    displayPoke.innerHTML = "";
}

//Función para buscar el pokemon según su id
const buscarPoke = async () => {

    const respuesta = await request();//Trayendo la data del request
    if (!inputNumber.value){
        showError(inputNumber.value);
    }else{
    let tipo = respuesta.types.map((tipo) => { return tipo.type.name;}).join(" , ");//Mapeando los tipos en una variable
    let imgPoke = respuesta.sprites.other.home.front_default;
    let pokemon = {
        Id: respuesta.id,
        Nombre: respuesta.name,
        Tipo: tipo,
        Altura: `${respuesta.height / 10}m`,
        Peso: `${respuesta.weight / 10}kg`,
        Pic: `${imgPoke}`,
        Exp: respuesta.base_experience
    };//Objeto con los datos obtenidos
    renderPoke(pokemon)//Le paso a renderPoke los datos para renderizar
}

}

//Función de errores para input vacío y pokemon no encontrado.
const showError = (valor) => {
    if (valor === ""){
        Swal.fire({
            title: '¡Error!',
            width: 250,
            text: 'Debes ingresar un número',
            imageUrl: './assets/img/pokebola.gif',
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: 'pokebola',
            confirmButtonColor: 'rgb(156, 134, 7)',
          })
        console.log("esta vacio el input");
        deleteRender();
        return
    }else if (valor === "no existe"){
        Swal.fire({
            title: '¡Error!', 
            width: 250,
            text: 'No se encuentra un pokemon con ese numero, ¡intenta otro!',
            imageUrl: './assets/img/pika-defo.gif',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'pikochu',
            confirmButtonColor: 'rgb(156, 134, 7)',
          })
        console.log("no hay pokemon con ese numero");
        deleteRender();
        return
    }

}


const init = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        buscarPoke();
        
    })
};

init()
