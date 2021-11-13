const campoEntrada = document.querySelector(".inputField input");
const btnAdd = document.querySelector(".inputField button");
const listaDeAtividades = document.querySelector(".lista");

exibirTarefas(); // chama a função para exibir as tarefas registradas na lista

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

// Função para exibir as tarefas adicionadas na lista ul do HTML
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
        elemento += `<li> ${element} <button onclick="removerItem(${index})">&times;</button></li>`
    });
    listaDeAtividades.innerHTML = elemento; // Adiciona o elemento na lista ul do HTML
    campoEntrada.value = ""; // Assim que uma tarefa é adicionada, limpa o campo de entrada
}

// Função para excluir tarefa da lista
function removerItem(index) {
    let listaLocalStorage = localStorage.getItem('lista-atividades'); // Pega o conteúdo do localStorage
    
    listaElementos = JSON.parse(listaLocalStorage); // transforma uma Sting Json em um Objeto Javascript

    listaElementos.splice(index, 1); // Excluir o deleta o item com index referenciado 

    // Apos remover, a lista atualiza novamente o localStorage
    localStorage.setItem('lista-atividades', JSON.stringify(listaElementos)); // transforma um Objeto Javascript em uma Sting Json
    exibirTarefas(); // chama a função para exibir as tarefas registradas na lista
}