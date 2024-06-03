const loginUser = localStorage.getItem("usuario");
const id = document.getElementById("idResidencia");



const formFindById = document.getElementById("buscarId");
const formEdicao = document.getElementById("editarResidenciaForm")
const avisoDiv = document.getElementById("avisoDiv");
const formCadastro = document.getElementById("cadastrarResidenciaForm");
const IRua = document.getElementById("rua");
const IBairro = document.getElementById("bairro");
const ICidade = document.getElementById("cidade");
const IEstado = document.getElementById("estado");
const IMoradores = document.getElementById("moradores");
const ITelhado = document.getElementById("telhado");

const urlApiResidencias = `http://localhost:8080/dashboard/residencias?login=${loginUser}`;
const urlApiCadastrarResidencia = `http://localhost:8080/dashboard/cadastrar-residencia?login=${loginUser}`;
const urlApiEditarResidencia = `http://localhost:8080/dashboard/residencias/${id}`


// Funcao que busca no banco as residencias cadastradas a apartir do login do usuario
async function carregarResidencias() {
  const resp = await fetch(urlApiResidencias, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const data = await resp.json();

  if (data.length == 0) {
    // Caso nao tenha nada na resposta da API ( Não há residencias cadastradas para aquele ususario) é exibido uma Div de Aviso para o User
    avisoDiv.classList.replace("d-none", "d-block");
  }
  console.log(data);

  renderizarDadosTabela(data);
}

//Ao entrar na pagina, faz a chamada da funcao carregarResidencias (Metodo GET) para verificar se ja existem residencias cadastradas no banco
carregarResidencias();


// Requisicao GET que faz a busca por ID das residencias cadastradas
async function findResidenceById(id) {
  const resp = await fetch(
    `http://localhost:8080/dashboard/residencias/${id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  const data = await resp.json();
  return data;
}


document
  .getElementById("fecharModalBtn")
  .addEventListener("click", function (evt) {
    evt.preventDefault();

    $("#modal-detalhes").modal("hide");
  });

document
  .querySelector("#fecharModalBtn")
  .addEventListener("click", function () {
    console.log("asds");
  });

document
  .getElementById("cadastrarResidenciaForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Fechar o modal
    $("#cadastrarResidenciaModal").modal("hide");
  });


// Botao de Logout
document.getElementById("logoutButton").addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "../../public/login.html";
});



//API - CADASTRO RESIDENCIA
async function efetuarCadastroResidencia() {
  try {
    const response = await fetch(urlApiCadastrarResidencia, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        areaTelhado: ITelhado.value,
        bairro: IBairro.value,
        cidade: ICidade.value,
        estado: IEstado.value,
        qntdMoradores: IMoradores.value,
        rua: IRua.value,
      }),
    });

    if (response.ok) {
      alert("Imovel cadastrado com sucesso!");

      window.location.href = "../../public/dashboard.html";
      const data = await response.json();
      renderizarDadosTabela();

      console.log(data);
    } else {
      if (response.status === 403) {
        alert("Erro ao cadastrar residencia!");
      }
    }
  } catch (error) {
    console.log("Erro ao cadastrar residencia");
    console.log(error);
  }
}
formCadastro.addEventListener("submit", (evt) => {
  evt.preventDefault();

  efetuarCadastroResidencia();
});

//API - Edição de Residencia
async function efetuarEdicaoResidencia(id) {
  try {
    const response = await fetch(`http://localhost:8080/dashboard/residencias/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        areaTelhado: document.getElementById("Itelhado").value,
        bairro: document.getElementById("Ibairro").value,
        cidade: document.getElementById("Icidade").value,
        estado: document.getElementById("Iestado").value,
        qntdMoradores: document.getElementById("Imoradores").value,
        rua: document.getElementById("Irua").value
      }),
    });

    if (response.ok) {
      alert("Imovel editado com sucesso!");

      window.location.href = "../../public/dashboard.html";
      const data = await response.json();
      renderizarDadosTabela();

      console.log(data);
    } else {
      if (response.status === 403) {
        alert("Erro ao editar imovel!");
      }
    }
  } catch (error) {
    console.log("Erro ao editar imovel!");
    console.log(error);
  }
}


