const btnQuemSomos = document.querySelector("#quem-somos")
const btnServices = document.querySelector("#servicos")
const btnDepoimento = document.querySelector("#depoimentos-link")
const btnFormulario = document.querySelector("#formulario-cadastro")


function scrollTo(element){
    document.querySelector(element).scrollIntoView({behavior: "smooth"})
}



btnQuemSomos.addEventListener("click", (evt) => {
    evt.preventDefault()
    
    scrollTo("#quem-somos-text")
})


btnServices.addEventListener("click", (evt) => {
    evt.preventDefault()

    scrollTo("#servicos-text")
})

btnDepoimento.addEventListener("click", (evt) => {
    evt.preventDefault()

    scrollTo("#depoimentos")
})

btnFormulario.addEventListener("click", (evt) => {
    evt.preventDefault()

    scrollTo("#form-cadas")
})