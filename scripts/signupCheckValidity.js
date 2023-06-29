// ----- Forma primária de fazer a validação. ----- #1 INICIO
// const nomeInputRef = document.querySelector('#nomeInput')
// function validateNome(event) {
//     if(value.length > 5 && value.length < 24) {
//         console.log('Valor Válido!')
//     } else {
//         console.log('Valor Inválido!')
//     }
//     console.log(value)
//     console.log(value.length)
// }
// nomeInputRef.addEventListener('keyup', (event) => validateNome(event))
// ----- #1 FIM ----- 


// ----- Forma mais resumida que a anterior. ----- #2 INICIO
// const nomeInputRef = document.querySelector('#nomeInput')
// function validateNome(event) {
//     const value = event.target.value
//     console.log(event.target.checkValidity())
//     // if(event.target.checkValidity() {
//     //     console.log('Valor Válido!')
//     // } else {
//     //     console.log('Valor Inválido!')
//     // }
// }
// nomeInputRef.addEventListener('keyup', (event) => validateNome(event))
// ----- #2 FIM ----- 


// // ----- Forma Resumida final ----- #3 INICIO
// // Variáveis globais
// const nomeInputRef = document.querySelector('#nomeInput')
// const sobrenomeInputRef = document.querySelector('#sobrenomeInput')
// const emailInputRef = document.querySelector('#emailInput')
// const senhaInputRef = document.querySelector('#senhaInput')
// const repetirSenhaInputRef = document.querySelector('#repetirSenhaInput')
// const buttonSubmitRef = document.querySelector('#buttonSubmit')
// const formControlButtonSubmitRef = document.querySelector('.button-submit')
// const formControlNomeRef = document.querySelector('#formControlNome')
// const formControlSobrenomeRef = document.querySelector('#formControlSobrenome')
// const formControlEmailRef = document.querySelector('#formControlEmail')
// const formControlSenhaRef = document.querySelector('#formControlSenha')
// const formControlRepetirSenhaRef = document.querySelector('#formControlRepetirSenha')
// const formControlBarraLateral = document.querySelector('#form')


// // Variável para validação do formulário
// var formErrors = {
//     nome: '',
//     sobrenome: '',
//     email: '',
//     senha: '',
//     repetirSenha: ''
// }

// //Muda a cor da barra do formulário atraves do CSS 
// function addStyle() {
//     const sheet = new CSSStyleSheet();
//     sheet.insertRule(`form:after {
//       background: linear-gradient(#70e609, green);
//     }`);
//     document.adoptedStyleSheets = [sheet];
// }
// function revoveStyle() {
//     const sheet = new CSSStyleSheet();
//     sheet.insertRule(`form:after {
//         background: linear-gradient(var(--primary), var(--secondary));
//     }`);
//     document.adoptedStyleSheets = [sheet];
// }
// // Função para habilitar o botão submit
// function disableButtonFormErrors() {
//     var x = formErrors.nome &&
//     formErrors.sobrenome &&
//     formErrors.email &&
//     formErrors.senha &&
//     formErrors.repetirSenha

//     console.log('usuario:', formErrors)
//     console.log('formulario:', x)

//     if(x === true) 
//     {
//         formControlButtonSubmitRef.classList.remove('button', 'disabled')
//         formControlButtonSubmitRef.classList.add('enabled')
//         addStyle()
//     } else {
//         formControlButtonSubmitRef.classList.add('disabled')
//         formControlButtonSubmitRef.classList.remove('enabled')
//         revoveStyle()
//     }
// }

// // Função que valida o campo **NOME** e aciona CSS 
// function validateNome(event) {
//     const target = event.target
//     const value = target.value
//     const isValid = target.checkValidity()
        
//     console.log(value)

//     if(isValid) {
//         formControlNomeRef.classList.remove('error')
//         formControlNomeRef.classList.add('ok', 'valid')
//         formErrors.nome = true
//         console.log('Valor Válido!')
//         console.log(formErrors.nome)
//     } else {
//         formControlNomeRef.classList.add('error')
//         formControlNomeRef.classList.remove('ok', 'valid')
//         formErrors.nome = false
//         console.log('Valor Inválido!')
//     }
//     disableButtonFormErrors()
// }

