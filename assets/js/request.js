let displayPoke = document.getElementById("display");
const form = document.getElementById('form');
let inputNumber = document.getElementById('input-find');
const btnFind = document.getElementById('btn-find');
let displayCharts = document.querySelector('.display-charts');



const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
//Llamado a la api segun el número que se ingrese en el input
const request = async () => {
    try {
        const response = await fetch(baseUrl + inputNumber.value);
        const data = await response.json();
        return data;  

    } catch {
        showError("no existe"); 
    }

}



