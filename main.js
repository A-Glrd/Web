/*

  Sources

  https://www.w3schools.com/html/html5_webstorage.asp
  https://www.alsacreations.com/article/lire/1402-web-storage-localstorage-sessionstorage.html
  https://developer.mozilla.org/fr/docs/Web/API/Storage/
  https://www.geeksforgeeks.org/map-in-javascript/
  https://ionicons.com/usage
  https://stackoverflow.com/questions/38748298/remove-array-item-from-localstorage

*/

// Mon panier

let panier = document.querySelectorAll(".add-cart");

// Mes articles

let article = [
  {
    nom: "Stephane L Ane",
    tag: "ane",
    prix: 15,
    qte: 0
  },
  {
    nom: "Perceval Le Cheval",
    tag: "cheval",
    prix: 15,
    qte: 0
  },
  {
    nom: "Thomas Le Quokka",
    tag: "quokka",
    prix: 20,
    qte: 0
  },
  {
    nom: "Jacques Le Macaque",
    tag: "macaque",
    prix: 25,
    qte: 0
  }
];

// Ev.L sur le click

for (let i = 0; i < panier.length; i++) {
  panier[i].addEventListener("click", () => {
    // console.log("test click");
    // nbrarticleDansPanier();
    nbrarticleDansPanier(article[i]);
    prixTotalPanier(article[i]);
  });
}

// Fonction pour garder les articles dans le panier au chargement

function stockArticleOnLoad() {
  let qteArticle = localStorage.getItem("qteArticle");

  if (qteArticle) {
    document.querySelector(".shop span").textContent = qteArticle;
  }
}

// Mes articles dans le panier

function nbrarticleDansPanier(article) {
  // console.log("Mon article => ", article);

  let qteArticle = localStorage.getItem("qteArticle");
  // console.log(qteArticle);
  // console.log(typeof qteArticle);
  qteArticle = parseInt(qteArticle);
  //console.log(typeof qteArticle);

  // update du panier (span)

  if (qteArticle) {
    localStorage.setItem("qteArticle", qteArticle + 1);
    document.querySelector(".shop span").textContent = qteArticle + 1;
  } else {
    localStorage.setItem("qteArticle", 1);
    document.querySelector(".shop span").textContent = 1;
  }
  setArticle(article);
}

// Ajouter mes articles

function setArticle(article) {
  let articleDansPanier = localStorage.getItem("articleDansPanier");
  // obj JS en sortie dans la console
  articleDansPanier = JSON.parse(articleDansPanier);
  // console.log("Mon article actuel=>", articleDansPanier);

  // J'aimerais actualiser mon panier pour CHAQUE animal ajouter dans le panier :)
  // Obligé de rajouter une 2ème condition lors de la sélection d'un autre animal
  if (articleDansPanier != null) {
    // 2ème IF !
    // console.log(articleDansPanier);
    if (articleDansPanier[article.tag] == undefined) {
      articleDansPanier = {
        ...articleDansPanier,
        [article.tag]: article
      };
    }
    // J'update ma quantité
    articleDansPanier[article.tag].qte += 1;
  } else {
    article.qte = 1;
    articleDansPanier = {
      [article.tag]: article
    };
  }
  // J'update un objet JS en format JSON dans mon localStorage
  localStorage.setItem("articleDansPanier", JSON.stringify(articleDansPanier));
}

// Prix total des articles dans mon panier

function prixTotalPanier(article) {
  let prixDuPanier = localStorage.getItem("totalPanier");

  // console.log("Prix de l'article dans mon panier", prixDuPanier);
  // console.log(typeof prixDuPanier);

  if (prixDuPanier != null) {
    // On met le parse dans la boucle sinon la Value du LS vaut NaN
    prixDuPanier = parseInt(prixDuPanier);
    localStorage.setItem("totalPanier", prixDuPanier + article.prix);
  } else {
    localStorage.setItem("totalPanier", article.prix);
  }
}

// Afficher les éléments de mon panier

