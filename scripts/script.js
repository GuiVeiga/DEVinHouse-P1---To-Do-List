const campoEntrada = document.querySelector(".inputField input");
const btnAdd = document.querySelector(".inputField button");
const listaDeAtividades = document.querySelector(".lista");

btnAdd.onclick = () => {
    let entradaUsuario = campoEntrada.value;

    let listaLocalStorage = localStorage.getItem('lista-atividades'); // Pega o conteúdo do localStorage

    if (listaLocalStorage == null) { // Se o localStorage estiver vazio
        listaElementos = []; // Cria um novo Array
    }
    else {
        listaElementos = JSON.parse(listaLocalStorage); // transforma uma Sting Json em um Objeto Javascript
    }

    listaElementos.push(entradaUsuario); // Adiciona o elemento na lista
    localStorage.setItem('lista-atividades', JSON.stringify(listaElementos)); // transforma um Objeto Javascript em uma Sting Json
    exibirTarefas(); // chama a função para exibir as tarefas registradas na lista
}

function exibirTarefas() {
    let listaLocalStorage = localStorage.getItem('lista-atividades'); // Pega o conteúdo do localStorage

    if (listaLocalStorage == null) { // Se o localStorage estiver vazio
        listaElementos = []; // Cria um novo Array
    }
    else {
        listaElementos = JSON.parse(listaLocalStorage); // transforma uma Sting Json em um Objeto Javascript
    }

    let elemento = '';
    listaElementos.forEach((element, index) => {
        elemento = `<li> ${element} <button onclick="removeItem(${element})">&times;</button></li>`
    });
    listaDeAtividades.innerHTML = elemento; // Adiciona o elemento na lista ul do HTML
}

/*
function adicionar() {
    let elemento = campoEntrada.value;

    let listaLocalStorage = localStorage.getItem('lista-atividades'); // Pega o conteúdo do localStorage

    if (listaLocalStorage == null){ // Se o localStorage estiver vazio
        lista = []; // Cria um novo Array
    }
    else {
        lista = JSON.parse(listaLocalStorage); // transforma uma Sting Json em um Objeto Javascript
    }

    lista.push(elemento); // Adiciona o elemento na lista
    localStorage.setItem('lista-atividades', JSON.stringify(lista)); // transforma um Objeto Javascript em uma Sting Json
}

btnAdd.addEventListener('click', adicionar)
*/