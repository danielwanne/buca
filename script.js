// Dados de exemplo para jogos
const gameData = [
    {
        id: 1,
        title: "Horizon Forbidden West",
        genre: "Ação/Aventura",
        rating: 4.8,
        price: "R$ 299,90",
        image: "https://via.placeholder.com/250x170"
    },
    {
        id: 2,
        title: "FIFA 25",
        genre: "Esportes",
        rating: 4.5,
        price: "R$ 249,90",
        image: "https://via.placeholder.com/250x170"
    },
    {
        id: 3,
        title: "Elden Ring",
        genre: "RPG",
        rating: 4.9,
        price: "R$ 279,90",
        image: "https://via.placeholder.com/250x170"
    },
    {
        id: 4,
        title: "Call of Duty: Modern Warfare",
        genre: "Ação/Tiro",
        rating: 4.7,
        price: "R$ 269,90",
        image: "https://via.placeholder.com/250x170"
    },
    {
        id: 5,
        title: "The Sims 5",
        genre: "Simulação",
        rating: 4.6,
        price: "R$ 199,90",
        image: "https://via.placeholder.com/250x170"
    },
    {
        id: 6,
        title: "Civilization VII",
        genre: "Estratégia",
        rating: 4.8,
        price: "R$ 189,90",
        image: "https://via.placeholder.com/250x170"
    },
    {
        id: 7,
        title: "God of War: Ragnarok",
        genre: "Ação/Aventura",
        rating: 4.9,
        price: "R$ 329,90",
        image: "https://via.placeholder.com/250x170"
    },
    {
        id: 8,
        title: "Cyberpunk 2077: Ultimate Edition",
        genre: "RPG",
        rating: 4.7,
        price: "R$ 259,90",
        image: "https://via.placeholder.com/250x170"
    }
];

const highlightData = [
    {
        id: 101,
        title: "Assassin's Creed Infinity",
        genre: "Ação/Aventura",
        rating: 4.9,
        price: "R$ 349,90",
        image: "https://via.placeholder.com/250x170"
    },
    {
        id: 102,
        title: "Grand Theft Auto VI",
        genre: "Ação/Aventura",
        rating: 5.0,
        price: "R$ 399,90",
        image: "https://via.placeholder.com/250x170"
    },
    {
        id: 103,
        title: "The Legend of Zelda: Echoes of Wisdom",
        genre: "Aventura",
        rating: 4.9,
        price: "R$ 299,90",
        image: "https://via.placeholder.com/250x170"
    },
    {
        id: 104,
        title: "Half-Life 3",
        genre: "Ação/Tiro",
        rating: 4.8,
        price: "R$ 349,90",
        image: "https://via.placeholder.com/250x170"
    }
];

// Função para criar cartões de jogos
function createGameCard(game) {
    return `
        <div class="game-card">
            <img src="${game.image}" alt="${game.title}" class="game-image">
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-genre">${game.genre}</p>
                <div class="game-rating">
                    <span class="stars">★★★★★</span>
                    <span>(${game.rating})</span>
                </div>
                <p class="game-price">${game.price}</p>
            </div>
        </div>
    `;
}

// Função para renderizar jogos
function renderGames(games, containerId) {
    const container = document.getElementById(containerId);
    let html = '';
    
    games.forEach(game => {
        html += createGameCard(game);
    });
    
    container.innerHTML = html;
}

// Função para filtrar jogos APENAS pelo nome
function filterGames(keyword) {
    if (!keyword) {
        return gameData;
    }
    
    keyword = keyword.toLowerCase();
    return gameData.filter(game => 
        game.title.toLowerCase().includes(keyword)
    );
}

// Inicializar a página
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar jogos populares
    renderGames(gameData, 'gamesGrid');
    
    // Renderizar destaques
    renderGames(highlightData, 'highlightGrid');
    
    // Adicionar funcionalidade de busca
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    function performSearch() {
        const keyword = searchInput.value.trim();
        const filteredGames = filterGames(keyword);
        
        // Mostrar indicador de carregamento
        document.getElementById('loading').style.display = 'block';
        document.getElementById('gamesGrid').style.display = 'none';
        
        // Simular carregamento
        setTimeout(() => {
            renderGames(filteredGames, 'gamesGrid');
            document.getElementById('loading').style.display = 'none';
            document.getElementById('gamesGrid').style.display = 'grid';
        }, 500);
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Adicionar funcionalidade às categorias
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('click', function() {
            // Remover classe ativa de todas as categorias
            categories.forEach(c => c.classList.remove('active'));
            
            // Adicionar classe ativa à categoria clicada
            this.classList.add('active');
            
            // Filtrar jogos por categoria
            const categoryName = this.textContent;
            
            if (categoryName === 'Todos') {
                renderGames(gameData, 'gamesGrid');
            } else {
                const filteredGames = gameData.filter(game => 
                    game.genre.includes(categoryName)
                );
                renderGames(filteredGames, 'gamesGrid');
            }
        });
    });
});