// src/pages/criarSala.tsx
import { useState } from "react";
import { FaUserCog } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { CreateRoomData } from "../types/room";

interface InviteEmail {
    email: string;
    status: 'pending' | 'sent' | 'error';
}

export default function CriarSala() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [roomData, setRoomData] = useState<CreateRoomData>({
        title: '',
        description: '',
        colorTheme: '#7D51D2', // cor padrão inicial
        maxMembers: 20
    });

    const [inviteEmails, setInviteEmails] = useState<InviteEmail[]>([]);
    const [newEmail, setNewEmail] = useState('');

    const colorOptions = [
        { color: '#7D51D2', name: 'Roxo' },
        { color: '#FEB908', name: 'Amarelo' },
        { color: '#16A9FE', name: 'Azul' },
        { color: '#E24A61', name: 'Vermelho' },
        { color: '#01C875', name: 'Verde' },
        { color: '#131B49', name: 'Azul Escuro' }
    ];

    const handleColorSelect = (color: string) => {
        setRoomData(prev => ({ ...prev, colorTheme: color }));
    };

    const handleAddEmail = () => {
        if (newEmail && !inviteEmails.find(e => e.email === newEmail)) {
            setInviteEmails(prev => [...prev, { email: newEmail, status: 'pending' }]);
            setNewEmail('');
        }
    };

    const handleCreateRoom = async () => {
        try {
            setLoading(true);
            setError('');

            // Criar a sala
            const response = await axios.post('/api/rooms', roomData, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });

            const roomId = response.data.room.id;

            // Enviar convites
            await Promise.all(inviteEmails.map(async (invite) => {
                try {
                    await axios.post(`/api/rooms/${roomId}/invite`, {
                        email: invite.email
                    }, {
                        headers: { Authorization: `Bearer ${user?.token}` }
                    });

                    // Atualizar status do convite
                    setInviteEmails(prev =>
                        prev.map(e =>
                            e.email === invite.email
                                ? { ...e, status: 'sent' }
                                : e
                        )
                    );
                } catch (error) {
                    setInviteEmails(prev =>
                        prev.map(e =>
                            e.email === invite.email
                                ? { ...e, status: 'error' }
                                : e
                        )
                    );
                }
            }));

            navigate('/salas');
        } catch (error: any) {
            setError(error.response?.data?.error || 'Erro ao criar sala');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='fonthome bg-bgColor w-full min-h-screen text-primaryColor flex'>
            <div className="absolute top-3 left-3 cursor-pointer hover:scale-105 transition-all duration-300 text-red-600 hover:text-red-500">
                <FaXmark onClick={() => navigate('/salas')} size={50} />
            </div>

            <section className="flex flex-col w-4/5 mx-auto my-16">
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="flex flex-col w-1/3 gap-2 mx-auto">
                    <label className="text-2xl">Titulo da Sala</label>
                    <input
                        className="w-full p-2 outline-bgColor border-none text-black rounded-sm"
                        type="text"
                        value={roomData.title}
                        onChange={(e) => setRoomData(prev => ({ ...prev, title: e.target.value }))}
                        required
                    />
                </div>

                <div className="flex flex-col w-1/3 mt-3 gap-2 mx-auto">
                    <label className="text-2xl">Descrição (opcional)</label>
                    <input
                        className="w-full p-2 outline-bgColor border-none text-black rounded-sm"
                        type="text"
                        value={roomData.description}
                        onChange={(e) => setRoomData(prev => ({ ...prev, description: e.target.value }))}
                    />
                </div>

                <div className="flex flex-col justify-center mx-auto text-center mt-5 gap-2">
                    <p className="text-xl font-bold">Cor da Sala</p>
                    <div className="gap-2 flex">
                        {colorOptions.map(({ color, name }) => (
                            <button
                                key={color}
                                onClick={() => handleColorSelect(color)}
                                className={`w-10 rounded-md h-10 border-2 ${roomData.colorTheme === color
                                    ? 'border-white'
                                    : 'border-dashed border-gray-400'
                                    }`}
                                style={{ backgroundColor: color }}
                                title={name}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-1/3 mx-auto mt-5">
                    <label className="text-xl">Adicionar Colaboradores</label>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Email do colaborador"
                            className="flex-1 p-2 outline-bgColor border-none text-black rounded-sm"
                        />
                        <button
                            onClick={handleAddEmail}
                            className="bg-[#01C875] px-4 rounded-sm"
                        >
                            Adicionar
                        </button>
                    </div>

                    <div className="mt-4">
                        {inviteEmails.map((invite, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-2 bg-[#030345] mb-2"
                            >
                                <div className="flex gap-3 text-xl">
                                    <p>{invite.email}</p>
                                    <p>
                                        ({invite.status === 'pending'
                                            ? 'pendente'
                                            : invite.status === 'sent'
                                                ? 'enviado'
                                                : 'erro'})
                                    </p>
                                </div>
                                <FaUserCog color="#fff" size={24} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-1/3 mx-auto mt-5 flex justify-between">
                    <p className="text-3xl">Total colaboradores</p>
                    <div className="relative">
                        <button className="bg-[#FEB908] flex items-center text-xl p-2">
                            {inviteEmails.length}/20 <IoIosArrowDown />
                        </button>
                    </div>
                </div>

                <div className="w-full flex justify-end mt-8">
                    <button
                        onClick={handleCreateRoom}
                        disabled={loading || !roomData.title}
                        className="bg-[#FEB908] px-16 rounded-sm py-2 text-4xl disabled:opacity-50"
                    >
                        {loading ? 'Criando...' : 'Criar sala'}
                    </button>
                </div>
            </section>
        </main>
    );
}