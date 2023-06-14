const visibilidadeSenhaBtn = document.querySelector(".visibilidade-senha-btn")

visibilidadeSenhaBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const inputSenha = document.querySelector("#inputSenha")
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


const url = '/dashboard.html'
const form = document.querySelector('form')

form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    checkInput();
    
});


function redirecionar() {
    // Redireciona o navegador para o URL especificado
    window.location.href = url;
  }

const password = document.querySelector('#inputSenha')
  const email = document.querySelector('#inputEmail')

function checkInput(){

    const emailValue = email.value
    const passwordValue = password.value

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



  
  function setSuccessForEmail(input){
   const formsControl = input.parentElement;
   const small = formsControl.querySelector('small')

   

    // adc sucesso
    small.classList.add('success')
    small.classList.remove('error')

}
  function setSuccessForPassaword(input){
   const formsControl = input.parentElement;
   const small = formsControl.querySelector('small')
   
    small.classList.add('success')
    small.classList.remove('error')
    teste()

}

  function setErrorFor(input, message){
    const formsControl = input.parentElement;
    const small = formsControl.querySelector('small')

    // msg de erro
    small.innerText = message;
    //adc classe de erro
   small.classList.add('error')

}

function teste(){

    const smallEmail = document.querySelector('.emails')
    const smallPassword = document.querySelector('.passwordd')

    if(smallEmail.classList.contains('success') && smallPassword.classList.contains('success')){
        redirecionar()
    }else{
        console.log('rodou')
    }

}