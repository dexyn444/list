const sugestoes = [
  "Arroz", "Feijão", "Leite", "Pão", "Ovos", 
  "Açúcar", "Sal", "Macarrão", "Café", "Óleo"
];

const produtosUl = document.getElementById("produtos");
const listaUl = document.getElementById("listaCompras");
let listaDeCompras = [];

// Mostrar sugestões
sugestoes.forEach(produto => {
  const li = document.createElement("li");
  li.textContent = produto;
  li.onclick = () => adicionarNaLista(produto);
  produtosUl.appendChild(li);
});

// Adiciona item à lista e atualiza a tela
function adicionarNaLista(produto) {
  // Evita duplicados
  if (!listaDeCompras.some(item => item.nome === produto)) {
    listaDeCompras.push({ nome: produto, riscado: false });
    atualizarLista();
  }
}

// Atualiza a lista com opção de riscar e salva no localStorage
function atualizarLista() {
  listaUl.innerHTML = "";

  listaDeCompras.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.nome;

    if (item.riscado) {
      li.classList.add("riscado");
    }

    // Clique para riscar/desriscar e salvar estado
    li.onclick = () => {
      listaDeCompras[index].riscado = !listaDeCompras[index].riscado;
      atualizarLista();
    };

    listaUl.appendChild(li);
  });

  // Salva a lista atual no navegador
  localStorage.setItem("listaCompras", JSON.stringify(listaDeCompras));
}

// Limpar lista e limpar localStorage
function limparLista() {
  listaDeCompras = [];
  localStorage.removeItem("listaCompras");
  atualizarLista();
}

// Adicionar produto manualmente
function adicionarProdutoManual() {
  const input = document.getElementById("inputManual");
  const produto = input.value.trim();

  if (produto !== "" && !listaDeCompras.some(item => item.nome === produto)) {
    listaDeCompras.push({ nome: produto, riscado: false });
    atualizarLista();
    input.value = "";
  } else if (listaDeCompras.some(item => item.nome === produto)) {
    alert("Este item já está na sua lista.");
  }
}

// Alternar modo claro/escuro
function alternarModo() {
  const body = document.body;
  const botao = document.getElementById("modoToggle");

  body.classList.toggle("escuro");

  if (body.classList.contains("escuro")) {
    botao.innerHTML = "☀️ Modo Claro";
  } else {
    botao.innerHTML = "🌙 Modo Escuro";
  }
}

// Enviar lista pelo WhatsApp
function enviarWhatsApp() {
  if (listaDeCompras.length === 0) {
    alert("Sua lista está vazia!");
    return;
  }

  const mensagem = "🛒 Minha lista de compras:\n\n" +
    listaDeCompras.map((item, i) => {
      return `${item.riscado ? '✅' : '✅'} ${i + 1}. ${item.nome}`;
    }).join("\n");

  const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

// Minimizar/mostrar sugestões
function alternarSugestoes() {
  const lista = document.querySelector('.sugestoes ul');
  const botao = document.querySelector('.sugestoes .minimizar');

  lista.classList.toggle('fechado');
  botao.textContent = lista.classList.contains('fechado') ? '+' : '–';
}

// Carregar lista salva e remover loader
window.onload = () => {
  document.body.classList.add("carregado");

  const listaSalva = localStorage.getItem("listaCompras");
  if (listaSalva) {
    listaDeCompras = JSON.parse(listaSalva);
    atualizarLista();
  }

  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.opacity = "0";
    setTimeout(() => loader?.remove(), 400);
  }, 1200);
};
