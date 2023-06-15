const visibilidadeSenhaBtn = document.querySelector(".visibilidade-senha-btn")

visibilidadeSenhaBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const inputSenha = document.querySelector("#input-senha")
    const span = visibilidadeSenhaBtn.getElementsByTagName("span")[0]
    const visible = span.innerText === "visibility"

    if (visible) {
        inputSenha.type = "password"
        span.innerText = "visibility_off"
    } else {
        inputSenha.type = "text"
        span.innerText = "visibility"
    }

    inputSenha.focus()
})


const username = document.querySelector('#input-nome')
const email = document.querySelector('#input-email')
const password = document.querySelector('#input-senha')
const form = document.querySelector('form')
const checkBox = document.querySelectorAll('#sla')
const check = document.querySelector('#sla')
const url = '/login.html'
let selecionado = 0


check.addEventListener("click", (e) =>{


    selecionado = 0
    checkBox.forEach((ele) =>{
        if(ele.checked){
            selecionado++
        }
    })
    console.log(selecionado)

})



form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    checkInput();
  });

function checkInput(){

    const usernameValue = username.value
    const emailValue = email.value
    const passwordValue = password.value

    if(usernameValue === ""){
        setErrorFor(username, "Nome de usuario é obrigatório");
    } else{
        setSuccessForUsername(username);
    }

    if(emailValue === ""){
        setErrorFor(email,'O email é obrigatório')
    } else if(!checkEmail(emailValue)){
        setErrorFor(email, "Por favor insira um email válido.");
    } else {
       setSuccessForEmail(email)
    }

    if(passwordValue === ""){
        setErrorFor(password,"A senha é obrigatória.");

    } else if(passwordValue.length < 7){
        setErrorFor(password, "A senha precisa ter mais de 7 caracteries.");
    } else{
        setSuccessForPassaword(password)
    }

  }


  function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
     }



  
     function setSuccessForPassaword(input){
        const formsControl = input.parentElement;
        const small = formsControl.querySelector('small')
        
         small.classList.add('success')
         small.classList.remove('error')
         teste()
     
     }
     function setSuccessForEmail(input){
        const formsControl = input.parentElement;
        console.log(formsControl)
        const small = formsControl.querySelector('small')
     
        
     
         // adc sucesso
         small.classList.add('success')
         small.classList.remove('error')
         teste()
     
     }
  function setSuccessForUsername(input){
    const formsControl = input.parentElement;
    const small = formsControl.querySelector('small')
    // adc sucesso
     small.classList.add('success')
     small.classList.remove('error')
     //teste()

}




function setErrorFor(input, message){
    const formsControl = input.parentElement;
    const small = formsControl.querySelector('small')

    // msg de erro
    small.innerText = message;
    //adc classe de erro
   small.classList.add('error')

}

function redirecionar() {
    // Redireciona o navegador para o URL especificado
    window.location.href = url;
  }


function teste(){

    const smallEmail = document.querySelector('.smalEmails')
    const smallPassword = document.querySelector('.smallPasswordd')
    const smallUsername = document.querySelector('.smallUsernamee')

    if(smallEmail.classList.contains('success') && smallPassword.classList.contains('success') && smallUsername.classList.contains('success') && selecionado === 1){
        alert('Você foi cadastrado')
        redirecionar()
    }else{
        console.log('rodou')
    }

}


