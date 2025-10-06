import axios from "axios";

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

export const authService = {
    register(userData) {
        return apiClient.post('/Users/register', userData);
    },
    login(credentials) {
        return apiClient.post('/Users/login', credentials);
    },
    changePassword(passwordData){
        return apiClient.post('/Users/change-password', passwordData)
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
        return apiClient.delete(`/FavoriteGames/${ gameId }`);
    }
};

export const userService = {
    getPublicLists(pageNumber = 1, pageSize = 5) {
        return apiClient.get(`/Users/public-lists?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    },

    getUser(id){
        return apiClient.get(`Users/${id}`)
    },

    updateUser(id, userData){
        return apiClient.put(`/Users/${id}`, userData)
    }
};

export const annotationService = {
    create(annotationData){
        return apiClient.post('/Annotations', annotationData)
    },
    update(annotationId, annotationData){
        return apiClient.put(`/Annotations/${annotationId}`, annotationData)
    }
}