import { createContext } from "react";
import { useCallback, useState, useEffect } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    name: null,
    login: () => {},
    logout: () => {}
})

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');

    const login = useCallback((uid, token, name) => {
      setToken(token);
      setUserId(uid);
      setName(name);

      

      localStorage.setItem('userData',JSON.stringify({
        userId: uid,
        name: name,
        token: token
      }));
    }, []);
  
    const logout = useCallback(() => {

      setToken(null);
      setUserId(null);
      setName(null);

      localStorage.removeItem('userData');
    },[]);
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if(storedData && storedData.token) {
        login(storedData.userId, storedData.token, storedData.name);
      }
    }, [login])
  
    return {token, login, logout, userId, name};
}

export default useAuth;