const addBtn = document.querySelector(".inputField button");
const inputField = document.querySelector(".inputField input");
const todoList = document.querySelector(".list");


let listArray = [];


// Pega a informação do localStorage e retorna ela
// Caso o localStorage esteja vazio ou não exista (null), retorna um Array vazio
// JSON.parse -> Converte uma String para JSON
const getlocalStorage = () => JSON.parse(localStorage.getItem('TODO List')) ?? [];


// Envia a informação modificada ou atualizada para o localStorage
// JSON.stringify -> Converte um JSON para String
const setLocalStorage = (listArray) => localStorage.setItem('TODO List', JSON.stringify(listArray));


// Função para criar um elemento contendo uma tarefa e adiciona-la no HTML
const createTask = (task, marked, id) => {
    const item = document.createElement('label');                               // Cria uma labem para esste elemento
    item.classList.add('todoList_item');                                        // Nome da label = todoList_item

    // Define via innerHTML, as propriedades do elemento que será inserido na lista: 
    // nome (task), checkbox para risca-lá e o botão para remove-la
    item.innerHTML = `
        <input type="checkbox" ${marked} data-id=${id}>
        <div>${task}</div>
        <input type="button" value=&times; data-id=${id}> `;

    document.querySelector('.list').appendChild(item);                          // Busca o elemento com a classe .list no HTML e adiciona dentro dela o elemento que foi criado
}


// Função para Limpar as tarefas da lista, evitando um efeito de repetições
const clearTasks = () => {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);                               // Enquanto existir o primeiro filho da lista, remove o ultimo filho
    }
}


// Função para atualizar e exibir no HTML as tarefas inseridos na lista
const refreshList = () => {
    clearTasks();
    listArray = getlocalStorage();
    listArray.forEach((item, id) => createTask(item.task, item.marked, id));    // Para cada item no meu Array, cria uma nova tarefa
}


//  Função para adicionar uma nova tarefa na lista
const addTask = () => {
    const newTask = inputField.value;                                           // Armazena em uma constante a entrada que foi digitada no campo de texto

    listArray = getlocalStorage();
    listArray.push({ 'task': newTask, 'marked': '' });                          // Adiciona no final do Array a nova tarefa inserida que a constante newTask armazenou
    setLocalStorage(listArray);
    refreshList();                                                              // Atualiza novamente os dados inseridos na lista para ser exibido no HTML
    inputField.value = '';                                                      // Limpa o campo de texto ao inserir a nova tarefa
}


// Função para identificar o tipo de elemento pressionado na lista,
// e realizar as operações de remover ou marcar como feito pelo id da tarefa
const clickTask = (event) => {
    const element = event.target;
    if (element.type === 'button') {                                            // Se o elemento pressioando for um botão, remove a tarefa da lista
        const id = element.dataset.id;

        let confirma = confirm("Deseja excluir esta tarefa da lista?");         // Variável para confirmar se o usuário deseja excluir a tarefa da lista

        if (confirma == true) {
            removeTask(id);
        }
    }
    else if (element.type === 'checkbox') {                                     // Se o elemento pressionado for uma checkbox, marca a tarefa como feita
        const id = element.dataset.id;
        markAsChecked(id);
    }
}


// Função para remover um item da lista
const removeTask = (id) => {
    listArray = getlocalStorage();
    listArray.splice(id, 1);                                                    // Remove do Array, a partir da posição do índice, apenas 1 item (ele próprio)
    setLocalStorage(listArray);
    refreshList();
}


// Função para marcar ou desmarcar uma tarefa como feita
const markAsChecked = (id) => {
    listArray = getlocalStorage();

    if (listArray[id].marked === '') {                                          // Se o status da tarefa (checkbox) estiver vazio
        listArray[id].marked = 'checked';                                       // Define o status da tarefa como feito (checked) ao clicar na checkbox
    }
    else {
        listArray[id].marked = '';                                              // Se não, define como vazio novamente
    }

    setLocalStorage(listArray);
    refreshList();
}

// Executa os comandos abaixo assim que a tela é carregada
window.onload = function (e) {
    addBtn.addEventListener('click', addTask);                                  // Evento de clique para adicionar uma nova tarefa via o botão +
    todoList.addEventListener('click', clickTask);                              // Evento de clique para manipular o elemento da tarefa na lista
    refreshList();
}