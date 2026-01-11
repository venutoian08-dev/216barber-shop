document.getElementById("bookingForm").addEventListener("submit", async e => {
    e.preventDefault();
  
    const nome = document.getElementById("nome").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servizio = document.getElementById("servizio").value;
    const barbiere = document.getElementById("barbiere").value;
    const data = document.getElementById("data").value;
  
    // regex controlli
    const nomeRegex = /^[A-Za-zÀ-ÿ\s]{2,}$/;
    const telRegex = /^(\+39)?\s?3\d{8,9}$/;
  
    if(!nomeRegex.test(nome)){
      alert("Nome non valido");
      return;
    }
  
    if(!telRegex.test(telefono)){
      alert("Numero di telefono non valido");
      return;
    }
  
    // blocco orari
    const ora = new Date(data).getHours();
    if (ora < 9 || ora >= 19) {
      alert("Orario non disponibile");
      return;
    }
  
    const payload = {
      nome,
      telefono,
      servizio,
      barbiere,
      inizio: data,
      fine: new Date(new Date(data).getTime() + 30*60000)
    };
  
    await fetch("URL_APP_SCRIPT", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  
    alert("Prenotazione confermata 💈\nRiceverai un promemoria prima del taglio.");
    e.target.reset();
  });
  