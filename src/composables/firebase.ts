import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { useAuth } from '@vueuse/firebase/useAuth'
const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCk6gp4cxuhDaOFVWMq58dIaDalwbJGOSQ";
const FIREBASE_DOMAIN = import.meta.env.VITE_FIREBASE_DOMAIN || "sndjoy-development.firebaseapp.com";
const app = initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_DOMAIN
})
const auth = getAuth(app);
const { isAuthenticated, user } = useAuth(auth)
export function useFirebaseAuth() {
    return { isAuthenticated, user, auth, app };
}