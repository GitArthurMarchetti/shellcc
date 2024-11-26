
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { IoIosArrowDown } from "react-icons/io";

interface PatrimonioCompleto {
    id: number;
    nome: string;
    codigo: number;
    porcentagem: number;
    valorFinal: string;
    patrimonio: any;
}

interface CategoriaProps {
    tipo: string;
    depreciacaoPadrao: number;
    itens: PatrimonioCompleto[];
    onAddClick?: () => void;
    onSelectPatrimonio?: (patrimonio: any) => void;
}

export default function Categoria({
    tipo,
    depreciacaoPadrao,
    itens,
    onAddClick,
    onSelectPatrimonio
}: CategoriaProps) {
    console.log(`Renderizando categoria ${tipo} com ${itens.length} itens`); // Debug log

    return (
        <Collapsible className="w-full h-fit">
            <div className="h-fit m-5 py-4 border-white border-2 border-solid flex flex-row justify-between items-center pl-3 text-white">
                <div className="flex flex-row items-center w-2/3 gap-4 justify-start">
                    <CollapsibleTrigger>
                        <IoIosArrowDown />
                    </CollapsibleTrigger>
                    <p className="font-bold">{tipo}</p>
                </div>

                <div className="flex-row flex justify-evenly w-1/6 items-center">
                    <p className="text-red-500">{depreciacaoPadrao}%</p>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (onAddClick) onAddClick();
                        }}
                        className="bg-green-500 px-2 h-8 w-8 flex items-center justify-center text-3xl hover:bg-green-700 transition-all duration-300"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="text-white flex flex-col gap-2 justify-between w-11/12 m-5 pl-4">
                {itens.map((item) => (
                    <CollapsibleContent key={item.id}>
                        <div
                            className="flex items-center p-3 hover:bg-[#2A2E45] rounded cursor-pointer"
                            onClick={() => {
                                if (onSelectPatrimonio) {
                                    onSelectPatrimonio(item.patrimonio);
                                }
                            }}
                        >
                            <div className="flex w-full items-center justify-between">
                                <div className="flex gap-4">
                                    <p>{item.nome}</p>
                                    <p className="text-gray-400">[{item.codigo}]</p>
                                </div>
                                <div className="text-center flex flex-col gap-1">
                                    <div className={`${item.porcentagem > 60 ? "text-red-500" :
                                        item.porcentagem < 29 ? 'text-green-500' :
                                            "text-yellow-300"
                                        }`}>
                                        {item.porcentagem}% VF
                                    </div>
                                    <div className="bg-white w-32 h-4">
                                        <div
                                            className={`h-4 ${item.porcentagem > 60 ? "bg-red-500" :
                                                item.porcentagem < 29 ? 'bg-green-500' :
                                                    "bg-yellow-300"
                                                }`}
                                            style={{ width: `${item.porcentagem}%` }}
                                        ></div>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">R$ {item.valorFinal}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsibleContent>
                ))}
            </div>
        </Collapsible>
    );
}
