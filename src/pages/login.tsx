
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GiTurtle } from "react-icons/gi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import axios from "axios";
import { LoginFormData, LoginResponse } from "@/types/auth";


function Login() {
    const [mostra, setMostra] = useState(true);
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post<LoginResponse>('/api/auth/login', formData);

            login(response.data.token, response.data.user);
            navigate('/salas');
        } catch (error: any) {
            setError(error.response?.data?.error || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };


    return (
        <main className="fonthome bg-bgColor h-[100vh] text-primaryColor">
            <section className="flex w-11/12 m-auto justify-center items-center h-full">
                <div className="flex border-solid border-[#191d41] shadow-sm shadow-white rounded-3xl flex-col text-center justify-between p-7 h-3/4 border-4 w-1/3 m-auto">
                    {/* Lado esquerdo - mantido como está */}
                    <div className="flex flex-col">
                        <p className="text-xl">
                            <b>Seja Bem-Vindo</b>
                        </p>
                        <h1 className="fontTitle text-8xl text-[#FFB800]">
                            Shellcc
                        </h1>
                        <p className="w-3/4 m-auto text-left">
                            <br />A Shellcc auxilia na administração de ativos e no desenvolvimento do seu negócio. Com foco em maximizar valores, oferecemos suporte estratégico e personalizado para impulsionar seu sucesso.
                        </p>
                    </div>
                    <div>
                        <p className="text-lg mb-2">Ainda não possui conta?</p>
                        <button
                            className="text-2xl bg-[#FFB800] font-semibold p-4 rounded-xl px-20 text-[#fff] font-sans"
                            onClick={() => navigate("/signin")}
                        >
                            Criar conta
                        </button>
                    </div>
                </div>
                <div className="w-[30%] m-auto flex flex-col justify-center">
                    <div className="bg-[#0CC17A] w-[150px] m-auto flex justify-center h-[150px] items-center rounded-full mb-4">
                        <GiTurtle size={100} />
                    </div>
                    <div className="flex flex-col">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500 text-red-500 p-2 rounded">
                                    {error}
                                </div>
                            )}

                            <label className="text-2xl" htmlFor="email">Email</label>
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
                            <div className="mt-1 w-full flex flex-row justify-center align-middle borda-input rounded-sm pr-2 items-center">
                                <input
                                    type={mostra ? 'password' : 'text'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-2 py-2 rounded-md bg-transparent focus:outline-none"
                                    required
                                />
                                {mostra ? (
                                    <IoEyeOff className="border-input-olho cursor-pointer" size={25} onClick={() => setMostra(false)} />
                                ) : (
                                    <IoEye className="border-input-olho cursor-pointer" size={25} onClick={() => setMostra(true)} />
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#0CC17A] w-3/4 text-2xl font-semibold py-4 rounded-xl m-auto duration-500 hover:bg-green-300 font-sans text-[#fff] disabled:opacity-50"
                            >
                                {loading ? 'Entrando...' : 'Entrar'}
                            </button>
                        </form>

                        <div className="flex flex-col justify-center items-center mt-3 gap-2">
                            <p className="text-[20px] p-2">ou</p>
                            <div className="bg-primaryColor p-2 rounded-full cursor-pointer">
                                <FcGoogle size={30} color="black" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export { Login };