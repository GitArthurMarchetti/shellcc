import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FaChevronDown, FaSearch } from 'react-icons/fa';
import Categoria from "@/components/categorias";
import AddPatrimonio from "../components/addPatrimonio";
import { useAuth } from '../contexts/AuthContext';
import { PatrimonyService } from '../services/patrimonyService';
import { Category, Patrimony } from '../types/patrimony';
import { useParams, useNavigate } from "react-router-dom";
import CategoriaModal from "@/components/CategoriaModal";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [isCategoriaModalOpen, setIsCategoriaModalOpen] = useState(false);
    // Estados
    const [isPatrimonioModalOpen, setIsPatrimonioModalOpen] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [patrimonios, setPatrimonios] = useState<Record<number, Patrimony[]>>({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [chartData, setChartData] = useState<Array<{ name: string; value: number }>>([]);
    const [selectedPatrimonio, setSelectedPatrimonio] = useState<Patrimony | null>(null);


    const patrimonyService = new PatrimonyService(user?.token || '');

    // Função para mostrar notificações
    const showNotification = (message: string, type: 'success' | 'error') => {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-md ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white z-50`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    };

    // Carregar dados
    const loadData = async () => {
        try {
            setLoading(true);
            const fetchedCategories = await patrimonyService.getCategories(Number(roomId));
            setCategories(fetchedCategories);

            const patrimoniosMap: Record<number, Patrimony[]> = {};
            await Promise.all(
                fetchedCategories.map(async (category) => {
                    const categoryPatrimonios = await patrimonyService.getPatrimoniesByCategory(category.id);
                    patrimoniosMap[category.id] = categoryPatrimonios;
                })
            );
            setPatrimonios(patrimoniosMap);
        } catch (error) {
            showNotification("Erro ao carregar dados", 'error');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const loadData = async () => {
            if (!user?.token || !roomId) {
                console.log('Sem token ou roomId');
                return;
            }

            try {
                setLoading(true);
                const patrimonyService = new PatrimonyService(user.token);

                console.log('Buscando categorias para sala:', roomId);
                const fetchedCategories = await patrimonyService.getCategories(Number(roomId));
                console.log('Categorias encontradas:', fetchedCategories);

                if (!fetchedCategories || fetchedCategories.length === 0) {
                    console.log('Nenhuma categoria encontrada');
                }

                setCategories(fetchedCategories);

                const patrimoniosMap: Record<number, Patrimony[]> = {};

                for (const category of fetchedCategories) {
                    console.log('Buscando patrimônios para categoria:', category.id);
                    const categoryPatrimonios = await patrimonyService.getPatrimoniesByCategory(category.id);
                    console.log(`Patrimônios encontrados para categoria ${category.id}:`, categoryPatrimonios);
                    patrimoniosMap[category.id] = categoryPatrimonios;
                }

                setPatrimonios(patrimoniosMap);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                showNotification("Erro ao carregar dados", 'error');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [roomId, user?.token]);


    useEffect(() => {
        if (!user?.token) {
            navigate('/login');
            return;
        }
        if (!roomId) {
            navigate('/salas');
            return;
        }
        loadData();
    }, [roomId, user?.token, navigate]);

    const calculateChartData = (patrimony: Patrimony) => {
        const initialValue = Number(patrimony.initial_value);
        const devalRate = Number(patrimony.devaluation_rate) / 100;
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

        return months.map((month, index) => ({
            name: month,
            value: initialValue * Math.pow(1 - devalRate, index / 12)
        }));
    };

    useEffect(() => {
        if (selectedPatrimonio) {
            const data = calculateChartData(selectedPatrimonio);
            setChartData(data);
        }
    }, [selectedPatrimonio]);

    // Mapeamento de patrimônios para o formato da categoria
    const mapPatrimoniosToItems = (patrimonios: Patrimony[]) => {
        return patrimonios.map(p => {
            const currentValue = typeof p.current_value === 'string'
                ? parseFloat(p.current_value)
                : p.current_value;

            const initialValue = typeof p.initial_value === 'string'
                ? parseFloat(p.initial_value)
                : p.initial_value;

            return {
                id: p.id,
                nome: p.name,
                codigo: Number(p.code),
                porcentagem: Math.round((currentValue / initialValue) * 100),
                valorFinal: currentValue.toFixed(2),
                patrimonio: p // Referência ao patrimônio completo
            };
        });
    };

    // Funções de manipulação de patrimônios
    const handleCreatePatrimonio = async (data: any) => {
        if (!selectedCategoria) return;
        try {
            const newPatrimonio = await patrimonyService.createPatrimony({
                ...data,
                category_id: selectedCategoria.id,
                room_id: Number(roomId)
            });

            setPatrimonios(prev => ({
                ...prev,
                [selectedCategoria.id]: [...(prev[selectedCategoria.id] || []), newPatrimonio]
            }));

            setIsPatrimonioModalOpen(false);
            showNotification("Patrimônio criado com sucesso!", "success");
        } catch (error) {
            showNotification("Erro ao criar patrimônio", "error");
        }
    };

    const handleDeletePatrimonio = async (patrimonioId: number, categoryId: number) => {
        if (!window.confirm('Tem certeza que deseja excluir este patrimônio?')) return;
        try {
            await patrimonyService.deletePatrimony(patrimonioId);
            setPatrimonios(prev => ({
                ...prev,
                [categoryId]: prev[categoryId].filter(p => p.id !== patrimonioId)
            }));
            if (selectedPatrimonio?.id === patrimonioId) {
                setSelectedPatrimonio(null);
            }
            showNotification("Patrimônio excluído com sucesso!", "success");
        } catch (error) {
            showNotification("Erro ao excluir patrimônio", "error");
        }
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-bgColor text-white">
                <p className="text-2xl">Carregando...</p>
            </div>
        );
    }

    const handleCreateCategory = async (data: { name: string; default_devaluation: number }) => {
        try {
            const newCategory = await patrimonyService.createCategory({
                ...data,
                room_id: Number(roomId)
            });
            setCategories(prev => [...prev, newCategory]);
            setIsCategoriaModalOpen(false);
            showNotification("Categoria criada com sucesso!", "success");
        } catch (error) {
            showNotification("Erro ao criar categoria", "error");
        }
    };


    return (
        <main className='bg-bgColor fonthome w-full min-h-screen'>
            {/* Navegação */}
            <nav className='p-4 bg-gray-800 flex justify-between items-center'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center p-2 text-xl text-white rounded'>
                        <FaChevronDown className='mr-2' />
                        Casas d'água
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-[#7D51D2] text-white text-xl rounded shadow-md'>
                        <DropdownMenuItem>
                            <a href="#unisenai">UniSenai</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <a href="#sesi-senai">Sesi Senai</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <a href="#fiesc">Fiesc</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-full text-white">
                            <a href="/salas">Minhas Salas</a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <button
                    onClick={() => setIsCategoriaModalOpen(true)}
                    className="text-[40px] text-white mr-5"
                >
                    +
                </button>
            </nav>

            <section className="h-max p-10">
                {/* Busca */}
                <div className="relative mt-4 mb-2 text-white">
                    <input
                        type="text"
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 p-2 bg-[#777986] border-0 outline-none placeholder:text-white text-white rounded-lg w-80"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                </div>

                {/* Conteúdo Principal */}
                <div className="flex flex-row justify-between text-white">
                    {/* Lista de Categorias e Patrimônios */}
                    <div className="h-fit border-solid border-2 border-white w-5/12 overflow-y-auto">
                        {categories.map(category => (
                            <Categoria
                                key={category.id}
                                tipo={category.name}
                                depreciacaoPadrao={category.default_devaluation}
                                itens={mapPatrimoniosToItems(patrimonios[category.id] || [])}
                                onAddClick={() => {
                                    setSelectedCategoria(category);
                                    setIsPatrimonioModalOpen(true);
                                }}
                                onSelectPatrimonio={setSelectedPatrimonio}
                            />
                        ))}
                    </div>

                    {/* Painel de Detalhes */}
                    <div className="h-fit border-solid border-2 flex flex-col border-white w-5/12 mr-5 px-7 py-5 overflow-y-auto">
                        {selectedPatrimonio ? (
                            <>
                                <h1 className="text-gray-500 text-3xl font-bold">DEPRECIAÇÃO</h1>
                                <div className="flex items-center justify-between mr-10">
                                    <p className="text-5xl mt-2">{selectedPatrimonio.name}</p>
                                    <p className="text-red-500">[{selectedPatrimonio.devaluation_rate}%]</p>
                                </div>
                                <p className="text-gray-500 mb-4">
                                    R$ {Number(selectedPatrimonio.initial_value).toFixed(2)}
                                    <span className="text-red-500 mx-2">→</span>
                                    <span className="text-white">
                                        R$ {Number(selectedPatrimonio.current_value).toFixed(2)}
                                    </span>
                                </p>

                                {/* Gráfico */}
                                <div className="h-64 mt-4 mb-6">
                                    <p className="text-lg mb-2">Previsão de Desvalorização</p>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                            <XAxis dataKey="name" stroke="#fff" />
                                            <YAxis stroke="#fff" />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#171B34', border: '1px solid white' }}
                                                labelStyle={{ color: 'white' }}
                                                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Valor']}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#0CC17A"
                                                strokeWidth={2}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                <p className="text-xl font-light">{selectedPatrimonio.description}</p>
                                <p className="text-xl font-light mt-6">Localização: {selectedPatrimonio.location}</p>

                                <div className="mt-8">
                                    <h2 className="text-2xl font-bold">Dados da Depreciação</h2>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <p className="text-gray-400">Valor Inicial</p>
                                            <p className="text-xl">
                                                R$ {Number(selectedPatrimonio.initial_value).toFixed(2)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Valor Atual</p>
                                            <p className="text-xl">
                                                R$ {Number(selectedPatrimonio.current_value).toFixed(2)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Taxa de Depreciação</p>
                                            <p className="text-xl">{selectedPatrimonio.devaluation_rate}% ao ano</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Depreciação Total</p>
                                            <p className="text-xl">
                                                {Math.round((1 - Number(selectedPatrimonio.current_value) /
                                                    Number(selectedPatrimonio.initial_value)) * 100)}%
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end gap-4">
                                    <button
                                        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors"
                                        onClick={() => handleDeletePatrimonio(
                                            selectedPatrimonio.id,
                                            selectedPatrimonio.category_id
                                        )}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-48">
                                <p className="text-gray-500 text-xl">
                                    Selecione um patrimônio para ver os detalhes
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <CategoriaModal
                isOpen={isCategoriaModalOpen}
                onClose={() => setIsCategoriaModalOpen(false)}
                onSubmit={handleCreateCategory}
                roomId={Number(roomId)}
            />

            {/* Modal de Adição de Patrimônio */}
            <AddPatrimonio
                isOpen={isPatrimonioModalOpen}
                onClose={() => setIsPatrimonioModalOpen(false)}
                categoria={selectedCategoria?.name}
                depreciacaoPadrao={selectedCategoria?.default_devaluation}
                onSubmit={handleCreatePatrimonio}
            />
        </main>
    );
}