//------------- EXPORTAÇÃO DE FUNÇÃO -------------------------
    export {logOut};

// Funcao que realiza o Logout
function logOut() {

    // Limpeza no localStorage
    localStorage.clear()
    // Redirecionamento para o Login
    window.location.href = '../index.html'
}

// Função do botão Log Out
const logOutButtonRef = document.querySelector('#logOutButton')
logOutButtonRef.addEventListener('click', () => logOut())
