// Constantes globais
const apiBaseUrl = 'https://todo-api.ctd.academy/v1'
const jwt = localStorage.getItem('jwt')
const openTasksListRef = document.querySelector('#openTasksList')
const deleteTaskButtonRef = document.getElementById('not-done2')
const logOutButtonRef = document.querySelector('#logOutButton')
const closeTasksListRef = document.querySelector('#closeTasksList')
const submitButtonNewTaskRef = document.querySelector('#submitButtonNewTask')
const newTaskInputRef = document.querySelector('#novaTarefa')
const newTaskButtontRef = document.querySelector('#submitButtonNewTask')

// Objeto que armazenara os Headers utilizados nas Requests
const requestHeadersAuth = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": jwt
}

// Objeto que armazenara todas as Tarefas, divididas em dois arrays
var userTasks = {
    openeds: [], // Array utilizado para armazenar as nossas tarefas em aberto
    closeds: [] // Array utilizado para armazenar as nossas tarefas concluidas
}

//Função abre janela na foto do usuário
var btnOpenRef = document.getElementById('avatar')
let myWindow;

function openWin() {
    myWindow = window.open("../pages/user.html", "", "width=500,height=500")
}

// Função que captura e mostra a qt de itens das tarefas incompletas.
function taskCounterOpeneds() {
    var totalTaskOpen = 0;
    const totalTaskOpenRef = document.getElementById('numTarefas')
    totalTaskOpenRef.innerHTML = `#${userTasks.openeds.length}`
}

// Funcao que realiza o Logout
function logOut(forceLogout) {
    if (forceLogout) {
        // Limpeza no localStorage
        localStorage.clear()
        // Redirecionamento para o Login
        window.location.href = '../index.html'
    } else {
        Swal.fire({
            title: 'Deseja sair do App?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Sair',
            confirmButtonColor: '#ff0000',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // Limpeza no localStorage
                localStorage.clear()
                // Redirecionamento para o Login
                window.location.href = '../index.html'
            }
        })
    }
}

// Função que deleta tarefas
function deleteTask(task) {
    let taskCompleted = task
    // console.log(taskCompleted)
    taskCompleted.completed = true
    console.log(taskCompleted)
    const requestSettings = {
        method: 'DELETE',
        body: JSON.stringify(taskCompleted),
        headers: requestHeadersAuth
    }
    fetch(`${apiBaseUrl}/tasks/${task.id}`, requestSettings).then(
        response => {
            if (response.ok) {
                getTasks()
            }
        }
    )
}

// Função pega o nome e sobrenome do usuario e mostra na tela de tarefas.
function getUser() {
    // Objeto de Configuracao da Request
    const requestSettings = {
        method: 'GET',
        headers: requestHeadersAuth
    }
    // Request para obter as tarefas
    fetch(`${apiBaseUrl}/users/getMe`, requestSettings)
        .then(
            response => {
                // Verificacao se deu tudo certo com a Request
                if (response.ok) {
                    response.json()
                        .then(
                            user => {
                                localStorage.setItem('user', JSON.stringify(user))
                                const userNameRef = document.getElementById('userName')
                                userNameRef.innerText = `Olá, ${user.firstName} ${user.lastName}`
                            }
                        )
                }
                else {
                    // Verificacao se o Status da Request é 401(Nao autorizado)
                    if (response.status === 401) {
                        // Caso seja, a aplicacao ira realizar o Logout do usuario
                        logOut()
                    }
                }
            }
        )
}

// Função modifica a tarefa para CONCLUIDA.
function completeTask(task) {
    let taskCompleted = task
    // console.log(taskCompleted)
    taskCompleted.completed = true
    // console.log(taskCompleted)
    const requestSettings = {
        method: 'PUT',
        body: JSON.stringify(taskCompleted),
        headers: requestHeadersAuth
    }
    fetch(`${apiBaseUrl}/tasks/${task.id}`, requestSettings).then(
        response => {
            if (response.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Solicitação efetuada com sucesso!',
                    showConfirmButton: false,
                    timer: 1000
                })
                getTasks()
            }
        }
    )
}

//Função que mapeia as tarefas incompletas e o icone de excluir
function addEventListenersToTasksOpeneds() {
    const openTaskListItensRef = Array.from(openTasksListRef.children)
    openTaskListItensRef.map(
        (item, index) => {
            const actionItemTaskRef = item.children[0]
            const taskFinded = userTasks.openeds[index]
            const btnTrashRef = item.children[1].children[2]
            btnTrashRef.addEventListener('click', () => confirmDelete())
            actionItemTaskRef.addEventListener('click', () => completeTask(taskFinded))
            function confirmDelete() {
                Swal.fire({
                    title: 'Deseja excluir a tarefa?',
                    text: "Esta ação não pode ser desfeita!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#ff0000',
                    cancelButtonColor: '#a5a5a5',
                    confirmButtonText: 'Sim! Excluir.'
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteTask(taskFinded)
                        Swal.fire(
                            'Excluido!',
                            'Solicitação executada com sucesso!',
                            'success'
                        )
                    }
                })
            }
        }
    )
}