// // Função que valida o campo **SOBRENOME** e aciona CSS 
// function validateSobrenome(event) {
//     const target = event.target
//     const value = target.value
//     const isValid = target.checkValidity()
        
//     console.log(value)

//     if(isValid) {
//         formControlSobrenomeRef.classList.remove('error')
//         formControlSobrenomeRef.classList.add('ok', 'valid')
//         formErrors.sobrenome = true
//         console.log('Valor Válido!')
//         console.log(formErrors.sobrenome)
//     } else {
//         formControlSobrenomeRef.classList.add('error')
//         formControlSobrenomeRef.classList.remove('ok', 'valid')
//         formErrors.sobrenome = false
//         console.log('Valor Inválido!')
//     }
//     disableButtonFormErrors()
// }

// // Função que valida o campo **EMAIL** e aciona CSS 
// function validateEmail(event) {
//     const target = event.target
//     const value = target.value
//     const isValid = target.checkValidity()
        
//     console.log(value)

//     if(isValid) {
//         formControlEmailRef.classList.remove('error')
//         formControlEmailRef.classList.add('ok', 'valid')
//         formErrors.email = true
//         console.log('Valor Válido!')
//         console.log(formErrors.email)
//     } else {
//         formControlEmailRef.classList.add('error')
//         formControlEmailRef.classList.remove('ok', 'valid')
//         formErrors.email = false
//         console.log('Valor Inválido!')
//     }
//     disableButtonFormErrors()
// }

// // Função que valida o campo **SENHA** e aciona CSS 
// function validateSenha(event) {
//     const target = event.target
//     const value = target.value
//     const isValid = target.checkValidity()
        
//     console.log(value)

//     if(isValid) {
//         document.getElementById("repetirSenhaInput").disabled = false;
//         formControlSenhaRef.classList.remove('error')
//         formControlSenhaRef.classList.add('ok', 'validSenhas')
//         formErrors.senha = true
//         console.log('Valor Válido!')
//         console.log(formErrors.senha)
//         console.log('a',document.getElementById("repetirSenhaInput").disabled)
//         validateRepetirSenha(event)
//     } else {
//         formControlSenhaRef.classList.add('error')
//         formControlSenhaRef.classList.remove('ok', 'validSenhas')
//         formErrors.senha = false
//         console.log('Valor Inválido!')
//     }
//     disableButtonFormErrors()
// }

// // Função que valida o campo **REPETIR SENHA** verificando se é igual a senha digitada, e aciona CSS 
// function validateRepetirSenha(event) {
//     const target = event.target
//     const value = target.value
//     const isValid = target.checkValidity()
//     var senhasIguais = senhaInputRef.value === repetirSenhaInputRef.value
        
//     console.log(value)

//     if(senhasIguais && isValid) {
//         formControlRepetirSenhaRef.classList.remove('error')
//         formControlRepetirSenhaRef.classList.add('ok', 'validSenhas')
//         formErrors.repetirSenha = true
//         console.log('Valor Válido!')
//         console.log(formErrors.repetirSenha)
//         console.log('As senhas são iguais!')
//     } else {
//         formControlRepetirSenhaRef.classList.add('error')
//         formControlRepetirSenhaRef.classList.remove('ok', 'validSenhas')
//         formErrors.repetirSenha = false
//         console.log('Valor Inválido!')
//     }
//     disableButtonFormErrors()
// }

// // Arrow função. Evento que ativa as funções
// nomeInputRef.addEventListener('keyup', (event) => validateNome(event))
// sobrenomeInputRef.addEventListener('keyup', (event) => validateSobrenome(event))
// emailInputRef.addEventListener('keyup', (event) => validateEmail(event))
// senhaInputRef.addEventListener('keyup', (event) => validateSenha(event))
// repetirSenhaInputRef.addEventListener('keyup', (event) => validateRepetirSenha(event))

// // Previne reload da página
// buttonSubmitRef.addEventListener('click', (event) => {event.preventDefault()})
// // ----- #3 FIM ----- 


