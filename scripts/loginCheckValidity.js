// // ----- Parte do código copiado do signupCheckValidity.js ----- #1 INICIO
//     // Variáveis globais
//         const emailInputLoginRef = document.querySelector('#emailInputLogin')
//         const senhaInputLoginRef = document.querySelector('#senhaInputLogin')
//         const buttonSubmitLoginRef = document.querySelector('#buttonSubmitLogin')
//         const formControlButtonSubmitLoginRef = document.querySelector('.button-submit-login')
//         const formControlBarraLateralLogin = document.querySelector('#form')

//     // Variável para validação do formulário
//         var formNoErrorsLogin = {
//             email: '',
//             password: ''
//         }

//     //Muda a cor da barra do formulário atraves do CSS 
//         function addStyle() {
//             const sheet = new CSSStyleSheet();
//             sheet.insertRule(`form:after {
//             background: linear-gradient(#70e609, green);
//             }`);
//             document.adoptedStyleSheets = [sheet];
//         }
//         function revoveStyle() {
//             const sheet = new CSSStyleSheet();
//             sheet.insertRule(`form:after {
//                 background: linear-gradient(var(--primary), var(--secondary));
//             }`);
//             document.adoptedStyleSheets = [sheet];
//         }

//     // Função para habilitar o botão submit
//         function disableButtonFormErrorsLogin() {

//             // console.log('usuario:', formNoErrors)
//             // console.log('formulario:', x)

//             if( formNoErrorsLogin.email &&
//                 formNoErrorsLogin.password
//                 ) 
//             {
//                 buttonSubmitLoginRef.disabled = false
//                 formControlButtonSubmitLoginRef.classList.remove('button', 'disabled')
//                 formControlButtonSubmitLoginRef.classList.add('enabled')
//                 addStyle()
//             } else {
//                 buttonSubmitLoginRef.disabled = true
//                 formControlButtonSubmitLoginRef.classList.add('disabled')
//                 formControlButtonSubmitLoginRef.classList.remove('enabled')
//                 revoveStyle()
//             }
//                 console.log('Sem erros!', 
//                 formNoErrorsLogin.email &&
//                 formNoErrorsLogin.password
//                 )
//         }

//     // Função que valida o campo **EMAIL** e aciona CSS 
//         function validateInput(event) {
//             const target = event.target
//             const value = target.value
//             const parent = target.parentNode
//             const isValid = target.checkValidity()
                
//             console.log(value)

//             if(isValid) {
//                 parent.classList.remove('error')
//                 parent.classList.add('ok', 'valid')
//                 formNoErrorsLogin[target.name] = true
//             } else {
//                 parent.classList.add('error')
//                 parent.classList.remove('ok', 'valid')
//                 formNoErrorsLogin[target.name] = false
//             }
//             disableButtonFormErrorsLogin()
//         }

//     // Arrow função. Evento que ativa as funções
//         emailInputLoginRef.addEventListener('keyup', (event) => validateInput(event))
//         senhaInputLoginRef.addEventListener('keyup', (event) => validateInput(event))

//     // Previne reload da página
//         buttonSubmitLoginRef.addEventListener('click', (event) => {event.preventDefault()})


//     // função fixa o botão após click inserindo class CSS
//         function clicado() {
//             buttonSubmitLoginRef.classList.add('active')
//         }
//         buttonSubmitLoginRef.addEventListener('click', (event) => clicado())

// // ----- #1 FIM ----- 

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

// ----- Parte do código copiado do signupCheckValidity.js ----- #2 INICIO

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

            if(formValidity) 
            {
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


            if(isValid) 
            {
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

    // Arrow função. Evento que ativa as funções
        emailInputLoginRef.addEventListener('keyup', (event) => validateInput(event))
        senhaInputLoginRef.addEventListener('keyup', (event) => validateInput(event))

       

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
                    if(response.ok) {
                        response.json().then(
                            security => {
                                localStorage.setItem('jwt', security.jwt)
                                window.location.href = './pages/tarefas.html'
                                
                            }
                        )
                    } else {
                        alert('Email ou senha inválido!')
                    }
                }
            )
        
        }
        buttonSubmitLoginRef.addEventListener('click', (event) => manterClicado(event))

    //-----------------------
        function logOut() {

        }


// ----- #2 FIM ----- 
