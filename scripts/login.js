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