// // ----- Forma Refatorado 1 ----- #4 INICIO
    // // Variáveis globais
    // const nomeInputRef = document.querySelector('#nomeInput')
    // const sobrenomeInputRef = document.querySelector('#sobrenomeInput')
    // const emailInputRef = document.querySelector('#emailInput')
    // const senhaInputRef = document.querySelector('#senhaInput')
    // const repetirSenhaInputRef = document.querySelector('#repetirSenhaInput')
    // const buttonSubmitRef = document.querySelector('#buttonSubmit')
    // const formControlButtonSubmitRef = document.querySelector('.button-submit')
    // const formControlRepetirSenhaRef = document.querySelector('#formControlRepetirSenha')
    // const formControlBarraLateral = document.querySelector('#form')

    // // Variável para validação do formulário
    // var formErrors = {
    //     nome: '',
    //     sobrenome: '',
    //     email: '',
    //     senha: '',
    //     repetirSenha: ''
    // }

    // //Muda a cor da barra do formulário atraves do CSS 
    // function addStyle() {
    //     const sheet = new CSSStyleSheet();
    //     sheet.insertRule(`form:after {
    //       background: linear-gradient(#70e609, green);
    //     }`);
    //     document.adoptedStyleSheets = [sheet];
    // }
    // function revoveStyle() {
    //     const sheet = new CSSStyleSheet();
    //     sheet.insertRule(`form:after {
    //         background: linear-gradient(var(--primary), var(--secondary));
    //     }`);
    //     document.adoptedStyleSheets = [sheet];
    // }
    // // Função para habilitar o botão submit
    // function disableButtonFormErrors() {
    //     var x = formErrors.nome &&
    //     formErrors.sobrenome &&
    //     formErrors.email &&
    //     formErrors.senha &&
    //     formErrors.repetirSenha

    //     console.log('usuario:', formErrors)
    //     console.log('formulario:', x)

    //     if(x === true) 
    //     {
    //         formControlButtonSubmitRef.classList.remove('button', 'disabled')
    //         formControlButtonSubmitRef.classList.add('enabled')
    //         addStyle()
    //     } else {
    //         formControlButtonSubmitRef.classList.add('disabled')
    //         formControlButtonSubmitRef.classList.remove('enabled')
    //         revoveStyle()
    //     }
    // }

    // // Função que valida o campo **NOME** e aciona CSS 
    // function validateNome(event) {
    //     const target = event.target
    //     const value = target.value
    //     const parent = target.parentNode
    //     const isValid = target.checkValidity()
            
    //     console.log(value)

    //     if(isValid) {
    //         parent.classList.remove('error')
    //         parent.classList.add('ok', 'valid')
    //         formErrors.nome = true
    //         console.log('Valor Válido!')
    //         console.log(formErrors.nome)
    //     } else {
    //         parent.classList.add('error')
    //         parent.classList.remove('ok', 'valid')
    //         formErrors.nome = false
    //         console.log('Valor Inválido!')
    //     }
    //     disableButtonFormErrors()
    // }

    // // Função que valida o campo **SOBRENOME** e aciona CSS 
    // function validateSobrenome(event) {
    //     const target = event.target
    //     const value = target.value
    //     const parent = target.parentNode
    //     const isValid = target.checkValidity()
            
    //     console.log(value)

    //     if(isValid) {
    //         parent.classList.remove('error')
    //         parent.classList.add('ok', 'valid')
    //         formErrors.sobrenome = true
    //         console.log('Valor Válido!')
    //         console.log(formErrors.sobrenome)
    //     } else {
    //         parent.classList.add('error')
    //         parent.classList.remove('ok', 'valid')
    //         formErrors.sobrenome = false
    //         console.log('Valor Inválido!')
    //     }
    //     disableButtonFormErrors()
    // }

    // // Função que valida o campo **EMAIL** e aciona CSS 
    // function validateEmail(event) {
    //     const target = event.target
    //     const value = target.value
    //     const parent = target.parentNode
    //     const isValid = target.checkValidity()
            
    //     console.log(value)

    //     if(isValid) {
    //         parent.classList.remove('error')
    //         parent.classList.add('ok', 'valid')
    //         formErrors.email = true
    //         console.log('Valor Válido!')
    //         console.log(formErrors.email)
    //     } else {
    //         parent.classList.add('error')
    //         parent.classList.remove('ok', 'valid')
    //         formErrors.email = false
    //         console.log('Valor Inválido!')
    //     }
    //     disableButtonFormErrors()
    // }

    // // Função que valida o campo **SENHA** e aciona CSS 
    // function validateSenha(event) {
    //     const target = event.target
    //     const value = target.value
    //     const parentSenha = target.parentNode
    //     const isValid = target.checkValidity()
            
    //     console.log(value)

    //     if(isValid) {
    //         document.getElementById("repetirSenhaInput").disabled = false;
    //         parentSenha.classList.remove('error')
    //         parentSenha.classList.add('ok', 'validSenhas')
    //         formErrors.senha = true
    //         console.log('Valor Válido!')
    //         console.log(formErrors.senha)
    //         validateRepetirSenha(event)
    //     } else {
    //         parentSenha.classList.add('error')
    //         parentSenha.classList.remove('ok', 'validSenhas')
    //         formErrors.senha = false
    //         console.log('Valor Inválido!')
    //     }
    //     disableButtonFormErrors()
    // }

    // // Função que valida o campo **REPETIR SENHA** verificando se é igual a senha digitada, e aciona CSS 
    // function validateRepetirSenha(event) {
    //     const target = event.target
    //     const value = target.value
    //     const isValid = target.checkValidity()
    //     var senhasIguais = senhaInputRef.value === repetirSenhaInputRef.value
            
    //     console.log(value)

    //     if(senhasIguais && isValid) {
    //         formControlRepetirSenhaRef.classList.remove('error')
    //         formControlRepetirSenhaRef.classList.add('ok', 'validSenhas')
    //         formErrors.repetirSenha = true
    //         console.log('Valor Válido!')
    //         console.log(formErrors.repetirSenha)
    //         console.log('As senhas são iguais!')
    //     } else {
    //         formControlRepetirSenhaRef.classList.add('error')
    //         formControlRepetirSenhaRef.classList.remove('ok', 'validSenhas')
    //         formErrors.repetirSenha = false
    //         console.log('Valor Inválido!')
    //     }
    //     disableButtonFormErrors()
    // }

    // // Arrow função. Evento que ativa as funções
    // nomeInputRef.addEventListener('keyup', (event) => validateNome(event))
    // sobrenomeInputRef.addEventListener('keyup', (event) => validateSobrenome(event))
    // emailInputRef.addEventListener('keyup', (event) => validateEmail(event))
    // senhaInputRef.addEventListener('keyup', (event) => validateSenha(event))
    // repetirSenhaInputRef.addEventListener('keyup', (event) => validateRepetirSenha(event))

    // // Previne reload da página
    // buttonSubmitRef.addEventListener('click', (event) => {event.preventDefault()})
    // // ----- #4 FIM ----- 


    // // ----- Forma Refatorado 2 ----- #5 INICIO
    // // Variáveis globais

    // const apiBaseUrl = 'https://todo-api.ctd.academy/v1'
    // const nomeInputRef = document.querySelector('#nomeInput')
    // const sobrenomeInputRef = document.querySelector('#sobrenomeInput')
    // const emailInputRef = document.querySelector('#emailInput')
    // const senhaInputRef = document.querySelector('#senhaInput')
    // const repetirSenhaInputRef = document.querySelector('#repetirSenhaInput')
    // const buttonSubmitRef = document.querySelector('#buttonSubmit')
    // const formControlButtonSubmitRef = document.querySelector('.button-submit')
    // const formControlRepetirSenhaRef = document.querySelector('#formControlRepetirSenha')
    // const formControlBarraLateral = document.querySelector('#form')

    // // Variável para validação do formulário
    // var formNoErrors = {
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     password: '',
    //     passwordRetype: ''
    // }

    // var user = {
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     password: '',
    //     passwordRetype: ''
    // }

    // // //Muda a cor da barra do formulário atraves do CSS 
    // // function addStyle() {
    // //     const sheet = new CSSStyleSheet();
    // //     sheet.insertRule(`form:after {
    // //       background: linear-gradient(#70e609, green);
    // //     }`);
    // //     document.adoptedStyleSheets = [sheet];
    // // }
    // // function revoveStyle() {
    // //     const sheet = new CSSStyleSheet();
    // //     sheet.insertRule(`form:after {
    // //         background: linear-gradient(var(--primary), var(--secondary));
    // //     }`);
    // //     document.adoptedStyleSheets = [sheet];
    // // }

    // // Função para habilitar o botão submit
    // function disableButtonFormErrors() {

    //     if(formNoErrors.firstName &&
    //         formNoErrors.lastName &&
    //         formNoErrors.email &&
    //         formNoErrors.password &&
    //         formNoErrors.passwordRetype
    //         ) 
    //     {
    //         buttonSubmitRef.disabled = false
    //         // formControlButtonSubmitRef.classList.remove('button', 'disabled')
    //         // formControlButtonSubmitRef.classList.add('enabled')
    //         formControlBarraLateral.classList.add('valid')

    //         // addStyle()
    //     } else {
    //         buttonSubmitRef.disabled = true
    //         // formControlButtonSubmitRef.classList.add('disabled')
    //         // formControlButtonSubmitRef.classList.remove('enabled')
    //         // revoveStyle()
    //         formControlBarraLateral.classList.remove('valid')
    //     }
    //         console.log('Sem erros!', 
    //         formNoErrors.firstName &&
    //         formNoErrors.lastName &&
    //         formNoErrors.email &&
    //         formNoErrors.password &&
    //         formNoErrors.passwordRetype
    //         )
    // }

    // // Função que GENÉRICA que valida os campos nome, sobrenome, email e aciona CSS 
    //     function validateInput(event) {

    //         const target = event.target
    //         const value = target.value
    //         const parent = target.parentNode
    //         const isValid = target.checkValidity()
                
    //         user[target.name] = value

    //         console.log(target.name)
    //         console.log(user[target.name])

    //         if(isValid) {
    //             parent.classList.remove('error')
    //             parent.classList.add('ok', 'valid')
    //             formNoErrors[target.name] = true
    //         } else {
    //             parent.classList.add('error')
    //             parent.classList.remove('ok', 'valid')
    //             formNoErrors[target.name] = false
    //         }
    //         disableButtonFormErrors()
    //     }

    // // Função que valida o campo **SENHA** e aciona CSS
    //     function validateSenha(event) {
    //         const target = event.target
    //         const value = target.value
    //         const parentSenha = target.parentNode
    //         const isValid = target.checkValidity()

    //         user.password = value
                
    //         console.log(value)

    //         if(isValid) {
    //             repetirSenhaInputRef.disabled = false;
    //             parentSenha.classList.remove('error')
    //             parentSenha.classList.add('ok', 'validSenhas')
    //             formNoErrors.password = true
    //             console.log('Valor Válido!')
    //             validateRepetirSenha(event)
    //         } else {
    //             parentSenha.classList.add('error')
    //             parentSenha.classList.remove('ok', 'validSenhas')
    //             formNoErrors.password = false
    //             console.log('Valor Inválido!')
    //         }
    //         disableButtonFormErrors()
    //     }

    // // Função que valida o campo **REPETIR SENHA** verificando se é igual a senha digitada, e aciona CSS.
    //     function validateRepetirSenha(event) {
    //         const target = event.target
    //         const value = target.value
    //         const isValid = target.checkValidity()
    //         var senhasIguais = senhaInputRef.value === repetirSenhaInputRef.value

    //         user.passwordRetype = value

    //         console.log(value)

    //         if(senhasIguais && isValid) {
    //             formControlRepetirSenhaRef.classList.remove('error')
    //             formControlRepetirSenhaRef.classList.add('ok', 'validSenhas')
    //             formNoErrors.passwordRetype = true
    //             console.log('Valor Válido!')
    //             console.log(formNoErrors.passwordRetype)
    //             console.log('As senhas são iguais!')
    //         } else {
    //             formControlRepetirSenhaRef.classList.add('error')
    //             formControlRepetirSenhaRef.classList.remove('ok', 'validSenhas')
    //             formNoErrors.passwordRetype = false
    //             console.log('Valor Inválido!')
    //         }
    //         disableButtonFormErrors()
    //     }

    // // Arrow função. Evento que ativa as funções
    //     nomeInputRef.addEventListener('keyup', (event) => validateInput(event))
    //     sobrenomeInputRef.addEventListener('keyup', (event) => validateInput(event))
    //     emailInputRef.addEventListener('keyup', (event) => validateInput(event))
    //     senhaInputRef.addEventListener('keyup', (event) => validateSenha(event))
    //     repetirSenhaInputRef.addEventListener('keyup', (event) => validateRepetirSenha(event))

    // // Previne reload da página

    // // Função fixa o botão após click inserindo class CSS. 
    //     function manterClicado(event) {
    //         event.preventDefault()
    //         buttonSubmitRef.classList.add('active')

    //             const requestHeaders = {
    //                 "Accept": "application/json",
    //                 "Content-Type": "application/json"
    //             }
            
    //             const requestSettings = {
    //                 method: 'POST',
    //                 body: JSON.stringify(user),
    //                 headers: requestHeaders
    //             }

    //         console.log(JSON.stringify(user))
    //             fetch(`${apiBaseUrl}/users`, requestSettings).then(
    //                 response => {
    //                     console.log(response)
    //                     if(response.ok) {
    //                         alert('usuario cadastrado com sucesso')
    //                         window.location.href="index.html"
    //                     } else {
    //                         alert('esse e-mail ja foi cadastrado')
    //                     }
    //                 }
    //             )
    //     }
    //     buttonSubmitRef.addEventListener('click', (event) => manterClicado(event))



    // // Exemplo de Arrow Function  

    //     // function mostrarSoma(resultado){
    //     //     console.log(resultado)
    //     // }

    //     // function mostrarMensagem() {
    //     //     console.log('somou')
    //     // } 

    //     // function soma(numero, funcaoFornecida) {
    //     //     const resultado = 5 + numero
    //     //     funcaoFornecida(resultado)
    //     // }

    //     // soma(81, (resultado) => mostrarSoma(resultado))
    //     // soma(81, () => mostrarMensagem())

