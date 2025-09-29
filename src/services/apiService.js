import axios from "axios";
import { reactive } from "vue";
import { jwtDecode } from "jwt-decode";

const apiClient = axios.create({
    baseURL: 'http://localhost:5096/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

function getUserFromToken() {
    const token = localStorage.getItem('authToken');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return {
                id: decodedToken.nameid,
                email: decodedToken.email,
                name: decodedToken.name
            };
        } catch (error) {
            localStorage.removeItem('authToken');
            return null;
        }
    }
    return null;
}

export const authStore = reactive({
    isLoggedIn: !!localStorage.getItem('authToken'),
    user: getUserFromToken(),
    login(token) {
        localStorage.setItem('authToken', token);
        this.isLoggedIn = true;
        this.user = getUserFromToken();
    },
    logout() {
        localStorage.removeItem('authToken');
        this.isLoggedIn = false;
        this.user = null;
        window.location.href = '/';
    }
});

export const authService = {
    register(userData) {
        return apiClient.post('/Users', userData);
    },
    login(credentials) {
        return apiClient.post('/Users/login', credentials);
    }
};

export const rawgService = {
    getRandomGame() {
        return apiClient.get('/Rawg/random-game');
    },
    searchGames(query) {
        return apiClient.get(`/Rawg/search?query=${query}`);
    }
};

export const favoriteGamesService = {
    getMyList(pageNumber = 1, pageSize = 12) {
        return apiClient.get(`/FavoriteGames?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    },
    addFavorite(slug) {
        return apiClient.post('/FavoriteGames', { slug: slug });
    },
    deleteFavorite(gameId) {
        return apiClient.delete(`/FavoriteGames/${gameId}`);
    }
};

export const userService = {
    getPublicLists(pageNumber = 1, pageSize = 5) {
        return apiClient.get(`/Users/public-lists?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
};