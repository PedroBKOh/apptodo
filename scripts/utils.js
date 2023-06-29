//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
// Importando Função
    // Variável da função obtida após verificação das tarefas.
    import {userTasks} from "./tarefas.js";

//Exportando Função
    // Para ser acionado após a verificação da lista de tarefas
    export {taskCounterOpeneds}; 
    // export {taskCounterCloseds}; 



// Função que captura e mostra a qt de itens na task opened.
    function taskCounterOpeneds() 
    {
        var totalTaskOpen = 0;
        const totalTaskOpenRef = document.getElementById('numTarefas')
        totalTaskOpenRef.innerHTML = `#${userTasks.openeds.length}`
    }

//------------------------------------------------------------------------------------