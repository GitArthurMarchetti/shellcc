// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
     id: number;
     name: string;
     email: string;
     token: string;
}

interface AuthContextType {
     user: User | null;
     loading: boolean;
     login: (token: string, userData: Omit<User, 'token'>) => void;
     logout: () => void;
     isAuthenticated: boolean;
}

interface AuthProviderProps {
     children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Configuração do axios
axios.defaults.baseURL = 'http://localhost:3000';

// Interceptor para adicionar o token em todas as requisições
axios.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
          config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
});

export function AuthProvider({ children }: AuthProviderProps) {
     const [user, setUser] = useState<User | null>(null);
     const [loading, setLoading] = useState(true);

     // Função para verificar se o token é válido
     const verifyToken = async (token: string) => {
          try {
               const response = await axios.get('/api/auth/verify', {
                    headers: { Authorization: `Bearer ${token}` }
               });
               return response.data;
          } catch (error) {
               return null;
          }
     };

     // Efeito para carregar o usuário do localStorage e verificar o token
     useEffect(() => {
          const loadUser = async () => {
               try {
                    const token = localStorage.getItem('token');
                    const savedUser = localStorage.getItem('user');

                    if (token && savedUser) {
                         // Verifica se o token ainda é válido
                         const isValid = await verifyToken(token);

                         if (isValid) {
                              setUser({ ...JSON.parse(savedUser), token });
                         } else {
                              // Se o token não for válido, limpa o localStorage
                              localStorage.removeItem('token');
                              localStorage.removeItem('user');
                         }
                    }
               } catch (error) {
                    console.error('Erro ao carregar usuário:', error);
               } finally {
                    setLoading(false);
               }
          };

          loadUser();
     }, []);

     const login = (token: string, userData: Omit<User, 'token'>) => {
          const userWithToken = { ...userData, token };
          setUser(userWithToken);
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));

          // Configura o token para todas as requisições futuras
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
     };

     const logout = () => {
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          delete axios.defaults.headers.common['Authorization'];
          window.location.href = '/login';
     };

     const value = {
          user,
          loading,
          login,
          logout,
          isAuthenticated: !!user
     };

     if (loading) {
          // Você pode criar um componente de loading personalizado
          return <div>Carregando...</div>;
     }

     return (
          <AuthContext.Provider value={value}>
               {children}
          </AuthContext.Provider>
     );
}

export function useAuth() {
     const context = useContext(AuthContext);
     if (context === null) {
          throw new Error('useAuth must be used within an AuthProvider');
     }
     return context;
}

