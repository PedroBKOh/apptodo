// // ----- Código inicial Irvin ----- #1 ----- INICIO
//     const apiBaseUrl = 'https://todo-api.ctd.academy/v1'
//     const security = localStorage.getItem('jwt')

//     function logOut() 
//     {
//         localStorage.clear()
//         window.location.href = 'index.html'
//     }

//     function getTasks() 
//     {
//         const requestHeadersAuth = 
//         {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//             "Authorization": security
//         }
//         const requestSettings = 
//         {
//             method: 'GET',
//             headers: requestHeadersAuth
//         }
//         fetch(`${apiBaseUrl}/tasks`, requestSettings).then
//         (
//             response => 
//             {
//                 if(response.ok) 
//                 {
//                     response.json().then
//                     (
//                         tasks => 
//                         {
//                             console.log(tasks)
//                         }
//                     )
//                 } 
//                 else 
//                 {
//                     if(response.status === 401) 
//                     {
//                         logOut()
//                     }
//                 }
//             }
//         )
//     }

//     function checkAuthUser() 
//     {
//         if(security === null) 
//         {
//             logOut()
//         } 
//         else 
//         {
//             getTasks()
//         }
//     }
//     checkAuthUser()

// // ----- #1 FIM

// // ----- Código atualizado 26/06/23 Irvin ----- #2 ----- INICIO

//     // Variavel responsavel por armazenar a URL Base para nossa API
//     const apiBaseUrl = 'https://todo-api.ctd.academy/v1'

//     // Token obtido no Login que foi salvo no localStorage
//     const security = localStorage.getItem('jwt')

//     // Referencia do Botao de Submit para cadastrar uma nova Tarefa
//     const submitButtonNewTaskRef = document.querySelector('#submitButtonNewTask')

//     // Referencia da Lista de Tarefas em Aberta
//     const openTasksListRef = document.querySelector('#openTasksList')

//     // Objeto que armazenara os Headers utilizados nas Requests
//     const requestHeadersAuth = {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//         "Authorization": security
//     }

//     // Objeto que armazenara todas as Tarefas, divididas em dois arrays
//     var tasks = {
//         openeds : [], // Array utilizado para armazenar as nossas tarefas em aberto //completed: false
//         closeds: [] // Array utilizado para armazenar as nossas tarefas concluidas //completed: true
//     }

//     // Funcao que realiza o Logout
//     function logOut() {

//         // Limpeza no localStorage
//         localStorage.clear()
//         // Redirecionamento para o Login
//         window.location.href = '../index.html'

//     }

//     // Funcao que ira inserir as nossas Tasks no HTML
//     function insertTasksHtml(tasks) {

//         // Remocao de todos os elementos dentro da Lista de Tarefas em Aberto
//         openTasksListRef.innerHTML = ''

//         // For nas tarefas para inseri-las no HTML
//         for(let task of tasks) {

//             // Criacao de uma data baseada na string retornada da API
//             const taskDate = new Date(task.createdAt)
//             // Formatacao da data criada para o padrao brasileiro
//             const taskDateFormated = new Intl.DateTimeFormat('pt-BR').format(taskDate)

//             openTasksListRef.innerHTML += `
//                 <li class="tarefa">
//                     <div class="not-done"></div>
//                     <div class="descricao">
//                         <p class="nome">${task.description}</p>
//                         <p class="id">Id: ${task.id}</p>
//                         <p class="timestamp">Criada em: ${taskDateFormated}</p>
//                     </div>
//                 </li>
//             `

//         }

//     }

//     // Funcao que ira obter as Tarefas
//     function getTasks() {

//         // Ibjeto de Configuracao da Request
//         const requestSettings = {
//             method: 'GET',
//             headers: requestHeadersAuth
//         }

//         // Request para obter as tarefas
//         fetch(`${apiBaseUrl}/tasks`, requestSettings).then
//         (
//             response => 
//             {
//                 // Verificacao se deu tudo certo com a Request
//                 if(response.ok) 
//                 {
//                     response.json().then
//                     (
//                         tasks => 
//                         {
                            
//                             setTimeout(() => insertTasksHtml(tasks), 1000)
//                         }
                        
//                     )
//                 } 

