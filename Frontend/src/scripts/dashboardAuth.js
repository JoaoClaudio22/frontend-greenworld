document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
  
    loader.style.display = "block";

    window.addEventListener("load", () => {
      loader.style.display = "none";
  });
  });


const token = localStorage.getItem("token");
const user = localStorage.getItem("usuario");


if (token == null) {
  alert("Voce nao esta autenticado!");
  window.location.href = "../../public/login.html";
} else {
    clearLocalStorage();
  }


function clearLocal() {
  localStorage.clear();
  alert(
    "Seu token de Segurança Expirou! Você será redirecionado à área de login"
  );
  window.location.href = "../../public/login.html";
  console.log("Token Expirou!");
}

function clearLocalStorage() {

  const intervalInMin = 120;

  const intervalInMill = intervalInMin * 60 * 1000;

  setInterval(clearLocal, intervalInMill);
}
