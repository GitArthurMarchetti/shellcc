import { BiSolidCrown } from "react-icons/bi";
import { FaPen, FaUserCog } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { MouseEventHandler, useState } from "react";
import { IoExit } from "react-icons/io5";
interface ladoProps {
    cor?: string,
    titulo: string,
    classname?: string
}
interface cardProps {
    titulo: string,
    onclick?: MouseEventHandler,
    corFundo?: string,
    className?: string,
    descricao?: string
    membrosAtual?: string
    maxMembros?: string
    limiteCat?: string,
    limitePat?: string
    corBorda?: string
    isMod: boolean
}

function SalasLado({ cor, titulo, classname }: ladoProps) {
    return (
        <>
            <div className='flex items-center gap-4 cursor-pointer hover:font-bold transition-all '>
                <p className={` bg-[${cor}] h-11 w-11 text-2xl flex justify-center items-center rounded-full ${classname}`}>{titulo.charAt(0)}</p>
                <p className='text-3xl'>{titulo}</p>
            </div >
        </>
    )
}

function CardSalas({ onclick, titulo, corFundo, corBorda, className, descricao, membrosAtual, maxMembros, limiteCat, limitePat, isMod }: cardProps) {
    const [ops, setOps] = useState(false)
    return (
        <>
            <div className={`w-[35%] relative cursor-pointer border-solid shadow-2xl ${corBorda} border rounded-lg  transition-all duration-300 hover:-translate-y-2 `}>
                <div onClick={onclick} className={`${corFundo} ${className} absolute right-[-1px] top-[-30px] px-4 rounded-md py-2 flex items-center gap-3 `}>
                    {isMod ? (<>
                        <BiSolidCrown size={25} />
                    </>) : (<>
                        <FaUserCog size={25} />
                    </>)} <p className="text-lg">{membrosAtual} / {maxMembros}</p>
                </div>
                <div className={`${corFundo} p-4 rounded-t-lg relative ${className}`}>
                    <p onClick={onclick} className="text-4xl">{titulo}</p>
                    <p onClick={onclick} className="text-gray-300 pl-1">{descricao}</p>
                    <p className="absolute top-5 right-0" onClick={() => { ops ? setOps(false) : setOps(true) }}><CiMenuKebab size={40} /></p>
                    {ops ? (
                        <div className={`absolute ${corFundo} p-2  top-3 -right-32 transition-all`}>
                            <div className="flex gap-4 justify-between items-center ">
                                <p>Sair da sala</p>
                                <IoExit size={20} />
                            </div>
                            <div className="flex gap-4 justify-between items-center">
                                Editar Sala
                                <FaPen />
                            </div>
                        </div>
                    ) : null}

                </div>
                <div onClick={onclick} className="p-4">
                    <p className="text-2xl font-semibold">Limite Categorias Chegando:</p>
                    <p className="border-b border-white pb-4 mb-2 border-solid font-bold text-lg text-[#A33535]">{limiteCat}</p>

                    <p className="text-2xl font-semibold">Limite Patrimônio Chegando:</p>
                    <p className="border-b border-white pb-4 mb-2 border-solid font-bold text-lg text-[#A33535]">{limitePat}</p>
                </div>
            </div >
        </>
    )
}
export { SalasLado, CardSalas }