//                 else 
//                 {
//                     // Verificacao se o Status da Request é 401(Nao autorizado)
//                     if(response.status === 401) 
//                     {
//                         // Caso seja, a aplicacao ira realizar o Logout do usuario
//                         logOut()
//                     }
//                 }
//             }
//         )

//     }

//     // Funcao que ira criar uma nova Task
//     function createTask(event) {

//         // Utilizacao do preventDefault() para a pagina nao recarregar apos o Submit
//         event.preventDefault()

//         // Objeto contendo a Task que sera Cadastrada
//         const task = {
//             // Descricao da Task(Essa descericao deve conter o valor do Input que o usuario digitou, ela esta fixa com essa String apenas para entendermos como a requisicao funciona)
//             description: '',
//             // Completed representa se a Task sera criada como Aberta ou Finalizada
//             // False ira significar que esta em abera
//             // True ira significar que esta finalizada
//             // Voce pode manter o False por padrao, nao é necessario atualizar essa propriedade
//             completed: false
//         }

//         // Objeto de configuracao da Request
//         const requestSettings = {
//             method: 'POST',
//             body: JSON.stringify(task),
//             headers: requestHeadersAuth
//         }

//         // Request para cadastrar uma nova tarefa
//         fetch(`${apiBaseUrl}/tasks`, requestSettings).then(
//             response => {
//                 // Verificacao se deu tudo certo com a Request
//                 if(response.ok) {
//                     // Caso tenha dado tudo certo nos executamos a funcao getTasks() novamente
//                     // A ideia de executarmos novamente a getTasks() esta em "remontarmos as listas pata o usuario"
//                     // Toda vez que fazemos uma requisicao para criarmos uma nova tarefa, ela no final das contas é criada no Banco de Dados, porem, a listagem que esta sendo mostrada para o usuario nao contem essa nova tarefa criada. Por isso que precisamos obter as tarefas novamente
//                     getTasks()
//                 }
//             }
//         )

//     }

//     // Funcao que ira checar se o Usuario esta de fato Autenticado na Aplicacao
//     function checkAuthUser() {

//         // Verifica se o JWT obtido do localStorage é nulo
//         if(security === null) {

//             // Caso seja a aplicacao ja realiza o Logout do Usuario
//             logOut()
        
//         } else {
        
//             // Caso nao seja Nulo, a aplicacao ira obter as Tasks e realizar outra verificacao quando a Request for concluida
//             getTasks()
        
//         }

//     }

//     // Adicao de um EventListener para quando o usuario clickar no Button de Submit para cadastrar uma nova tarefa
//     submitButtonNewTaskRef.addEventListener('click', event => createTask(event))

//     // Execucao da funcao para checar a autenticidade do usuario na aplicacao
//     checkAuthUser()

// // ----- #2 FIM



// // ----- Código atualizado 27/06/23 Irvin ----- #3 ----- INICIO
// // Variavel responsavel por armazenar a URL Base para nossa API
// const apiBaseUrl = 'https://todo-api.ctd.academy/v1'

// // Token obtido no Login que foi salvo no localStorage
// const jwt = localStorage.getItem('jwt')

// // Referencia do Botao de Submit para cadastrar uma nova Tarefa
// const submitButtonNewTaskRef = document.querySelector('#submitButtonNewTask')

// // Referencia da Lista de Tarefas em Aberta
// const openTasksListRef = document.querySelector('#openTasksList')

// // Objeto que armazenara os Headers utilizados nas Requests
// const requestHeadersAuth = {
//     "Accept": "application/json",
//     "Content-Type": "application/json",
//     "Authorization": jwt
// }

// // Objeto que armazenara todas as Tarefas, divididas em dois arrays
// var userTasks = {
//     openeds : [], // Array utilizado para armazenar as nossas tarefas em aberto
//     closeds: [] // Array utilizado para armazenar as nossas tarefas concluidas
// }

// // Funcao que realiza o Logout
// function logOut() {

//     // Limpeza no localStorage
//     localStorage.clear()
//     // Redirecionamento para o Login
//     window.location.href = 'index.html'

// }

// function deleteTask(task) {


// }


// //----------------------------------------------------------------

// function getUserName() {

//     // Objeto de Configuracao da Request
//     const requestSettings = {
//         method: 'GET',
//         headers: requestHeadersAuth
//     }

