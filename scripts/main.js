if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("registrado o service work", reg);
      })
      .catch((erro) => {
        console.log("deu merda", erro);
      });
  });
}
