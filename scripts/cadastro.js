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
        setSuccessFor(username);
    }

    if(emailValue === ""){
        setErrorFor(email,'O email é obrigatório')
    } else if(!checkEmail(emailValue)){
        setErrorFor(email, "Por favor insira um email válido.");
    } else {
       setSuccessFor(email)
    }

    if(passwordValue === ""){
        
        setErrorFor(password,"A senha é obrigatória.");

    } else if(passwordValue.length < 7){
        setErrorFor(password, "A senha precisa ter mais de 7 caracteries.");
    } else{
        setSuccessFor(password)
    }

  }


  function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
     }



  
  function setSuccessFor(input){
   const formsControl = input.parentElement;
   

    // adc sucesso
    formsControl.classList.add('success')
    formsControl.classList.remove('error')

}




  function setErrorFor(input, message){
    const formsControl = input.parentElement;
    //const novoInput = formsControl.classList
    //novoInput.add('error')
    const small = formsControl.querySelector('small')

    // msg de erro
    small.innerText = message;
    //adc classe de erro
   formsControl.classList.add('error')

}