//     // Request para obter as tarefas
//     fetch(`${apiBaseUrl}/users/getMe`, requestSettings).then
//     (
//         response => 
//         {
//             // Verificacao se deu tudo certo com a Request
//             if(response.ok) 
//             {
//                 response.json().then(
//                     getMe => {
//                 console.log(getMe)
//                     })

//                 const userNameRef = document.getElementById('userName')
//                 userNameRef.innerText = "Pedro Oh"
//             } 
//             else 
//             {
//                 // Verificacao se o Status da Request é 401(Nao autorizado)
//                 if(response.status === 401) 
//                 {
//                     // Caso seja, a aplicacao ira realizar o Logout do usuario
//                 }
//             }
//         }
//     )

// }

// //------------------------


// //--------------------------------------------------------------------------

// function completeTask(task) {

//     let taskCompleted = task
//     // console.log(taskCompleted)
//     taskCompleted.completed = true
//     // console.log(taskCompleted)

//     const requestSettings = {
//         method: 'DELETE',
//         body: JSON.stringify(taskCompleted),
//         headers: requestHeadersAuth
//     }

//     fetch(`${apiBaseUrl}/tasks/${task.id}`, requestSettings).then(
//         response => {
//             if(response.ok) {
//                 getTasks()

//                 location.reload() //-------------------------------------------pedro-------------------------------//
//                 getUserName()
//             }
//         }
//     )

// }

// function addEventListenersToTasks() {

//     const openTaskListItensRef = Array.from(openTasksListRef.children)

//     openTaskListItensRef.map(
//         (item, index) => {
//             const actionItemTaskRef = item.children[0]
//             const taskFinded = userTasks.openeds[index]
//             actionItemTaskRef.addEventListener('click', () => completeTask(taskFinded))
//         }
//     )
// }

// // Funcao que ira inserir as nossas Tasks no HTML
// function insertTasksHtml() {

//     // Remocao de todos os elementos dentro da Lista de Tarefas em Aberto
//     openTasksListRef.innerHTML = ''

//     // For nas tarefas para inseri-las no HTML
//     for(let task of userTasks.openeds) {

//         // Criacao de uma data baseada na string retornada da API
//         const taskDate = new Date(task.createdAt)
//         // Formatacao da data criada para o padrao brasileiro
//         const taskDateFormated = new Intl.DateTimeFormat('pt-BR').format(taskDate)

//         openTasksListRef.innerHTML += `
//             <li class="tarefa">
//                 <div class="not-done"></div>
//                 <div class="descricao">
//                     <p class="nome">${task.description}</p> 
//                     <p class="id">#${task.id}</p> <!-- ---------------------------- PEDRO ----------------------------------------->
//                     <p class="timestamp">Criada em: ${taskDateFormated}</p>
//                 </div>
//             </li>
//         `

//     }

//     addEventListenersToTasks()

// }

// function checkTasks(tasks) {

//     for(let task of tasks) {

//         if(task.completed) {

//             userTasks.closeds.push(task)

//         } else {

//             userTasks.openeds.push(task)

//         }

//     }

//     // Caso tenha dado tudo certo com a Request, nos chamamos a funcao para inserir as Tasks no HTML
//     setTimeout(() => insertTasksHtml(), 800)
//     // insertTasksHtml()

// }

// // Funcao que ira obter as Tarefas
// function getTasks() {

//     // Objeto de Configuracao da Request
//     const requestSettings = {
//         method: 'GET',
//         headers: requestHeadersAuth
//     }

//     // Request para obter as tarefas
//     fetch(`${apiBaseUrl}/tasks`, requestSettings).then(
//         response => {
//             // Verificacao se deu tudo certo com a Request
//             if(response.ok) {
//                 response.json().then(
//                     tasks => {
//                         checkTasks(tasks)
//                     }
//                 )
//             } else {
//                 // Verificacao se o Status da Request é 401(Nao autorizado)
//                 if(response.status === 401) {
//                     // Caso seja, a aplicacao ira realizar o Logout do usuario
//                     logOut()
//                 }
//             }
//         }
//     )

// }

// // Funcao que ira criar uma nova Task
// async function createTask(event) {

