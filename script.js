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
    if (!listaDeCompras.includes(produto)) {
      listaDeCompras.push(produto);
      atualizarLista();
    }
  }
  
  // Atualiza a lista com opção de riscar
  function atualizarLista() {
    listaUl.innerHTML = "";
    listaDeCompras.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
  
      // Clique para riscar/desriscar
      li.onclick = () => {
        li.classList.toggle("riscado");
      };
  
      listaUl.appendChild(li);
    });
  }
  
  // Botão para limpar tudo
  function limparLista() {
    listaDeCompras = [];
    atualizarLista();
  }
  function adicionarProdutoManual() {
    const input = document.getElementById("inputManual");
    const produto = input.value.trim();
  
    if (produto !== "" && !listaDeCompras.includes(produto)) {
      listaDeCompras.push(produto);
      atualizarLista();
      input.value = "";
    } else if (listaDeCompras.includes(produto)) {
      alert("Este item já está na sua lista.");
    }
  }
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
  window.onload = () => {
    document.body.classList.add("carregado");
  };
  function adicionarProdutoManual() {
    const input = document.getElementById("inputManual");
    const produto = input.value.trim();
  
    if (produto !== "" && !listaDeCompras.includes(produto)) {
      listaDeCompras.push(produto);
      atualizarLista();
      input.value = "";
    } else if (listaDeCompras.includes(produto)) {
      alert("Este item já está na sua lista.");
    }
  }
  function enviarWhatsApp() {
    if (listaDeCompras.length === 0) {
      alert("Sua lista está vazia!");
      return;
    }
  
    const mensagem = "🛒 Minha lista de compras:\n\n" +
      listaDeCompras.map((item, i) => `✅ ${i + 1}. ${item}`).join("\n");
  
    const url = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  }
  window.onload = () => {
  document.body.classList.add("carregado");

  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.opacity = "0";
    setTimeout(() => loader?.remove(), 400); // remove após a transição
  }, 1200);
};


            
