import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../components/ui/dropdown-menu";
import { FaChevronDown, FaSearch } from 'react-icons/fa'; // Importando o ícone de seta para baixo
import Categoria from "@/components/categorias";


export default function Dashboard() {

    const item1 = [
        {
            nome: 'Dell XP11',
            codigo: 111155115,
            porcentagem: 90,
            valorFinal: "200,00"
        },
        {
            nome: 'Lenovo IdeaPad',
            codigo: 111155115,
            porcentagem: 70,
            valorFinal: "200,00"
        },
        {
            nome: 'Dell Xp14',
            codigo: 111155115,
            porcentagem: 50,
            valorFinal: "100,00"
        },
        {
            nome: 'Notebook Acer Aspire',
            codigo: 111155115,
            porcentagem: 35,
            valorFinal: "600,00"
        },
        {
            nome: 'Lenovo Xangai',
            codigo: 111155115,
            porcentagem: 15,
            valorFinal: "1200,00"
        }
    ];


    return (
        <>
            <main className='bg-bgColor w-full min-h-screen'>
                <nav className='p-4 bg-gray-800'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex items-center p-2 text-xl  text-white  rounded'>
                            <FaChevronDown className='mr-2' /> {/* Ícone de seta para baixo */}
                            Casas d'água
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='bg-[#7D51D2] text-white 2text-xl  rounded shadow-md'>
                            <DropdownMenuItem>
                                <a href="#unisenai">UniSenai</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#sesi-senai">Sesi Senai</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#fiesc">Fiesc</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem className=" w-full text-white  ">
                                <a href="/salas">Minhas Salas</a>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>

                <section className="h-max p-10">

                    <div className="relative mt-4 mb-2 text-white">
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="pl-10 p-2  bg-[#777986] border-0 outline-none placeholder:text-white text-white rounded-lg w-80"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                    </div>

                    <div className="flex flex-row justify-between">
                        <div className="h-fit border-solid border-2 border-white w-5/12 overflow-y-auto">
                            <Categoria itens={item1} tipo="Computadores e eletronicos" depreciacaoPadrao={15} />
                            <Categoria itens={item1} tipo="Mobílias" depreciacaoPadrao={24} />
                            <Categoria itens={item1} tipo="Edificios" depreciacaoPadrao={35} />
                        </div>

                        <div className="h-fit border-solid border-2 border-white w-5/12 overflow-y-auto">
                            <h1>Depreciação</h1>
                            <div>"Grafico"</div>
                            <p>Dell XP11</p>
                            <p>R$ 2.000,00 {"->"} 200,00</p>
                            <p>Laptop Dell, 2020 com processador i5 de 17ª geração, placa de vídeo 550gx monitor LG 12 Polegadas, Kit Dell com mouse e Teclado, NOVO </p>
                        </div>

                    </div>

                </section>
            </main>
        </>
    );
}