//     // Utilizacao do preventDefault() para a pagina nao recarregar apos o Submit
//     event.preventDefault()

//     const novaTarefaRef = document.getElementById('novaTarefa')
//     console.log(novaTarefaRef)

//     // Objeto contendo a Task que sera Cadastrada
//     const task = {
//         // Descricao da Task(Essa descericao deve conter o valor do Input que o usuario digitou, ela esta fixa com essa String apenas para entendermos como a requisicao funciona)
//         description: `${novaTarefaRef.value}`,
//         // Completed representa se a Task sera criada como Aberta ou Finalizada
//         // False ira significar que esta em abera
//         // True ira significar que esta finalizada
//         // Voce pode manter o False por padrao, nao é necessario atualizar essa propriedade
//         completed: false
//     }

//     // Objeto de configuracao da Request
//     const requestSettings = {
//         method: 'POST',
//         body: JSON.stringify(task),
//         headers: requestHeadersAuth
//     }

//     // Request para cadastrar uma nova tarefa
//     const response = await fetch(`${apiBaseUrl}/tasks`, requestSettings)

//     // Verificacao se deu tudo certo com a Request
//     if(response.ok) {
//         // Caso tenha dado tudo certo nos executamos a funcao getTasks() novamente
//         // A ideia de executarmos novamente a getTasks() esta em "remontarmos as listas pata o usuario"
//         // Toda vez que fazemos uma requisicao para criarmos uma nova tarefa, ela no final das contas é criada no Banco de Dados, porem, 
//         //a listagem que esta sendo mostrada para o usuario nao contem essa nova tarefa criada. Por isso que precisamos obter as tarefas novamente
//         // getTasks()
//         location.reload() //----------------------------------------------pedro--------------------------------
//     }
    
// }

// // Funcao que ira checar se o Usuario esta de fato Autenticado na Aplicacao
// function checkAuthUser() {

//     // Verifica se o JWT obtido do localStorage é nulo
//     if(jwt === null) {

//         // Caso seja a aplicacao ja realiza o Logout do Usuario
//         logOut()
    
//     } else {
    
//         // Caso nao seja Nulo, a aplicacao ira obter as Tasks e realizar outra verificacao quando a Request for concluida
//         getTasks() 
//     }

// }

// // Adicao de um EventListener para quando o usuario clickar no Button de Submit para cadastrar uma nova tarefa
// submitButtonNewTaskRef.addEventListener('click', event => createTask(event))

// // Execucao da funcao para checar a autenticidade do usuario na aplicacao
// checkAuthUser()
// getUserName()



// const newTaskInputRef = document.querySelector('#novaTarefa')
// const newTaskButtontRef = document.querySelector('#submitButtonNewTask')

// // Função que valida o campo ** + ** e aciona CSS 
// function validateAdicionaTarefa(event) {
//     const target = event.target
//     const value = target.value
//     const isValid = target.checkValidity()
        
//     console.log(value)

//     if(isValid) {
        
//         newTaskButtontRef.disabled = false

//         submitButtonNewTaskRef.classList.remove('error')
//         submitButtonNewTaskRef.classList.add('ok', 'valid')
//         console.log('Valor Válido!')
//     } else {
//         newTaskButtontRef.disabled = true

//         submitButtonNewTaskRef.classList.add('error')
//         submitButtonNewTaskRef.classList.remove('ok', 'valid')
//         console.log('Valor Inválido!')
//     }
// }
// newTaskInputRef.addEventListener('keyup', (event) => validateAdicionaTarefa(event))

// // Função do botão Log Out
// // const logOutButtonRef = document.querySelector('#logOutButton')
// // logOutButtonRef.addEventListener('click', () => getUserName())

// // // ----- #3 FIM











//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//


// ----- Código atualizado 28/06/23 modificado Pedro  ----- #4 ----- INICIO

// Importando Função
    // Obtem a função de logOut.
    import {logOut} from './logOut.js'  
    // Função que mostra o contador
    import {taskCounterOpeneds} from './utils.js'  
    // import {taskCounterCloseds} from './utils.js'  

//Exportando Função
    // Para o contator de tarefas em util.js
    export {userTasks}; 

// Variavel responsavel por armazenar a URL Base para nossa API
    const apiBaseUrl = 'https://todo-api.ctd.academy/v1'

