let donateurs = [];

fetch("https://randomuser.me/api/?results=50")
  .then(res => res.json())
  .then(data => {
    donateurs = data.results.map(user => ({
      nom: user.name.first,
      genre: user.gender,
      photo: user.picture.large,
      telephone: user.phone,
      adresse: `${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
      montant: Math.floor(Math.random() * 200) + 1
    }));

    afficherDonateurs(donateurs);
  })
  .catch(err => console.error("Erreur API :", err));

function afficherDonateurs(liste) {
  const app = document.getElementById('app');
  app.innerHTML = liste.map(d =>
    `<div class="donateur">
      <img src="${d.photo}" alt="${d.nom}">
      <h2 style="color: blue">${d.nom}</h2> 
      <p><strong>Genre :</strong> ${d.genre === 'male' ? 'Homme' : 'Femme'}</p>
      <p><strong>📞 Téléphone :</strong> ${d.telephone}</p> 
      <p><strong>📍 Adresse :</strong> ${d.adresse}</p> 
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
