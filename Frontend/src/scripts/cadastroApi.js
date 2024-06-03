const form = document.getElementById("form-contact");

let iName = document.getElementById("name");
let iEmail = document.getElementById("email");
let iPassword = document.getElementById("password");
let iPasswordConfirmed = document.getElementById("password-confirmed");
let iTel = document.getElementById("tel");
let iService = document.getElementById("servicos");

const urlApiCadastro = "http://localhost:8080/usuarios"


function clearInput(){
    iName.value =""
    iEmail.value =""
    iPassword.value =""
    iPasswordConfirmed.value = ""
    iTel.value =""
}



function cadastrar(){
    fetch(urlApiCadastro,
    {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            nome: iName.value,
            login: iEmail.value,
            password: iPassword.value,
            telefone: iTel.value
        })
    })
    .then((res) => {
        
        window.location.href = "../../public/login.html"

        alert("Usuario Cadastrado com Sucesso!")
        console.log(res)
        
    
    })
    .catch((res) => {console.log(res)})
}

form.addEventListener("submit", (evt) => {
    evt.preventDefault()

    const nameValue = iName.value.trim()
    const loginValue = iEmail.value.trim()
    const passwordValue = iPassword.value.trim()
    const passwordConfirmedValue = iPasswordConfirmed.value.trim()
    const telValue = iTel.value.trim()

    


    if( iPassword.value === iPasswordConfirmed.value){
       
        if (nameValue === '' || loginValue === '' || passwordValue === '' || telValue === '' || passwordConfirmedValue === '') {
            alert('Por favor, preencha todos os campos corretamente!');
            return; // Sai da função se algum campo estiver vazio
        }else{
            cadastrar()
            clearInput()
        }
        
    }else{
        alert('As senhas não coincidem! Por favor, verifique e tente novamente.')
    }

})
  