// Funcao que ira inserir as tarefas incompletas no HTML
function insertOpenedsTasksHtml() {
    // Remocao de todos os elementos dentro da Lista de Tarefas em Aberto
    openTasksListRef.innerHTML = ''
    // For nas tarefas para inseri-las no HTML
    if (userTasks.openeds.length === 0) {
        openTasksListRef.innerHTML = 'Sem tarefas para exibir!'
    } else {
        for (let task of userTasks.openeds) {
            // Criacao de uma data baseada na string retornada da API
            const taskDate = new Date(task.createdAt)
            // Formatacao da data criada para o padrao brasileiro
            const taskDateFormated = new Intl.DateTimeFormat('pt-BR').format(taskDate)
            openTasksListRef.innerHTML += `
                <li class="tarefa">
                    <div class="not-done"></div>
                    <div class="descricao" autocomplete="off">
                        <p class="nome">${task.description}</p> 
                        <p class="timestamp">Criada em: ${taskDateFormated}</p>
                        <button type="submit" id="btnTrashTask" class="button-trash">
                        <img src="../assets/trash.PNG" width="15px" alt="Adicionar uma nova tarefa" id="imgTrash">
                      </button>
                    </div>
                </li>
            `
        }
        addEventListenersToTasksOpeneds()
    }
}

// Função modifica a tarefa para ABERTA
function notCompleteTask(task) {
    let taskNotCompleted = task
    // console.log(taskCompleted)
    taskNotCompleted.completed = false
    // console.log(taskCompleted)
    const requestSettings = {
        method: 'PUT',
        body: JSON.stringify(taskNotCompleted),
        headers: requestHeadersAuth
    }
    fetch(`${apiBaseUrl}/tasks/${task.id}`, requestSettings).then(
        response => {
            if (response.ok) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Solicitação efetuada com sucesso!',
                    showConfirmButton: false,
                    timer: 1000
                })
                getTasks()
            }
        }
    )
}

// Funcao que ira inserir as tarefas concluidas no HTML
function insertClosedsTasksHtml() {
    // Remocao de todos os elementos dentro da Lista de Tarefas em Aberto
    closeTasksListRef.innerHTML = ''
    // For nas tarefas para inseri-las no HTML
    if (userTasks.closeds.length === 0) {
        closeTasksListRef.innerHTML = 'Sem tarefas para exibir!'
    } else {
        for (let task of userTasks.closeds) {
            // Criacao de uma data baseada na string retornada da API
            const taskDate = new Date(task.createdAt)
            // Formatacao da data criada para o padrao brasileiro
            const taskDateFormated = new Intl.DateTimeFormat('pt-BR').format(taskDate)
            closeTasksListRef.innerHTML += `
                <li class="tarefa2">
                    <div class="not-done2"></div>
                    <div class="descricao2" autocomplete="off">
                        <p class="nome">${task.description}</p> 
                        <p class="timestamp2">Criada em: ${taskDateFormated}</p>
                        <button type="submit" id="btnTrashTask" class="button-trash">
                        <img src="../assets/trash.PNG" width="15px" alt="Adicionar uma nova tarefa" id="imgTrash">
                      </button>
                    </div>
                </li>
            `
        }
    }
    addEventListenersToTasksCloseds()
}

// Função que mapeia as Tarefas Concluidas e o icone de excuir
function addEventListenersToTasksCloseds() {
    const closeTaskListItensRef = Array.from(closeTasksListRef.children)
    closeTaskListItensRef.map(
        (item, index) => {
            const closeActionItemTaskRef = item.children[0]
            const taskFinded2 = userTasks.closeds[index]
            const btnTrashRef = item.children[1].children[2]
            btnTrashRef.addEventListener('click', () => confirmDelete())
            console.log(btnTrashRef.addEventListener)
            closeActionItemTaskRef.addEventListener('click', () => notCompleteTask(taskFinded2))
            function confirmDelete() {
                Swal.fire({
                    title: 'Deseja excluir a tarefa?',
                    text: "Esta ação não pode ser desfeita!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#ff0000',
                    cancelButtonColor: '#a5a5a5',
                    confirmButtonText: 'Sim! Excluir.'
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteTask(taskFinded2)
                        Swal.fire(
                            'Excluido!',
                            'Solicitação executada com sucesso!',
                            'success'
                        )
                    }
                })
            }
        }
    )
}

// Função que verifica tarefas
function checkTasks(tasks) {
    for (let task of tasks) {
        if (task.completed) {
            userTasks.closeds.push(task)
        } else {
            userTasks.openeds.push(task)
            // Chama a função que mostra o contador de tarefas.
            taskCounterOpeneds()
        }
    }
    // Caso tenha dado tudo certo com a Request, nos chamamos a funcao para inserir as Tasks no HTML
    setTimeout(() => insertOpenedsTasksHtml(), 100)
    setTimeout(() => insertClosedsTasksHtml(), 100)
}

