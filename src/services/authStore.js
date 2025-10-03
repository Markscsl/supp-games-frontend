import { reactive } from "vue";
import { jwtDecode } from "jwt-decode";

function getUserFromToken() {
    const token = localStorage.getItem('authToken');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);

            return {
                id: decodedToken.nameid,
                email: decodedToken.email,
                name: decodedToken.unique_name
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