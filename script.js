document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".favorite-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.getElementById("message");
    const charCounter = document.getElementById("char-counter");
    const contactForm = document.getElementById("contact-form");

    messageInput.addEventListener("input", function () {
        charCounter.textContent = `${messageInput.value.length} / 500`;
    });

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;

        if (!email || !message) {
            alert("Email e messaggio sono obbligatori!");
            return;
        }

        const mailtoLink = `mailto:menti.geniali.project@gmail.com?subject=Richiesta di Contatto&body=Email: ${email}%0ATelefono: ${phone}%0AMessaggio: ${message}`;
        window.location.href = mailtoLink;
    });
});

document.getElementById("contact-form").addEventListener("submit", function(event) {

    let formData = new FormData(this);

    fetch("contatti.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.trim() === "success") {
            alert("Messaggio inviato con successo! 📩");
            document.getElementById("contact-form").reset(); // Pulisce il form
        } else {
            alert("Errore: " + data);
        }
    })
    .catch(error => {
        console.error("Errore nella richiesta:", error);
        alert("Errore nell'invio del messaggio.");
    });
});