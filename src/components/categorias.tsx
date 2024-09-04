interface CategoriaProps {
    tipo: string
    depreciacaoPadrao: number
}

import { IoIosArrowDown } from "react-icons/io";

export default function Categoria({ tipo, depreciacaoPadrao }: CategoriaProps) {
    return (
        <>
            <div className="h-16 m-5 border-white border-2 border-solid flex flex-row justify-between items-center pl-3 text-white">
                <div className="flex flex-row items-center w-3/12 justify-evenly hover:cursor-pointer">
                    <IoIosArrowDown />
                    <p className="font-bold hover:tracking-widest transition-all">{tipo}</p>
                </div>

                <div className="flex-row flex justify-evenly w-3/12 items-center">
                    <p className="text-red-500">{depreciacaoPadrao}%</p>
                    <p className=" bg-green-500 px-2 align-middle items-center text-center flex justify-center text-3xl hover:cursor-pointer hover:bg-green-700">+</p>
                </div>
            </div>
        </>
    );
}
