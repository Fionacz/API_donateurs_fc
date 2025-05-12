let donateurs = [
  {
    nom: "Chloé",
    genre: "female",
    photo: "IMG/femme2.jpg"
  },
  {
    nom: "Rachel",
    genre: "female",
    photo: "IMG/femme3.jpg"
  },
  {
    nom: "Marine",
    genre: "female",
    photo: "IMG/femme4.jpg"
  },
  {
    nom: "Abdel",
    genre: "male",
    photo: "IMG/homme2.jpg"
  },
  {
    nom: "Fatima",
    genre: "female",
    photo: "IMG/femme1.jpg"
  },
  {
    nom: "Bilel",
    genre: "male",
    photo: "IMG/homme3.jpg"
  },
  {
    nom: "Louise",
    genre: "female",
    photo: "IMG/femme5.jpg"
  },
  {
    nom: "Anthony",
    genre: "male",
    photo: "IMG/homme4.jpg"
  },
  {
    nom: "Paul",
    genre: "male",
    photo: "IMG/homme1.jpg"
  },
  {
    nom: "Yasmine",
    genre: "female",
    photo: "IMG/femme6.jpg"
  },
  {
    nom: "Jean",
    genre: "male",
    photo: "IMG/homme5.jpg"
  },
  {
    nom: "Luc",
    genre: "male",
    photo: "IMG/homme7.jpg"
  }
];

Promise.all(
  donateurs.map(donateur =>
    fetch('https://randomuser.me/api/?results=50') 
      .then(res => res.json())
      .then(data => {
        const user = data.results[0];
        donateur.montant = Math.floor(Math.random() * 200) + 1; 
        donateur.telephone = user.phone;
        donateur.adresse = `${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`; // Adresse complète
        return donateur;
      })
  )
).then(donateursAvecMontant => {
  donateurs = donateursAvecMontant;
  afficherDonateurs(donateurs);
});

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
  const totalDons = donateurs.reduce((acc, donateur) => acc + donateur.montant, 0);
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

