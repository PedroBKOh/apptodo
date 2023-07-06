// Variáveis globais
const apiBaseUrl = 'https://todo-api.ctd.academy/v1'
const emailInputLoginRef = document.querySelector('#emailInputLogin')
const senhaInputLoginRef = document.querySelector('#senhaInputLogin')
const buttonSubmitLoginRef = document.querySelector('#buttonSubmitLogin')
const formControlButtonSubmitLoginRef = document.querySelector('.button-submit-login')
const formControlBarraLateralLoginRef = document.querySelector('#form')

// Variável para validação do formulário
var formNoErrorsLogin = {
    email: '',
    password: ''
}
// Variável para receber os dados dos inputs.
var user = {
    email: '',
    password: ''
}

// Função para habilitar o botão submit.
function disableButtonFormErrorsLogin() {
    var formValidity = formNoErrorsLogin.email && formNoErrorsLogin.password
    if (formValidity) {
        buttonSubmitLoginRef.disabled = false
        formControlBarraLateralLoginRef.classList.add('valid')
        console.log('Formulário Válido', formValidity)
    } else {
        buttonSubmitLoginRef.disabled = true
        formControlBarraLateralLoginRef.classList.remove('valid')
        console.log('Contém erros!', formValidity)
    }
}

// Função que valida o campo **EMAIL** e  **SENHA**, aciona CSS.
function validateInput(event) {
    const target = event.target
    const value = target.value
    const parent = target.parentNode
    const isValid = target.checkValidity()
    user[target.name] = value
    console.log(user)
    console.log(target.type, '=', value)
    if (isValid) {
        parent.classList.remove('error')
        parent.classList.add('ok', 'valid')
        formNoErrorsLogin[target.name] = true
    } else {
        parent.classList.add('error')
        parent.classList.remove('ok', 'valid')
        formNoErrorsLogin[target.name] = false
    }
    disableButtonFormErrorsLogin()
}

// Função fixa o botão após click inserindo class CSS. // Adicionado parte do código para singup via API.
function manterClicado(event) {
    event.preventDefault()
    buttonSubmitLoginRef.classList.add('active')
    const requestHeaders = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    const requestSettings = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: requestHeaders
    }
    fetch(`${apiBaseUrl}/users/login`, requestSettings).then(
        response => {
            console.log(response)
            if (response.ok) {
                response.json().then(
                    security => {
                        localStorage.setItem('jwt', security.jwt)
                        window.location.href = './pages/tarefas.html'
                    }
                )
            } else {
                Swal.fire(
                    'E-mail ou senha inválido!',
                    'Esqueceu? Já era!. Volta pro cadastro e faz de novo!',
                    'error'
                )
            }
        }
    )
}

// Visualizando o valor dos campos de Senha clicando no ícone de olho
const eyeSeeLogin = document.getElementById('eyeLogin');
eyeSeeLogin.addEventListener('click', () => {
    if (senhaInputLoginRef.getAttribute('type') === 'password') {
        senhaInputLoginRef.setAttribute('type', 'text');
        eyeSeeLogin.setAttribute('src', '../assets/eye.svg');
    }
    else if (senhaInputLoginRef.getAttribute('type') === 'text') {
        senhaInputLoginRef.setAttribute('type', 'password');
        eyeSeeLogin.setAttribute('src', '../assets/eye-off.svg');
    }
});

// Eventos
emailInputLoginRef.addEventListener('keyup', (event) => validateInput(event))
senhaInputLoginRef.addEventListener('keyup', (event) => validateInput(event))
buttonSubmitLoginRef.addEventListener('click', (event) => manterClicado(event))