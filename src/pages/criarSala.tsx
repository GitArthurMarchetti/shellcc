import { BiSolidCrown } from "react-icons/bi";
import { FaUserCog } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function CriarSala() {
    const navigate = useNavigate()

    return (
        <main className='fonthome bg-bgColor w-full min-h-screen text-primaryColor  flex'>
            <div className="absolute top-3 left-3 cursor-pointer hover:scale-105 transition-all duration-300 text-red-600 hover:text-red-500">
                <FaXmark onClick={() => { navigate('/salas') }} size={50} />
            </div>
            <section className="flex flex-col w-4/5  mx-auto my-16">
                <div className="flex flex-col w-1/3 gap-2 mx-auto">
                    <label className="text-2xl">Titulo da Sala</label>
                    <input className="w-full p-2 outline-bgColor border-none text-black rounded-sm" type="text" />
                </div>
                <div className="flex flex-col w-1/3 mt-3 gap-2 mx-auto">
                    <label className="text-2xl">Descrição (opcional)</label>
                    <input className="w-full p-2 outline-bgColor border-none text-black rounded-sm" type="text" />
                </div>
                <div className="flex flex-col justify-center mx-auto text-center mt-5 gap-2">
                    <p className="text-xl font-bold">Cor da Sala</p>
                    <div className="gap-2 flex">
                        <button className="w-10 rounded-md h-10 bg-[#7D51D2] border-2 border-dashed"></button>
                        <button className="w-10 rounded-md h-10 bg-[#FEB908] border-2 border-dashed"></button>
                        <button className="w-10 rounded-md h-10 bg-[#16A9FE] border-2 border-dashed"></button>
                        <button className="w-10 rounded-md h-10 bg-[#E24A61] border-2 border-dashed"></button>
                        <button className="w-10 rounded-md h-10 bg-[#01C875] border-2 border-dashed"></button>
                        <button className="w-10 rounded-md h-10 bg-[#131B49] border-2 border-dashed"></button>
                    </div>
                </div>
                <div className="flex justify-between mt-5  w-1/3 mx-auto">
                    <button className="bg-[#01C875] p-3 text-xl m-2 rounded-sm">Gerar Chave</button>
                    <button className="bg-[#01C875] p-3 text-xl m-2 rounded-sm">Enviar Convite</button>
                </div>
                <div className="w-1/3 gap-4 flex flex-col bg-[#030345] mx-auto mt-5 p-3" >
                    <div className="flex justify-between">
                        <div className="flex gap-3 text-xl">
                            <p>Beltrano@hotmail.com</p>
                            <p>(Eu)</p>
                        </div>
                        <BiSolidCrown color="#FEB908" size={24} />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-3 text-xl">
                            <p>Beltrano@hotmail.com</p>
                            <p>(pendente)</p>
                        </div>
                        <FaUserCog color="#fff" size={24} />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-3 text-xl">
                            <p>Beltrano@hotmail.com</p>
                            <p>(Pendente)</p>
                        </div>
                        <FaUserCog color="#fff" size={24} />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-3 text-xl">
                            <p>Beltrano@hotmail.com</p>
                            <p>(Pendente)</p>
                        </div>
                        <FaUserCog color="#fff" size={24} />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex gap-3 text-xl">
                            <p>Beltrano@hotmail.com</p>
                            <p>(Pendente)</p>
                        </div>
                        <FaUserCog color="#fff" size={24} />
                    </div>
                </div>
                <div className="w-1/3 mx-auto mt-5 flex justify-between">
                    <p className="text-3xl">Total colaboradores</p>
                    <button className="bg-[#FEB908] flex items-center text-xl p-2">07/20 <IoIosArrowDown /></button>
                </div>
                <div className="w-full flex justify-end">
                    <button className="bg-[#FEB908] px-16 rounded-sm py-2 text-4xl">Criar sala</button>
                </div>
            </section>
        </main>
    )
}