// Token obtido no Login que foi salvo no localStorage
    const jwt = localStorage.getItem('jwt')

// Referencia do Botao de Submit para cadastrar uma nova Tarefa
    const submitButtonNewTaskRef = document.querySelector('#submitButtonNewTask')

// Objeto que armazenara os Headers utilizados nas Requests
    const requestHeadersAuth = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": jwt
    }

// Objeto que armazenara todas as Tarefas, divididas em dois arrays
    var userTasks = {
        openeds : [], // Array utilizado para armazenar as nossas tarefas em aberto
        closeds: [] // Array utilizado para armazenar as nossas tarefas concluidas
    }

// // Função que deleta as tarefas ---------------------------------- Provisório!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     const deleteTaskButtonRef = document.getElementById('not-done2')

//     function deleteTask(task) {
//         let taskCompleted = task
//         // console.log(taskCompleted)
//         taskCompleted.completed = true
//         // console.log(taskCompleted)
//         const requestSettings = {
//             method: 'DELETE',
//             body: JSON.stringify(taskCompleted),
//             headers: requestHeadersAuth
//         }
//         fetch(`${apiBaseUrl}/tasks/${task.id}`, requestSettings).then(
//             response => {
//                 if(response.ok) {
//                     getTasks()
//                 }
//             }
//         )
//     }

// // ----------------
//     // deleteTaskButtonRef.addEventListener('click', () => deleteTask(task))    

// Função pega o nome e sobrenome do usuario e mostra na tela de tarefas.
    function getUser() {
        // Objeto de Configuracao da Request
        const requestSettings = {
            method: 'GET',
            headers: requestHeadersAuth
        }
        // Request para obter as tarefas
        fetch(`${apiBaseUrl}/users/getMe`, requestSettings).then
        (
            response => 
            {
                // Verificacao se deu tudo certo com a Request
                if(response.ok) 
                {
                    response.json().then
                    (
                        user => 
                        {
                            localStorage.setItem('user', JSON.stringify(user))
                            const userNameRef = document.getElementById('userName')
                            userNameRef.innerText = `Olá, ${user.firstName} ${user.lastName}` 
                        }
                    )
                } 
                else 
                {
                    // Verificacao se o Status da Request é 401(Nao autorizado)
                    if(response.status === 401) 
                    {
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
                if(response.ok) {
                    getTasks()
                }
            }
        )
    }

// Referencia da Lista de Tarefas em Aberta
    const openTasksListRef = document.querySelector('#openTasksList')

    function addEventListenersToTasksOpeneds() {
        const openTaskListItensRef = Array.from(openTasksListRef.children)
        openTaskListItensRef.map(
            (item, index) => {
                const actionItemTaskRef = item.children[0]
                const taskFinded = userTasks.openeds[index]
                actionItemTaskRef.addEventListener('click', () => completeTask(taskFinded))
            }
        )
    }

// Funcao que ira inserir as nossas Tasks no HTML
    function insertOpenedsTasksHtml() {
        // Remocao de todos os elementos dentro da Lista de Tarefas em Aberto
        openTasksListRef.innerHTML = ''
        // For nas tarefas para inseri-las no HTML
        for(let task of userTasks.openeds) {
            // Criacao de uma data baseada na string retornada da API
            const taskDate = new Date(task.createdAt)
            // Formatacao da data criada para o padrao brasileiro
            const taskDateFormated = new Intl.DateTimeFormat('pt-BR').format(taskDate)
            openTasksListRef.innerHTML += `
                <li class="tarefa">
                    <div class="not-done"></div>
                    <div class="descricao" autocomplete="off">
                        <p class="nome">${task.description}</p> 
                        <!--<p class="id">#${task.id}</p> <!--------------------------Mudar para um id proprio de num de tarefas (ref)----->
                        <p class="timestamp">Criada em: ${taskDateFormated}</p>
                        <div class="check-box">
                            <input type="radio" id="css" class="radio">
                            <label for="css" class="label">Excluir</label>
                        </div>
                    </div>
                </li>
            `
        }
        addEventListenersToTasksOpeneds()
    }
    
// COPIA DO DE BAIXO FUNCIONANDO O DELETE DO INPUT DO LADO ESQUERDO
// // Função que deleta as tarefas ---------------------------------- Provisório!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     // const deleteTaskButtonRef = document.getElementById('not-done2')

//     function deleteTask(task) {
//         let taskCompleted = task
//         // console.log(taskCompleted)
//         taskCompleted.completed = true
//         // console.log(taskCompleted)
//         const requestSettings = {
//             method: 'DELETE',
//             body: JSON.stringify(taskCompleted),
//             headers: requestHeadersAuth
//         }
//         fetch(`${apiBaseUrl}/tasks/${task.id}`, requestSettings).then(
//             response => {
//                 if(response.ok) {
//                     getTasks()
//                 }
//             }
//         )
//     }     


// Função que deleta as tarefas ---------------------------------- Provisório!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // const deleteTaskButtonRef = document.getElementById('not-done2')

    function deleteTask(task) {
        let taskCompleted = task
        // console.log(taskCompleted)
        taskCompleted.completed = true
        // console.log(taskCompleted)
        const requestSettings = {
            method: 'DELETE',
            body: JSON.stringify(taskCompleted),
            headers: requestHeadersAuth
        }
        fetch(`${apiBaseUrl}/tasks/${task.id}`, requestSettings).then(
            response => {
                if(response.ok) {
                    getTasks()
                }
            }
        )
    }    

// ----------------
    // deleteTaskButtonRef.addEventListener('click', () => deleteTask(task))    

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
            if(response.ok) {
                getTasks()
            }
        }
    )
}

