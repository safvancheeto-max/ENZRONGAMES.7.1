const GAMES_DATA = [
    { id: 1, title: "Snake Neon", category: "Arcade", rating: 4.8, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400", path: "games/snake.js", featured: true },
    { id: 2, title: "Tic Tac Toe", category: "Puzzle", rating: 4.5, image: "https://images.unsplash.com/photo-1611996598517-380d6039537f?auto=format&fit=crop&q=80&w=400", path: "games/tictactoe.js" },
    { id: 3, title: "Memory Match", category: "Puzzle", rating: 4.6, image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&q=80&w=400", path: "games/memory.js" },
    { id: 4, title: "Cyber Flappy", category: "Arcade", rating: 4.7, image: "https://images.unsplash.com/photo-1542332606-b3d2b07e596b?auto=format&fit=crop&q=80&w=400", path: "games/flappy.js", featured: true },
    { id: 5, title: "Neon Racer", category: "Racing", rating: 4.9, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400", path: "games/arcade-bundle.js", featured: true },
    { id: 6, title: "Shooting Target", category: "Shooting", rating: 4.8, image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=400", path: "games/arcade-bundle.js", featured: true },
    { id: 7, title: "2048 Cyber", category: "Puzzle", rating: 4.7, image: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&q=80&w=400", path: "games/2048.js" },
    { id: 8, title: "Brick Breaker", category: "Arcade", rating: 4.6, image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=400", path: "games/bricks.js", featured: true },
    { id: 9, title: "Space Shooter", category: "Shooting", rating: 4.9, image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?auto=format&fit=crop&q=80&w=400", path: "games/arcade-bundle.js", featured: true },
    { id: 10, title: "Endless Runner", category: "Action", rating: 4.5, image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=400", path: "games/arcade-bundle.js" },
    { id: 11, title: "Reaction Test", category: "Action", rating: 4.3, image: "https://images.unsplash.com/photo-1518709332219-c0892095cc1d?auto=format&fit=crop&q=80&w=400", path: "games/reaction.js" },
    { id: 12, title: "Math Challenge", category: "Puzzle", rating: 4.4, image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400", path: "games/math.js" },
    { id: 13, title: "Puzzle Slider", category: "Puzzle", rating: 4.2, image: "https://images.unsplash.com/photo-1601987077677-5346c0c57d3f?auto=format&fit=crop&q=80&w=400", path: "games/slider.js" },
    { id: 14, title: "Color Match", category: "Puzzle", rating: 4.5, image: "https://images.unsplash.com/photo-1520110120835-c96a9efaf5fa?auto=format&fit=crop&q=80&w=400", path: "games/color.js" },
    { id: 15, title: "Tap Speed", category: "Action", rating: 4.1, image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400", path: "games/tap.js" },
    { id: 16, title: "Cyber Quiz", category: "Strategy", rating: 4.6, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400", path: "games/quiz.js" },
    { id: 17, title: "Word Scramble", category: "Puzzle", rating: 4.4, image: "https://images.unsplash.com/photo-1534423868127-d491588e7a0a?auto=format&fit=crop&q=80&w=400", path: "games/words.js" },
    { id: 18, title: "Hangman Neon", category: "Puzzle", rating: 4.3, image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400", path: "games/hangman.js" },
    { id: 19, title: "Connect 4", category: "Strategy", rating: 4.7, image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=400", path: "games/connect4.js" },
    { id: 20, title: "Platform Jump", category: "Action", rating: 4.8, image: "https://images.unsplash.com/photo-1517672651691-24622a91b550?auto=format&fit=crop&q=80&w=400", path: "games/arcade-bundle.js" },
    { id: 21, title: "Tower Stack", category: "Arcade", rating: 4.6, image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400", path: "games/stack.js", featured: true },
    { id: 22, title: "Rogue Dodge", category: "Action", rating: 4.5, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400", path: "games/dodge.js" },
    { id: 23, title: "Mine Sweeper", category: "Strategy", rating: 4.4, image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=400", path: "games/mines.js" },
    { id: 24, title: "Hex Match", category: "Puzzle", rating: 4.5, image: "https://images.unsplash.com/photo-1633519130740-4f59350df2c5?auto=format&fit=crop&q=80&w=400", path: "games/arcade-bundle.js" },
    { id: 25, title: "Fruit Slasher", category: "Action", rating: 4.7, image: "https://images.unsplash.com/photo-1542332606-b3d2b07e596b?auto=format&fit=crop&q=80&w=400", path: "games/arcade-bundle.js" },
    { id: 26, title: "Bowling Pro", category: "Arcade", rating: 4.2, image: "https://images.unsplash.com/photo-1534423868127-d491588e7a0a?auto=format&fit=crop&q=80&w=400", path: "games/arcade-bundle.js" },
    { id: 27, title: "Pinball Neon", category: "Arcade", rating: 4.8, image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=400", path: "games/arcade-bundle.js" },
    { id: 28, title: "Archery Hero", category: "Shooting", rating: 4.6, image: "https://images.unsplash.com/photo-1500462859233-0bb2449717e2?auto=format&fit=crop&q=80&w=400", path: "games/archery.js" },
    { id: 29, title: "Tank Wars", category: "Shooting", rating: 4.7, image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=400", path: "games/tanks.js", featured: true },
    { id: 30, title: "Retro Break", category: "Arcade", rating: 4.4, image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=400", path: "games/arcade-bundle.js" },
    { id: 31, title: "Sudoku Master", category: "Puzzle", rating: 4.7, image: "https://images.unsplash.com/photo-1633519130740-4f59350df2c5?auto=format&fit=crop&q=80&w=400", path: "games/sudoku.js" },
    { id: 32, title: "Ball Jump", category: "Action", rating: 4.3, image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=400", path: "games/arcade-bundle.js" }
];

function createGameCard(game) {
    const isInsidePages = window.location.pathname.includes('/pages/');
    const linkPrefix = isInsidePages ? '' : 'pages/';

    return `
        <div class="game-card glass" data-id="${game.id}">
            <div class="game-img-container">
                <img src="${game.image}" alt="${game.title}" class="game-img" loading="lazy">
            </div>
            <div class="game-overlay">
                <div class="game-info">
                    <span class="game-category">${game.category}</span>
                    <h3>${game.title}</h3>
                    <div class="game-meta">
                        <span class="rating"><i class="fas fa-star"></i> ${game.rating || '4.5'}</span>
                        <a href="${linkPrefix}game-template.html?id=${game.id}" class="btn btn-primary small">PLAY</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderFeaturedGames() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;

    const featured = GAMES_DATA.filter(g => g.featured);
    grid.innerHTML = featured.map(createGameCard).join('');
}

function renderAllGames(filter = 'All') {
    const grid = document.getElementById('games-grid-all');
    if (!grid) return;

    const filtered = filter === 'All'
        ? GAMES_DATA
        : GAMES_DATA.filter(g => g.category === filter);

    grid.innerHTML = filtered.map(createGameCard).join('');
}

// Export for other scripts
window.GAMES_DATA = GAMES_DATA;
window.renderFeaturedGames = renderFeaturedGames;
window.renderAllGames = renderAllGames;
