import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"


interface CategoriaProps {
    tipo: string
    depreciacaoPadrao: number
    itens: {
        nome: string,
        codigo: number,
        porcentagem: number,
        valorFinal: string
    }[]
}

import { IoIosArrowDown } from "react-icons/io";

export default function Categoria({ tipo, depreciacaoPadrao, itens }: CategoriaProps) {
    return (
        <>
            <Collapsible className="w-full h-fit">
                <div className="h-fit m-5 py-4  border-white border-2 border-solid flex flex-row justify-between items-center pl-3 text-white">
                    <CollapsibleTrigger className="w-full flex items-center justify-between">
                        <div className="flex flex-row items-center w-2/3 gap-4 justify-start hover:cursor-pointer">
                            <IoIosArrowDown />
                            <p className="font-bold hover:tracking-wide transition-all">{tipo}</p>
                        </div>

                        <div className="flex-row flex justify-evenly w-1/6 items-center">
                            <p className="text-red-500">{depreciacaoPadrao}%</p>
                            <p className="bg-green-500 px-2 align-middle items-center text-center flex justify-center text-3xl hover:cursor-pointer hover:bg-green-700 transition-all duration-300">+</p>
                        </div>
                    </CollapsibleTrigger>
                </div>
                <div className="text-white flex flex-col gap-2 justify-between w-11/12 m-5 pl-4">
                    {itens.map((item, index) => (
                        <CollapsibleContent key={index}>
                            <div className="flex  items-center ">
                                {/* Linha ao lado do texto */}
                                <div className="flex flex-col items-center mr-4">
                                    <div className="w-2 h-2 bg-white rounded-full my-1"></div>
                                    <div className="w-1 h-10 bg-white"></div>
                                    <div className="w-2 h-2 bg-white rounded-full mt-1"></div>
                                </div>
                                <div className="flex w-full  items-center justify-between">
                                    <div className="flex gap-4">
                                        <p>{item.nome}</p>
                                        <p className="text-gray-400">[{item.codigo}]</p>
                                    </div>
                                    <div className="text-center flex flex-col gap-1">
                                        <div className={`${item.porcentagem > 60 ? ("text-red-500") : item.porcentagem < 29 ? ('text-green-500') : ("text-yellow-300")}`}>{item.porcentagem}% VF</div>
                                        <div>{item.porcentagem > 60 ? (
                                            <>
                                                <div className="bg-white w-32 h-4">
                                                    <div className="bg-red-500 w-full h-4"></div>
                                                </div>
                                            </>
                                        ) : item.porcentagem < 29 ? (
                                            <>
                                                <div className="bg-white w-32 h-4">
                                                    <div className="bg-green-500 w-12 h-4"></div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="bg-white w-32 h-4">
                                                    <div className="bg-yellow-300 w-20 h-4"></div>
                                                </div>
                                            </>
                                        )}</div>
                                        <div>
                                            <p className="text-gray-400">R${item.valorFinal}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CollapsibleContent>
                    ))}
                </div>
            </Collapsible>
        </>

    );
}
// export function GraficoCat({ tipo, depreciacaoPadrao, itens }: CategoriaProps) {
//     return (
//         <>

//         </>
//     )
// }