//COPIA DO DE BAIXO QUE DELETA COMO OS INPITS DO LADO ESQUERDO
// // Referencia da Lista de Tarefas Concluidas ---- BOTÃO DELETAR!!!!
// const closeTasksListRef = document.querySelector('#closeTasksList')

// function addEventListenersToTasksCloseds() {
//     const closeTaskListItensRef = Array.from(closeTasksListRef.children)
//     closeTaskListItensRef.map(
//         (item, index) => {
//             const closeActionItemTaskRef = item.children[0]
//             const taskFinded2 = userTasks.closeds[index]
//             // closeActionItemTaskRef.addEventListener('click', () => deleteTask(taskFinded2)) COPIA COM FUNÇÃO DELETE DIRETO.
//             closeActionItemTaskRef.addEventListener('click', () => confirmDelete())

//             function confirmDelete() 
//             {
//                 const confirmText = 'Deseja realmente excluir a tarefa?';
//                 if (confirm(confirmText) == true) 
//                 {
//                     deleteTask(taskFinded2)
//                 } 
//                 else 
//                 {
//                 }
//             }
//         }
//     )
// }


                                // // Referencia da Lista de Tarefas Concluidas ---- BOTÃO DELETAR!!!!
                                // const closeTasksListRef = document.querySelector('#closeTasksList')

                                // function addEventListenersToTasksCloseds() {
                                //     const closeTaskListItensRef = Array.from(closeTasksListRef.children)
                                //     closeTaskListItensRef.map(
                                //         (item, index) => {
                                //             const closeActionItemTaskRef = item.children[0]
                                //             const taskFinded2 = userTasks.closeds[index]
                                //             // closeActionItemTaskRef.addEventListener('click', () => deleteTask(taskFinded2)) COPIA COM FUNÇÃO DELETE DIRETO.
                                //             closeActionItemTaskRef.addEventListener('click', () => confirmDelete())
                                //             console.log(closeActionItemTaskRef.addEventListener)

                                //             function confirmDelete() 
                                //             {
                                //                 const confirmText = 'Deseja realmente excluir a tarefa?';
                                //                 if (confirm(confirmText) == true) 
                                //                 {
                                //                     deleteTask(taskFinded2)
                                //                 } 
                                //                 else 
                                //                 {
                                //                 }
                                //             }
                                //         }
                                //     )
                                // }

// //-----------
    function confirmDelete() 
    {
        const confirmText = 'Deseja realmente excluir a tarefa?';
        if (confirm(confirmText) == true) 
        {
            deleteTask(taskFinded2)
        } 
        else 
        {
        }
    }

