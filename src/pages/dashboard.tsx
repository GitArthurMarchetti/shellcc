import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../components/ui/dropdown-menu";
import { FaChevronDown, FaSearch } from 'react-icons/fa'; // Importando o ícone de seta para baixo
import Categoria from "@/components/categorias";


export default function Dashboard() {
    return (
        <>
            <main className='bg-bgColor h-screen w-screen'>
                <nav className='p-4 bg-gray-800'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex items-center bg-blue-500 text-white p-2 rounded'>
                            Salas
                            <FaChevronDown className='ml-2' /> {/* Ícone de seta para baixo */}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-white text-black p-2 rounded shadow-md'>
                            <DropdownMenuItem>
                                <a href="#casas-dagua">Casas d'água</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#unisenai">UniSenai</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#sesi-senai">Sesi Senai</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#fiesc">Fiesc</a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>

                <section className="h-max p-10">

                    <div className="relative mt-4 mb-2">
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="pl-10 p-2 border border-gray-300 rounded-lg w-40"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>

                    <div className="flex flex-row justify-between">

                                <div className="h-96 border-solid border-2 border-white w-5/12 overflow-y-auto">
                                <Categoria tipo="Mobílias" depreciacaoPadrao={15}/>
                                <Categoria tipo="Mobílias" depreciacaoPadrao={15}/>
                                <Categoria tipo="Mobílias" depreciacaoPadrao={15}/>
                                </div>

                                <div className="h-64 border-solid border-2 border-white w-5/12 overflow-y-auto">

                                </div>

                    </div>
                    
                </section>
            </main>
        </>
    );
}