// Função responsável por renderizar os dados recebidos da API no frontend
function renderizarDadosTabela(data) {
  const tbody = document.querySelector("table tbody");

  data.forEach((item) => {
    const tr = document.createElement("tr");

    // Adicionar células à linha
    const idResidenciaTd = document.createElement("td");
    idResidenciaTd.textContent = item.id;

    const enderecoTd = document.createElement("td");
    enderecoTd.textContent = `${item.rua}, ${
      item.bairro
    } - ${item.cidade.toUpperCase()} - ${item.estado}`;

    const qntdMoradoresTd = document.createElement("td");
    qntdMoradoresTd.textContent = item.qntdMoradores;

    const areaTelhadoTd = document.createElement("td");
    areaTelhadoTd.textContent = item.areaTelhado;

    const actionsTd = document.createElement("td");
    // Adicionar botões de ação usando classes do Bootstrap
    const abrirDetalhesBtn = document.createElement("button");
    abrirDetalhesBtn.textContent = "Relatório";
    abrirDetalhesBtn.className = "btn btn-primary btn-sm ml-3";
    abrirDetalhesBtn.addEventListener("click", () => abrirDetalhes(item.id));

    const editarBtn = document.createElement("button");
    editarBtn.textContent = "Editar";
    editarBtn.className = "btn btn-warning btn-sm ml-3";
    editarBtn.setAttribute("data-target", "#editarResidenciaModal");
    editarBtn.setAttribute("data-toggle", "modal");
    editarBtn.addEventListener("click", () => editarResidencia(item.id));

    const deletarBtn = document.createElement("button");
    deletarBtn.textContent = "Deletar";
    deletarBtn.className = "btn btn-danger btn-sm ml-3";
    deletarBtn.addEventListener("click", () => deletarResidencia(item.id));

    actionsTd.appendChild(abrirDetalhesBtn);
    actionsTd.appendChild(editarBtn);
    actionsTd.appendChild(deletarBtn);

    tr.appendChild(idResidenciaTd);
    tr.appendChild(enderecoTd);
    tr.appendChild(qntdMoradoresTd);
    tr.appendChild(areaTelhadoTd);
    tr.appendChild(actionsTd);

    tbody.appendChild(tr);
  });
}

// Função responsável por receber os dados da API (findResidenceById) e renderizar no Modal de Detalhes
async function abrirDetalhes(id) {
  // Encontre o modal pelo ID
  var modal = document.getElementById("modal-detalhes");
  // Abra o modal
  modal.style.display = "block";

  const pVolumeTotal = document.getElementById("volumeTotal");
  const pVolumeAtual = document.getElementById("volumeAtual");
  const pPorcentagem = document.getElementById("porcentagemRestante");
  const pDiasDeAutonomia = document.getElementById("autonomia");
  const pEconomiaAgua = document.getElementById("economia");

  const data = await findResidenceById(id);

  if (data.length != 0) {
    var modal = document.getElementById("detalhesModal");
    // Abra o modal
    modal.style.display = "block";

    let porcentagemUtilizada = Math.round(
      100 - data.relatorio.porcentagemAtual
    );
    let diaUtilizados = Math.round(
      data.relatorio.volumeAtual / data.relatorio.gastoDiario
    );

    pVolumeTotal.innerText = `${data.relatorio.volumeTotal} Litros`;
    pVolumeAtual.innerText = `${data.relatorio.volumeAtual} Litros`;
    pPorcentagem.innerText = `${porcentagemUtilizada}%`;
    pDiasDeAutonomia.innerText = `${diaUtilizados} Dias restantes`;
    pEconomiaAgua.innerText = `${data.relatorio.gastoDiario * 2} Litros`;
  }
}


// Funcao responsável por atualizar os dados que serão reenviados ao backend
async function editarResidencia(id) {
  const data = await findResidenceById(id);

  if (data != 0) {
    
    document.getElementById("Irua").value = data.rua;
    document.getElementById("Ibairro").value = data.bairro;
    document.getElementById("Icidade").value = data.cidade;
    document.getElementById("Iestado").value = data.estado;
    document.getElementById("Imoradores").value = data.qntdMoradores;
    document.getElementById("Itelhado").value = data.areaTelhado;

    formEdicao.addEventListener("submit", (evt) => {
      evt.preventDefault();
    
      efetuarEdicaoResidencia(id);
    });
  }
}


// Metodo Delete na API responsável por deletar a residencia pelo ID
async function deletarResidencia(id) {
  const resp = await fetch(
    `http://localhost:8080/dashboard/residencias/deletar=${id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }
  );
  window.location.reload();
  const data = await resp.json();

  return data;
}