// Referencia da Lista de Tarefas Concluidas e leva de volta para as tarefas Incompletas
    const closeTasksListRef = document.querySelector('#closeTasksList')

    function addEventListenersToTasksCloseds() {
        const closeTaskListItensRef = Array.from(closeTasksListRef.children)
        closeTaskListItensRef.map(
            (item, index) => {
                const closeActionItemTaskRef = item.children[0]
                const taskFinded2 = userTasks.closeds[index]
                closeActionItemTaskRef.addEventListener('click', () => notCompleteTask(taskFinded2))
            }
        )
    }

// Funcao que ira inserir as nossas Tasks no HTML
    function insertClosedsTasksHtml() {
        // Remocao de todos os elementos dentro da Lista de Tarefas em Aberto
        closeTasksListRef.innerHTML = ''
        // For nas tarefas para inseri-las no HTML
        for(let task of userTasks.closeds) {
            // Criacao de uma data baseada na string retornada da API
            const taskDate = new Date(task.createdAt)
            // Formatacao da data criada para o padrao brasileiro
            const taskDateFormated = new Intl.DateTimeFormat('pt-BR').format(taskDate)
            closeTasksListRef.innerHTML += `
                <li class="tarefa2">
                    <div class="not-done2"></div>
                    <div class="descricao2" autocomplete="off">
                        <p class="nome">${task.description}</p> 
                        <!--<p class="id2">#${task.id}</p> <!--------------------------Mudar para um id proprio de num de tarefas (ref)----->
                        <p class="timestamp2">Criada em: ${taskDateFormated}</p>
                        <div class="check-box2">
                            <input type="radio" id="css2" class="radio2">
                            <label for="css" class="label2">Excluir</label>
                        </div>
                    </div>
                </li>
            `
        }
        //-------------
        addEventListenersToTasksCloseds()
    }

//----------------- DOCUMENTAR-------------------!!!!!!!!!!!!
    function checkTasks(tasks) {
        for(let task of tasks) {
            if(task.completed) {
                userTasks.closeds.push(task)
                // taskCounterCloseds()
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
                if(response.ok) {
                    response.json().then
                    (
                        tasks => {
                            checkTasks(tasks)
                            taskCounterOpeneds()    
                        }
                    )
                } else {
                    // Verificacao se o Status da Request é 401(Nao autorizado)
                    if(response.status === 401) {
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
        if(response.ok) {
            // Caso tenha dado tudo certo nos executamos a funcao getTasks() novamente
            // A ideia de executarmos novamente a getTasks() esta em "remontarmos as listas pata o usuario"
            // Toda vez que fazemos uma requisicao para criarmos uma nova tarefa, ela no final das contas é criada no Banco de Dados, porem, 
            //a listagem que esta sendo mostrada para o usuario nao contem essa nova tarefa criada. Por isso que precisamos obter as tarefas novamente
            getTasks()
        }
        // Limpa o campo do formulario após click do botão.
        novaTarefaRef.value = ""
    }

// Funcao que ira checar se o Usuario esta de fato Autenticado na Aplicacao
    function checkAuthUser() {
        // Verifica se o JWT obtido do localStorage é nulo
        if(jwt === null) {
            // Caso seja a aplicacao ja realiza o Logout do Usuario
            logOut()
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
    if(localStorage.getItem('user') === null)
    {
        getUser()
    }
    else
    {
        const user = JSON.parse(localStorage.getItem('user'))
        const userNameRef = document.getElementById('userName')
        userNameRef.innerText = `${user.firstName} ${user.lastName}` 
    }

// Função que valida o campo ** + ** e aciona CSS 
    const newTaskInputRef = document.querySelector('#novaTarefa')
    const newTaskButtontRef = document.querySelector('#submitButtonNewTask')

    function validateAdicionaTarefa(event) {
        const target = event.target
        const value = target.value
        const isValid = target.checkValidity()
        if(isValid) {
            newTaskButtontRef.disabled = false
            submitButtonNewTaskRef.classList.remove('error')
            submitButtonNewTaskRef.classList.add('ok', 'valid')
        } else {
            newTaskButtontRef.disabled = true
            submitButtonNewTaskRef.classList.add('error')
            submitButtonNewTaskRef.classList.remove('ok', 'valid')
        }
    }

//-----------------descrever
    newTaskInputRef.addEventListener('keyup', (event) => validateAdicionaTarefa(event))



// // ----- #4 FIM

