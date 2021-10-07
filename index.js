// chrome://extensions/
let myLeads = [];
let nombreURL = [];

const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const div = document.querySelector("#container");
const btn = document.querySelector("#input-btn");
const borrarbtn = document.getElementById("borrar");
borrarbtn.addEventListener("dblclick", borrardblc);
borrarbtn.addEventListener("click", borrar);
// const tabbtn= document.getElementById("tab-btn")
// tabbtn.addEventListener("click",tab);

/**
 * * * extrae la direccion URL de la pagina actual
 */
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  inputEl.value = tabs[0].url;
});

//localStorage.setItem("pages","www.logrado.com");

let almacen = JSON.parse(localStorage.getItem("page"));
let almacenNombre = JSON.parse(localStorage.getItem("name"));

if (almacen && almacenNombre) {
  myLeads = almacen;
  nombreURL = almacenNombre;

  render();
}

btn.addEventListener("click", function () {
  let aceptado = prompt("¿Nombre de la pagina?");

  nombreURL.unshift(aceptado);

  if (aceptado) {
    ulEl.textContent = " ";
    myLeads.unshift(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("page", JSON.stringify(myLeads));
    localStorage.setItem("name", JSON.stringify(nombreURL));

    render();
  }
});

function render() {
  let lista = "";
  for (let i = 0; i < myLeads.length; i++) {
    //lista +="<li><a href='#'>"+myLeads[i] +"</a></li>";

    lista += `<li>
        <a target='_blank' href='${myLeads[i]}'</a>
        ${nombreURL[i]}
        </li>`;
    //ulEl.innerHTML+="<li>"+myLeads[i] +"</li>";

    // const li = document.createElement("li");//estas lineas hacen lo mismo que la linea superior/*
    // li.textContent = myLeads[i];
    // ulEl.append(li);

    console.log(lista);
  }
  ulEl.innerHTML = lista; //otra manera de representarlo
}

function borrardblc() {
  localStorage.clear();
  myLeads = [];
  nombreURL = [];
  inputEl.value = "";
  render();
}
function borrar() {
  let aceptado = confirm("¿Desea eliminarlo?");

  if (aceptado) {
    myLeads.shift();
    nombreURL.shift();
    localStorage.setItem("page", JSON.stringify(myLeads));
    localStorage.setItem("name", JSON.stringify(nombreURL));
    render();
  }
}
