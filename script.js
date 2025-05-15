let donateurs = [];

// Appel à l'API randomuser.me pour récupérer des données aléatoires
fetch("https://randomuser.me/api/?results=50")
  .then(res => res.json()) 
  .then(data => {
    // Création d'un tableau de donateurs à partir des données reçues
    donateurs = data.results.map(user => ({
      nom: `${user.name.first} ${user.name.last}`,  
      genre: user.gender,  
      photo: user.picture.large,  
      telephone: user.phone,  
      adresse: `${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,  // Adresse du donateur
      montant: Math.floor(Math.random() * 300) + 1,  // Montant aléatoire entre 1 et 300 pour le don
      email: user.email  
    }));

    // Affichage des donateurs dans la page
    afficherDonateurs(donateurs);
  })
  .catch(err => console.error("Erreur API :", err));  // Gestion des erreurs lors de l'appel API

// Fonction pour afficher la liste des donateurs dans le DOM
function afficherDonateurs(liste) {
  const app = document.getElementById('app');  // Récupère l'élément où les donateurs seront affichés
  app.innerHTML = liste.map(d =>
    `<div class="donateur">
      <img src="${d.photo}" alt="${d.nom}">  <!-- Affichage de la photo du donateur -->
      <h2 class="default-color">
        <span class="prenom">${d.nom.split(' ')[0]}</span>  <!-- Affichage du prénom -->
        <span class="nom">${d.nom.split(' ')[1]}</span>  <!-- Affichage du nom -->
      </h2>
      <p><strong>📧 Email :</strong> <span class="email">${d.email}</span></p>  <!-- Affichage de l'email -->
      <span class="gender-pastille ${d.genre === 'male' ? 'male' : 'female'}"></span>  <!-- Pastille de genre (masculin ou féminin) -->
      <p><strong>📞 Téléphone :</strong> <span class="telephone">${d.telephone}</span></p>  <!-- Affichage du téléphone -->
      <p><strong>📍 Adresse :</strong> <span class="adresse">${d.adresse}</span></p>  <!-- Affichage de l'adresse -->
      <p><strong>Montant :</strong> <span style="color: red;">${d.montant} €</span></p>  <!-- Affichage du montant du don -->
    </div>`
  ).join('');  // Conversion du tableau d'éléments en HTML
}

// Fonction pour afficher le total des dons
function afficherTotalDons() {
  const totalDons = donateurs.reduce((acc, d) => acc + d.montant, 0);
  document.getElementById('totalMontant').innerText = totalDons;
}

// Fonction pour filtrer les donateurs par genre
function filtrerGenre(sexe) {
  const filtrés = donateurs.filter(d => d.genre === sexe);
  afficherDonateurs(filtrés);
}

// Fonction pour trier les donateurs par montant (ascendant ou descendant)
function trierMontant(order) {
  const triés = [...donateurs].sort((a, b) =>
    order === 'asc' ? a.montant - b.montant : b.montant - a.montant
  );
  afficherDonateurs(triés);
}

// Fonction pour trier les donateurs par nom (alphabétiquement)
function trierNom() {
  const triés = [...donateurs].sort((a, b) =>
    a.nom.localeCompare(b.nom)  
  );
  afficherDonateurs(triés);
}

// Fonction pour rechercher un donateur par nom
function rechercherDonateur() {
  const query = document.getElementById("searchInput").value.toLowerCase();  
  const resultat = donateurs.filter(d => d.nom.toLowerCase().includes(query));
  afficherDonateurs(resultat);
}

// Fonction pour activer ou désactiver le mode sombre
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");  
}