// // ----- #5 FIM ----- 


// ----- Forma Refatorado 3 ----- #6 INICIO
    // Variáveis globais
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

    // Variável para validação do formulário
        var formNoErrors = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordRetype: ''
        }

        var user = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordRetype: ''
        }

    // Função para habilitar o botão submit
        function disableButtonFormErrors() {

            if(formNoErrors.firstName &&
                formNoErrors.lastName &&
                formNoErrors.email &&
                formNoErrors.password &&
                formNoErrors.passwordRetype
                ) 
            {
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

            if(isValid) {
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

            if(isValid) {
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

            if(senhasIguais && isValid) {
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

    // Arrow função. Evento que ativa as funções
        nomeInputRef.addEventListener('keyup', (event) => validateInput(event))
        sobrenomeInputRef.addEventListener('keyup', (event) => validateInput(event))
        emailInputRef.addEventListener('keyup', (event) => validateInput(event))
        senhaInputRef.addEventListener('keyup', (event) => validateSenha(event))
        repetirSenhaInputRef.addEventListener('keyup', (event) => validateRepetirSenha(event))

    // Função fixa o botão após click inserindo class CSS. // Adicionado parte do código para singup via API.
        function manterClicado(event) {
            event.preventDefault()
            buttonSubmitRef.classList.add('active')

                const requestHeaders = {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            
                const requestSettings = {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: requestHeaders
                }

            console.log(JSON.stringify(user))
                fetch(`${apiBaseUrl}/users`, requestSettings).then(
                    response => {
                        console.log(response)
                        if(response.ok) {
                            alert('usuario cadastrado com sucesso')
                            window.location.href="../index.html"
                        } else {
                            alert('esse e-mail ja foi cadastrado')
                        }
                    }
                )
        }
        buttonSubmitRef.addEventListener('click', (event) => manterClicado(event))

// ----- #6 FIM ----- 
