const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")
//Remote tela de pesquisa
buttonSearch. addEventListener("click", () => {
    modal.classList.remove("hide")
})
//Adiciona tela de pesquisa
close.addEventListener("click", () => {
    modal.classList.add("hide")
})