const IMG = (name) =>
  `https://via.placeholder.com/92x128?text=${encodeURIComponent(name)}`;

const animeList = [
  { title: "Attack on Titan", category: "Action", rating: 9.1, img: "images/aot.jpg" },
  { title: "Death Note", category: "Thriller", rating: 9.0, img: IMG("Death Note") },
  { title: "Fullmetal Alchemist: Brotherhood", category: "Action", rating: 9.1, img: IMG("FMAB") },
  { title: "Hunter x Hunter", category: "Action", rating: 9.0, img: IMG("HxH") },
  { title: "Steins;Gate", category: "Sci-Fi", rating: 9.1, img: IMG("Steins;Gate") },
  { title: "Code Geass", category: "Thriller", rating: 8.9, img: IMG("Code Geass") },
  { title: "Demon Slayer", category: "Action", rating: 8.7, img: IMG("Demon Slayer") },
  { title: "Jujutsu Kaisen", category: "Action", rating: 8.6, img: IMG("JJK") },
  { title: "Vinland Saga", category: "Drama", rating: 8.8, img: IMG("Vinland Saga") },
  { title: "Monster", category: "Thriller", rating: 9.0, img: IMG("Monster") },

  { title: "Naruto", category: "Action", rating: 8.4, img: IMG("Naruto") },
  { title: "Naruto Shippuden", category: "Action", rating: 8.7, img: IMG("Shippuden") },
  { title: "One Piece", category: "Action", rating: 9.0, img: IMG("One Piece") },
  { title: "Bleach", category: "Action", rating: 8.2, img: IMG("Bleach") },
  { title: "Dragon Ball Z", category: "Action", rating: 8.8, img: IMG("DBZ") },

  { title: "One Punch Man", category: "Comedy", rating: 8.7, img: IMG("OPM") },
  { title: "Mob Psycho 100", category: "Comedy", rating: 8.8, img: IMG("Mob Psycho") },
  { title: "Gintama", category: "Comedy", rating: 9.0, img: IMG("Gintama") },
  { title: "Spy x Family", category: "Comedy", rating: 8.5, img: IMG("Spy x Family") },

  { title: "Tokyo Ghoul", category: "Thriller", rating: 8.0, img: IMG("Tokyo Ghoul") },
  { title: "Parasyte", category: "Thriller", rating: 8.3, img: IMG("Parasyte") },
  { title: "The Promised Neverland", category: "Thriller", rating: 8.5, img: IMG("TPN") },
  { title: "Psycho-Pass", category: "Sci-Fi", rating: 8.4, img: IMG("Psycho-Pass") },

  { title: "Re:Zero", category: "Fantasy", rating: 8.2, img: IMG("Re:Zero") },
  { title: "Sword Art Online", category: "Fantasy", rating: 7.9, img: IMG("SAO") },
  { title: "No Game No Life", category: "Fantasy", rating: 8.1, img: IMG("NGNL") },
  { title: "Overlord", category: "Fantasy", rating: 8.0, img: IMG("Overlord") },

  { title: "Your Lie in April", category: "Drama", rating: 8.6, img: IMG("YLIA") },
  { title: "Clannad After Story", category: "Drama", rating: 8.9, img: IMG("Clannad AS") },
  { title: "Anohana", category: "Drama", rating: 8.5, img: IMG("Anohana") },

  { title: "Haikyuu!!", category: "Sports", rating: 8.7, img: IMG("Haikyuu") },
  { title: "Blue Lock", category: "Sports", rating: 8.3, img: IMG("Blue Lock") },

  { title: "Cyberpunk: Edgerunners", category: "Sci-Fi", rating: 8.6, img: IMG("Edgerunners") },
  { title: "Akira", category: "Sci-Fi", rating: 8.0, img: IMG("Akira") },
  { title: "Neon Genesis Evangelion", category: "Sci-Fi", rating: 8.5, img: IMG("NGE") },

  { title: "Black Clover", category: "Action", rating: 8.1, img: IMG("Black Clover") },
  { title: "Chainsaw Man", category: "Action", rating: 8.6, img: IMG("Chainsaw Man") },
  { title: "Fire Force", category: "Action", rating: 7.7, img: IMG("Fire Force") },


  { title: "Fruits Basket", category: "Melodrama", rating: 8.6, img: IMG("Fruits Basket") },
  { title: "Violet Evergarden", category: "Melodrama", rating: 8.7, img: IMG("Violet Evergarden") },
  { title: "Toradora!", category: "Melodrama", rating: 8.1, img: IMG("Toradora") },
  { title: "Nana", category: "Melodrama", rating: 8.5, img: IMG("Nana") },
  { title: "Orange", category: "Melodrama", rating: 7.7, img: IMG("Orange") },
  { title: "I Want to Eat Your Pancreas", category: "Melodrama", rating: 8.6, img: IMG("Pancreas") },
  { title: "A Silent Voice", category: "Melodrama", rating: 8.9, img: IMG("Silent Voice") },
  { title: "Your Name", category: "Melodrama", rating: 8.8, img: IMG("Your Name") },
];


let currentCategory = "All";

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const sort = document.getElementById("sort");
const chips = document.querySelectorAll(".chip");

function render() {
  const q = search.value.trim().toLowerCase();

  let filtered = animeList.filter(a => {
    const matchCategory = (currentCategory === "All") || (a.category === currentCategory);
    const matchSearch = a.title.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  const sortMode = sort.value;
  filtered.sort((a,b) => {
    if (sortMode === "rating_desc") return b.rating - a.rating;
    if (sortMode === "rating_asc") return a.rating - b.rating;
    if (sortMode === "az") return a.title.localeCompare(b.title);
    if (sortMode === "za") return b.title.localeCompare(a.title);
    return 0;
  });

 grid.innerHTML = filtered.map(a => `
  <div class="card">
    <img class="poster" src="${a.img}" alt="${a.title}">
    <div class="overlay">
      <div class="name">${a.title}</div>
      <div class="info">
        <span class="tag">${a.category}</span>
        <span class="star">⭐ ${a.rating.toFixed(1)}</span>
      </div>
    </div>
  </div>
`).join("");

}

chips.forEach(btn => {
  btn.addEventListener("click", () => {
    chips.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.cat;
    render();
  });
});

search.addEventListener("input", render);
sort.addEventListener("change", render);

render();
