// Constantes globais
const apiBaseUrl = 'https://todo-api.ctd.academy/v1'
const nomeInputRef = document.querySelector('#nomeInput')
const sobrenomeInputRef = document.querySelector('#sobrenomeInput')
const emailInputRef = document.querySelector('#emailInput')
const senhaInputRef = document.querySelector('#senhaInput')
const repetirSenhaInputRef = document.querySelector('#repetirSenhaInput')
const buttonSubmitRef = document.querySelector('#buttonSubmit')
const formControlButtonSubmitRef = document.querySelector('.button-submit')
const formControlRepetirSenhaRef = document.querySelector('#formControlRepetirSenha')
const formControlBarraLateral = document.querySelector('#form')
const eyeSeeSingupReType = document.getElementById('eyeSenha2')
const eyeSeeSingupType = document.getElementById('eyeSenha1')

// Variável para validação do formulário e liberação do botão submit
var formNoErrors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRetype: ''
}

// Variável para validação do usuário na API
var user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordRetype: ''
}

// Função para habilitar o botão submit
function disableButtonFormErrors() {
    if (formNoErrors.firstName &&
        formNoErrors.lastName &&
        formNoErrors.email &&
        formNoErrors.password &&
        formNoErrors.passwordRetype
    ) {
        buttonSubmitRef.disabled = false
        formControlBarraLateral.classList.add('valid')
    } else {
        buttonSubmitRef.disabled = true
        formControlBarraLateral.classList.remove('valid')
    }
    console.log('Sem erros!',
        formNoErrors.firstName &&
        formNoErrors.lastName &&
        formNoErrors.email &&
        formNoErrors.password &&
        formNoErrors.passwordRetype
    )
}

// Função que GENÉRICA que valida os campos nome, sobrenome, email e aciona CSS 
function validateInput(event) {
    const target = event.target
    const value = target.value
    const parent = target.parentNode
    const isValid = target.checkValidity()
    user[target.name] = value
    console.log(target.name)
    console.log(user[target.name])
    if (isValid) {
        parent.classList.remove('error')
        parent.classList.add('ok', 'valid')
        formNoErrors[target.name] = true
    } else {
        parent.classList.add('error')
        parent.classList.remove('ok', 'valid')
        formNoErrors[target.name] = false
    }
    disableButtonFormErrors()
}

// Função que valida o campo **SENHA** e aciona CSS.
function validateSenha(event) {
    const target = event.target
    const value = target.value
    const parentSenha = target.parentNode
    const isValid = target.checkValidity()
    user.password = value
    console.log(value)
    if (isValid) {
        repetirSenhaInputRef.disabled = false;
        parentSenha.classList.remove('error')
        parentSenha.classList.add('ok', 'validSenhas')
        formNoErrors.password = true
        console.log('Valor Válido!')
        validateRepetirSenha(event)
    } else {
        parentSenha.classList.add('error')
        parentSenha.classList.remove('ok', 'validSenhas')
        formNoErrors.password = false
        console.log('Valor Inválido!')
    }
    disableButtonFormErrors()
}

// Função que valida o campo **REPETIR SENHA** verificando se é igual a senha digitada, e aciona CSS.
function validateRepetirSenha(event) {
    const target = event.target
    const value = target.value
    const isValid = target.checkValidity()
    var senhasIguais = senhaInputRef.value === repetirSenhaInputRef.value
    user.passwordRetype = value
    console.log(value)
    if (senhasIguais && isValid) {
        formControlRepetirSenhaRef.classList.remove('error')
        formControlRepetirSenhaRef.classList.add('ok', 'validSenhas')
        formNoErrors.passwordRetype = true
        console.log('Valor Válido!')
        console.log(formNoErrors.passwordRetype)
        console.log('As senhas são iguais!')
    } else {
        formControlRepetirSenhaRef.classList.add('error')
        formControlRepetirSenhaRef.classList.remove('ok', 'validSenhas')
        formNoErrors.passwordRetype = false
        console.log('Valor Inválido!')
    }
    disableButtonFormErrors()
}

// Função fixa o botão após click inserindo class CSS. // Adicionado parte do código para singup via API.
function manterClicado(event) {
    event.preventDefault()
    buttonSubmitRef.classList.add('active')
    const requestHeaders =
    {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    const requestSettings =
    {
        method: 'POST',
        body: JSON.stringify(user),
        headers: requestHeaders
    }
    console.log(JSON.stringify(user))
    fetch(`${apiBaseUrl}/users`, requestSettings
        ).then(
            response => {
                console.log(response)
                if (response.ok) {
                    Swal.fire(
                        'Usuário cadastrado com sucesso!',
                        'Clique em OK para continuar',
                        'success'
                    ).then(() => window.location.href = "../index.html")
                }
                else {
                    Swal.fire(
                        'Esse e-mail já foi cadastrado!',
                        'Escolha outro',
                        'error'
                    ).then(() => {
                        emailInputRef.value = ''
                        emailInputRef.focus()
                        buttonSubmitRef.classList.remove('active')
                    })
                }
            }
        )
}

// Visualizando o valor dos campos de Senha clicando no ícone de olho
eyeSeeSingupType.addEventListener('click', () => {
    if (senhaInputRef.getAttribute('type') === 'password') {
        senhaInputRef.setAttribute('type', 'text');
        eyeSeeSingupType.setAttribute('src', '../assets/eye.svg');
    }
    else if (senhaInputRef.getAttribute('type') === 'text') {
        senhaInputRef.setAttribute('type', 'password');
        eyeSeeSingupType.setAttribute('src', '../assets/eye-off.svg');
    }
});

// Visualizando o valor dos campos de Repetir Senha clicando no ícone de olho
eyeSeeSingupReType.addEventListener('click', () => {
    if (repetirSenhaInputRef.getAttribute('type') === 'password') {
        repetirSenhaInputRef.setAttribute('type', 'text');
        eyeSeeSingupReType.setAttribute('src', '../assets/eye.svg');
    }
    else if (repetirSenhaInputRef.getAttribute('type') === 'text') {
        repetirSenhaInputRef.setAttribute('type', 'password');
        eyeSeeSingupReType.setAttribute('src', '../assets/eye-off.svg');
    }
});

// Eventos
nomeInputRef.addEventListener('keyup', (event) => validateInput(event))
sobrenomeInputRef.addEventListener('keyup', (event) => validateInput(event))
emailInputRef.addEventListener('keyup', (event) => validateInput(event))
emailInputRef.addEventListener('focus', (event) => validateInput(event))
senhaInputRef.addEventListener('keyup', (event) => validateSenha(event))
repetirSenhaInputRef.addEventListener('keyup', (event) => validateRepetirSenha(event))
buttonSubmitRef.addEventListener('click', (event) => manterClicado(event))