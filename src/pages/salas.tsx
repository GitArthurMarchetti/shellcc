// src/pages/salas.tsx
import { useEffect, useState } from 'react';
import { CardSalas, SalasLado } from '@/components/salas';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { CiCirclePlus } from 'react-icons/ci';
import { GrGroup } from "react-icons/gr";
import { useAuth } from '../contexts/AuthContext';
import { Room } from '../types/room';
import axios from 'axios';

function Salas() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [modal, setModal] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('/api/rooms', {
                    headers: { Authorization: `Bearer ${user?.token}` }
                });
                setRooms(response.data);
            } catch (error: any) {
                setError(error.response?.data?.error || 'Erro ao carregar salas');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [user]);

    const handleRoomClick = (roomId: number) => {
        navigate(`/dashboard/${roomId}`);  // Atualizado para incluir roomId na navegação
    };

    if (loading) {
        return (
            <div className="fonthome bg-bgColor w-full min-h-screen text-primaryColor flex items-center justify-center">
                <p className="text-2xl">Carregando salas...</p>
            </div>
        );
    }

    return (
        <>
            {/* Modal content */}
            {modal && (
                <div className='absolute w-full z-10 h-full bg-fundoModal'>
                    <div className='relative w-96 gap-3 flex flex-col justify-center top-[40%] p-4 items-center m-auto bg-bgColor text-white text-2xl'>
                        <div
                            onClick={() => navigate('/criarSala')}
                            className='cursor-pointer w-full flex items-center justify-between'
                        >
                            <p>Criar uma Sala</p>
                            <CiCirclePlus size={30} />
                        </div>
                        <div className='border-solid border border-b-white w-full'></div>
                        <div className='w-full flex cursor-pointer items-center justify-between'>
                            <p>Entrar na Sala</p>
                            <GrGroup size={30} />
                        </div>
                    </div>
                </div>
            )}

            <main className='fonthome bg-bgColor w-full min-h-screen text-primaryColor flex'>
                <aside className='w-1/5 pl-5 pt-5 bg-[#353952]'>
                    <p className='text-2xl mb-5 border-b border-solid pl-5'>Suas salas</p>
                    <div className='flex flex-col gap-5'>
                        {rooms.map(room => (
                            <SalasLado
                                key={room.id}
                                cor={room.color_theme}
                                titulo={room.title}
                                onClick={() => handleRoomClick(room.id)}  // Adicionado onClick handler
                            />
                        ))}
                    </div>
                </aside>

                <section className="h-full gap-y-16 py-[100px] flex justify-evenly w-full relative items-center flex-wrap">
                    {error && (
                        <div className="absolute top-4 right-4 bg-red-500/10 border border-red-500 text-red-500 p-4 rounded">
                            {error}
                        </div>
                    )}

                    <div
                        onClick={() => setModal(!modal)}
                        className='bg-[#353952] hover:bg-[#353990] transition-all duration-500 absolute top-3 right-10 cursor-pointer border border-white border-solid'
                    >
                        <IoMdAdd size={50} />
                    </div>

                    {rooms.map(room => (
                        <CardSalas
                            key={room.id}
                            onclick={() => handleRoomClick(room.id)}  // Atualizado para passar roomId
                            corFundo={room.color_theme}
                            corBorda={`${room.color_theme}`}
                            titulo={room.title}
                            descricao={room.description}
                            isMod={room.role === 'owner' || room.role === 'admin'}
                            maxMembros={String(room.max_members)}
                            membrosAtual={String(room.member_count)}
                            limiteCat="31/08 Lustres Unidade 03 - [cod20494]"
                            limitePat="31/08 Cadeira Sala 05 - [cod20494]"
                        />
                    ))}
                </section>
            </main>
        </>
    );
}

export default Salas;                           