//------------- EXPORTAÇÃO DE FUNÇÃO -------------------------
    export {logOut};

// Funcao que realiza o Logout
    function logOut(forceLogout) {
        if(forceLogout){
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

// Função do botão Log Out
const logOutButtonRef = document.querySelector('#logOutButton')
logOutButtonRef.addEventListener('click', () => logOut())