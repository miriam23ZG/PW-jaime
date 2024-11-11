let titulo = document.getElementById("Titulo");
titulo.style.color = "red";

let parrafos = document.getElementsByTagName("p");
Array.from(parrafo).forEach((el, idx) => {
    el.innerText
})

let parrafo2 = document.getElementsByClassName("parrafo");
console.log(parrafo2[1].textContent);

let parrafo = document.querySelector(".parrafo");
console.log(parrafo.textContent);
