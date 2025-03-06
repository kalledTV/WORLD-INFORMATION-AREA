/*██████ RICERCA E CARD ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/


// Array di matematici e le loro informazioni
const mathematicians = [
    { name: "Pitagora", image: "Img/card/pitagora.jpg" },
    { name: "Euclide", image: "Img/card/pitagora.jpg" },
    { name: "Archimede", image: "Img/card/pitagora.jpg" },
    { name: "Pitagora", image: "Img/card/pitagora.jpg" },
    { name: "Euclide", image: "Img/card/pitagora.jpg" },
    { name: "Archimede", image: "Img/card/pitagora.jpg" },
];

// Funzione per mostrare le card dei matematici
function showMathematicians(filteredMathematicians) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = ''; // Pulisce il contenitore

    filteredMathematicians.forEach(mathematician => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-name', mathematician.name); // Aggiungi un attributo personalizzato

        card.innerHTML = `
            <a href="Page/${mathematician.name.toLowerCase()}.html">
                <img src="${mathematician.image}" alt="${mathematician.name}">
            </a>
            <div class="container">
                <div class="math-name"><b>${mathematician.name}</b>
                    <button class="favorite-btn">
                        <svg class="star-icon" viewBox="0 0 24 24">
                            <path d="M12 2 L14.9 8.6 L22 9.2 L16.8 13.8 L18.3 21 L12 17.5 L5.7 21 L7.2 13.8 L2 9.2 L9.1 8.6 Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    // Aggiungi event listener ai nuovi pulsanti dei preferiti
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', toggleFavorite);
    });
}

// Funzione di ricerca migliorata
function searchMathematician() {
    const query = document.getElementById('searchInput').value.toLowerCase();

    if (query === "") {
        // Se la ricerca è vuota, mostra tutti i matematici
        showMathematicians(mathematicians);
    } else {
        // Filtra e mostra solo i matematici che contengono il nome cercato
        const filteredMathematicians = mathematicians.filter(mathematician =>
            mathematician.name.toLowerCase().includes(query)
        );
        showMathematicians(filteredMathematicians);
    }
}

// Funzione per gestire il click sul pulsante dei preferiti
function toggleFavorite(event) {
    const button = event.currentTarget;
    const card = button.closest('.card');
    const starIcon = button.querySelector('.star-icon');

    button.classList.toggle('active'); // Aggiunge o rimuove la classe 'active'

    if (button.classList.contains('active')) {
        // Se il pulsante è attivo, cambia il colore dello stendardo e della stella
        starIcon.style.fill = 'black';
    } else {
        // Se il pulsante non è attivo, ripristina i colori originali
        starIcon.style.fill = 'white';
    }
}

// Mostra tutte le card all'inizio, dopo che il DOM è pronto
document.addEventListener("DOMContentLoaded", function () {
    showMathematicians(mathematicians);
});

/*██████ contattaci ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

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