function affichePanier() {

  // Mon bloc : Article dans le panier
  let articleDansPanier = localStorage.getItem("articleDansPanier");
  articleDansPanier = JSON.parse(articleDansPanier);
  // console.log(articleDansPanier);

  let articleShop = document.querySelector(".articles");
  // console.log(articleDansPanier);

  let prixDuPanier = localStorage.getItem("totalPanier");
  // console.log(prixDuPanier);

  if (articleDansPanier && articleShop) {
    articleShop.innerHTML = "";

    // Je map sur articleDansPanier pour récupérér chaque élément
    // Ajout d'icone +/- pour les quantités et ... le total
    Object.values(articleDansPanier).map(item => {
      articleShop.innerHTML += `
            <div class="article">
                <img src="./image/${item.tag}.jpg">
                <span>${item.nom}</span>
            </div>
            <div class="prix">${item.prix}€</div>
                <div class="qte">
                <ion-icon class="diminue" name="remove-circle-outline"></ion-icon>
                <span>${item.qte}</span>
                <ion-icon class="augmente" name="add-circle-outline"></ion-icon>
            </div>
            <div class="total">
                ${item.qte * item.prix},00€
            </div>
            `;
    });
    articleShop.innerHTML += `
            <div class="containerDeMonPanier">
            <ion-icon name="trash-outline" onclick='window.location.reload(false)'></ion-icon>
                <h4 class="titreTotalPanier>
                    Total dans le panier
                </h4>
                <h4 class="totalPanier">
                    ${prixDuPanier}€
                </h4>
        `;
  }
 supArticle();
 qtePanier();
}

// Supprimer un élément du panier
// Selon mes références, il serait plus judicieux d'écraser mes articles du LS avec un setItem
// Cependant je n'y arrive pas, du coup .... Cette fonction permet de reset le panier au complet
// Et recharge la page automatiquement.

function supArticle() {

  let supArticle = document.querySelectorAll('.containerDeMonPanier ion-icon');
  let nomArt;

// Mon bloc : Article dans le panier
  let articleDansPanier = localStorage.getItem("articleDansPanier");
  articleDansPanier = JSON.parse(articleDansPanier);
  console.log(articleDansPanier);
  
  
   for (let i = 0; i < supArticle.length; i++) {
    supArticle[i].addEventListener('click', () => {
     // .trim().toLowerCase().replace(/ /g, '')
      nomArt = supArticle[i].parentElement.textContent;
      console.log(nomArt);

      localStorage.removeItem('articleDansPanier');
      localStorage.removeItem('qteArticle');
      localStorage.removeItem('totalPanier');

      // Tentative de delete ... 
      // delete articleDansPanier[nomArt];
      // localStorage.setItem('articleDansPanier', JSON.stringify(articleDansPanier));

      // affichePanier();
      stockArticleOnLoad();
    });
    
  }
}

function qtePanier(){
  
  let augmentePanier = document.querySelectorAll('.augmente') ;
  let diminuePanier = document.querySelectorAll('.diminue');

  let qteCurrent = 0;
  let artCurrent = "";

  // Mon bloc : Article dans le panier
  let articleDansPanier = localStorage.getItem("articleDansPanier");
  articleDansPanier = JSON.parse(articleDansPanier);
  console.log(articleDansPanier); 

  for (let i = 0; i < augmentePanier.length; i++) {
    augmentePanier[i].addEventListener('click', () => {
      qteCurrent = augmentePanier[i].parentElement.querySelector('span').textContent;
      console.log(qteCurrent);
      console.log("J'augmente");
      artCurrent = augmentePanier[i].parentElement.nextElementSibling
    });
  }

  for (let i = 0; i < diminuePanier.length; i++) {
    diminuePanier[i].addEventListener('click', () => {
      qteCurrent = diminuePanier[i].parentElement.querySelector('span').textContent;
      console.log(qteCurrent);
      console.log("Je diminue...");

      // j'aimerais que le nom corresponde au tag de mon animal..
      artCurrent = augmentePanier[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent;
      console.log(artCurrent);
      
      articleDansPanier[artCurrent].qte -= 1;
      localStorage.setItem('articleDansPanier', JSON.stringify(articleDansPanier));
      affichePanier();
    });
    
  }
}

// On call stockArticleOnLoad et affichePanier
stockArticleOnLoad();
affichePanier();
