let donateurs = [];

fetch("https://randomuser.me/api/?results=50")
  .then(res => res.json())
  .then(data => {
    donateurs = data.results.map(user => ({
      nom: `${user.name.first} ${user.name.last}`,  
      genre: user.gender,
      photo: user.picture.large,
      telephone: user.phone,
      adresse: `${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
      montant: Math.floor(Math.random() * 200) + 1,
      email: user.email  
    }));

    afficherDonateurs(donateurs);
  })
  .catch(err => console.error("Erreur API :", err));

function afficherDonateurs(liste) {
  const app = document.getElementById('app');
  app.innerHTML = liste.map(d =>
    `<div class="donateur">
      <img src="${d.photo}" alt="${d.nom}">
      <h2 class="default-color">
        <span class="prenom">${d.nom.split(' ')[0]}</span> 
        <span class="nom">${d.nom.split(' ')[1]}</span>
      </h2>
      <p><strong>📧 Email :</strong> <span class="email">${d.email}</span></p>
      <span class="gender-pastille ${d.genre === 'male' ? 'male' : 'female'}"></span>
      <p><strong>📞 Téléphone :</strong> <span class="telephone">${d.telephone}</span></p> <!-- Ajout de la classe 'telephone' -->
      <p><strong>📍 Adresse :</strong> <span class="adresse">${d.adresse}</span></p> <!-- Ajout de la classe 'adresse' -->
      <p><strong>Montant :</strong> <span style="color: red;">${d.montant} €</span></p>
    </div>`
  ).join('');
}


function afficherTotalDons() {
  const totalDons = donateurs.reduce((acc, d) => acc + d.montant, 0);
  document.getElementById('totalMontant').innerText = totalDons;
}

function filtrerGenre(sexe) {
  const filtrés = donateurs.filter(d => d.genre === sexe);
  afficherDonateurs(filtrés);
}

function trierMontant(order) {
  const triés = [...donateurs].sort((a, b) =>
    order === 'asc' ? a.montant - b.montant : b.montant - a.montant
  );
  afficherDonateurs(triés);
}

function trierNom() {
  const triés = [...donateurs].sort((a, b) =>
    a.nom.localeCompare(b.nom)
  );
  afficherDonateurs(triés);
}

function rechercherDonateur() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const resultat = donateurs.filter(d => d.nom.toLowerCase().includes(query));
  afficherDonateurs(resultat);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