// Função que limpa o conteudo da array antes de receber novos dados, evitando duplicidade.
function clearTasks() {
    userTasks.closeds = []
    userTasks.openeds = []
}

// Funcao que ira obter as Tarefas
function getTasks() {
    // Objeto de Configuracao da Request
    const requestSettings = {
        method: 'GET',
        headers: requestHeadersAuth
    }
    // Chama a função para limpar dados antes de receber novos dados.
    clearTasks()
    // Request para obter as tarefas
    fetch(`${apiBaseUrl}/tasks`, requestSettings).then(
        response => {
            // Verificacao se deu tudo certo com a Request
            if (response.ok) {
                response.json().then
                    (
                        tasks => {
                            checkTasks(tasks)
                            taskCounterOpeneds()
                        }
                    )
            } else {
                // Verificacao se o Status da Request é 401(Nao autorizado)
                if (response.status === 401) {
                    // Caso seja, a aplicacao ira realizar o Logout do usuario
                    logOut()
                }
            }
        }
    )
}

// Funcao que ira criar uma nova Task
async function createTask(event) {
    // Utilizacao do preventDefault() para a pagina nao recarregar apos o Submit
    event.preventDefault()

    const novaTarefaRef = document.getElementById('novaTarefa')
    // Objeto contendo a Task que sera Cadastrada
    const task = {
        // Descricao da Task(Essa descericao deve conter o valor do Input que o usuario digitou, ela esta fixa com essa String apenas para entendermos como a requisicao funciona)
        description: `${novaTarefaRef.value}`,
        // Completed representa se a Task sera criada como Aberta ou Finalizada
        // False ira significar que esta em abera
        // True ira significar que esta finalizada
        // Voce pode manter o False por padrao, nao é necessario atualizar essa propriedade
        completed: false
    }
    // Objeto de configuracao da Request
    const requestSettings = {
        method: 'POST',
        body: JSON.stringify(task),
        headers: requestHeadersAuth
    }
    // Request para cadastrar uma nova tarefa
    const response = await fetch(`${apiBaseUrl}/tasks`, requestSettings)
    // Verificacao se deu tudo certo com a Request
    if (response.ok) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Tarefa criada com sucesso!',
            showConfirmButton: false,
            timer: 1000
        })
        // Caso tenha dado tudo certo nos executamos a funcao getTasks() novamente
        // A ideia de executarmos novamente a getTasks() esta em "remontarmos as listas pata o usuario"
        // Toda vez que fazemos uma requisicao para criarmos uma nova tarefa, ela no final das contas é criada no Banco de Dados, porem, 
        //a listagem que esta sendo mostrada para o usuario nao contem essa nova tarefa criada. Por isso que precisamos obter as tarefas novamente
        getTasks()
        newTaskButtontRef.disabled = true
    }
    // Limpa o campo do formulario após click do botão.
    novaTarefaRef.value = ""
}

// Funcao que ira checar se o Usuario esta de fato Autenticado na Aplicacao
function checkAuthUser() {
    // Verifica se o JWT obtido do localStorage é nulo
    if (jwt === null) {
        // Caso seja a aplicacao ja realiza o Logout do Usuario
        logOut(true)
    } else {
        // Caso nao seja Nulo, a aplicacao ira obter as Tasks e realizar outra verificacao quando a Request for concluida
        getTasks()
    }
}

// Adicao de um EventListener para quando o usuario clickar no Button de Submit para cadastrar uma nova tarefa
submitButtonNewTaskRef.addEventListener('click', event => createTask(event))

// Execucao da funcao para checar a autenticidade do usuario na aplicacao
checkAuthUser()

//Condicional que verifica se existe a informação do usuário no LocalStorage, se houver não houver faz uma fetch requisitando o getMe pra API.
if (localStorage.getItem('user') === null) {
    getUser()
}
else {
    const user = JSON.parse(localStorage.getItem('user'))
    const userNameRef = document.getElementById('userName')
    userNameRef.innerText = `${user.firstName} ${user.lastName}`
}

// Função que valida o campo ** + ** e aciona CSS 
function validateAdicionaTarefa(event) {
    const target = event.target
    const value = target.value
    const isValid = target.checkValidity()
    if (isValid) {
        newTaskButtontRef.disabled = false
        submitButtonNewTaskRef.classList.remove('error')
        submitButtonNewTaskRef.classList.add('ok', 'valid')
    } else {
        newTaskButtontRef.disabled = true
        submitButtonNewTaskRef.classList.add('error')
        submitButtonNewTaskRef.classList.remove('ok', 'valid')
    }
}

//Eventos
newTaskInputRef.addEventListener('keyup', (event) => validateAdicionaTarefa(event))
btnOpenRef.addEventListener('click', () => openWin())
logOutButtonRef.addEventListener('click', () => logOut())