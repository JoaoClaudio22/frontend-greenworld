const formLogin = document.getElementById("formLogin");

let iEmail = document.getElementById("email");
let iPassword = document.getElementById("password");
let iName = document.getElementById("name");

const urlApiLogin = "http://localhost:8080/login"


async function efetuarLogin(){
    
    try{
        const response = await fetch(urlApiLogin, 
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    login: iEmail.value,
                    password: iPassword.value,
                })
            })

            if(response.ok){

               
                alert("Login Efetuado com Sucesso")
                const data = await response.json()
                const token = data.token

                localStorage.setItem("token",token)
                localStorage.setItem("usuario",iEmail.value)
               

                console.log(`TokenJWT = ${token}`)
                window.location.href = "../../public/dashboard.html"
            }else{
                if (response.status === 403) {
                    alert("Usuario ou senha incorretos!");
                }
                
            }
    } catch(error){
        console.log("Usuario ou senha incorretos!");
        console.log(error);
    }
    
}



formLogin.addEventListener("submit",(evt) => {
    evt.preventDefault()

    efetuarLogin()
})
