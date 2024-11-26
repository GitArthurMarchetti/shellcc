// src/pages/signin.tsx
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GiTurtle } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface SignupForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export function Signin() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState<SignupForm>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validações
        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        if (formData.password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('/api/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            login(response.data.token, response.data.user);
            navigate('/salas');
        } catch (error: any) {
            setError(error.response?.data?.error || 'Erro ao criar conta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="fonthome bg-bgColor h-[100vh] text-primaryColor">
            <section className="flex w-11/12 m-auto justify-center items-center h-full">
                <div className="w-1/4 m-auto flex flex-col justify-center">
                    <div className="bg-[#FFB800] w-[150px] m-auto relative flex justify-center h-[150px] items-center rounded-full">
                        <GiTurtle size={100} />
                        <FaPlus size={40} className="absolute top-3 right-[20px]" />
                    </div>
                    <div className="flex flex-col">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500 text-red-500 p-2 rounded">
                                    {error}
                                </div>
                            )}

                            <label className="mt-1 text-2xl" htmlFor="name">Nome</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 bg-transparent focus:outline-none borda-input w-full px-2 py-2 rounded-sm"
                                required
                                minLength={3}
                            />

                            <label className="mt-1 text-2xl" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 bg-transparent focus:outline-none borda-input w-full px-2 py-2 rounded-sm"
                                required
                            />

                            <label className="mt-1 text-2xl" htmlFor="password">Senha</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 bg-transparent focus:outline-none borda-input w-full px-2 py-2 rounded-sm"
                                required
                                minLength={6}
                            />

                            <label className="mt-1 text-2xl" htmlFor="confirmPassword">Confirmar Senha</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-1 bg-transparent focus:outline-none borda-input w-full px-2 py-2 rounded-sm"
                                required
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#FFB800] duration-500 mt-5 w-3/4 text-2xl font-semibold py-4 rounded-xl m-auto hover:bg-[#FFB869] font-sans text-[#fff] disabled:opacity-50"
                            >
                                {loading ? 'Cadastrando...' : 'Cadastrar'}
                            </button>
                        </form>

                        <div className="flex flex-col justify-center items-center mt-3 gap-2">
                            <p>ou</p>
                            <div className="bg-primaryColor p-2 rounded-full cursor-pointer">
                                <FcGoogle size={30} color="black" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lado direito - mantido como está */}
                <div className="flex border-solid border-[#191d41] shadow-sm shadow-white rounded-3xl flex-col text-center justify-between p-7 h-3/4 border-4 w-1/3 m-auto">
                    <div className="flex flex-col">
                        <p className="text-xl">
                            <b>Seja Bem-Vindo</b>
                        </p>
                        <h1 className="fontTitle text-8xl text-[#0CC17A]">
                            Shellcc
                        </h1>
                        <p className="w-3/4 m-auto text-right">
                            <br />A Shellcc auxilia na administração de ativos e no desenvolvimento do seu negócio. Com foco em maximizar valores, oferecemos suporte estratégico e personalizado para impulsionar seu sucesso.
                        </p>
                    </div>
                    <div>
                        <p className="text-lg mb-2">Já Possui uma Conta?</p>
                        <button
                            className="text-2xl bg-[#0CC17A] font-semibold p-4 rounded-xl px-20 text-[#fff] font-sans"
                            onClick={() => navigate("/login")}
                        >
                            Entrar
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}