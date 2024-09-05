import { CardSalas, SalasLado } from '@/components/salas'
import '../App.css'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { GrGroup } from "react-icons/gr";
function Salas() {
    const navigate = useNavigate()
    const [modal, setModal] = useState(false)
    return (
        <>
            {modal ? (
                <>
                    <div className='absolute w-full z-10 h-full bg-fundoModal'>
                        <div className='relative w-96 gap-3 flex flex-col justify-center top-[40%]   p-4 items-center m-auto bg-bgColor text-white text-2xl'>
                            <div onClick={() => navigate('/criarSala')} className=' cursor-pointer w-full flex  items-center justify-between'>
                                <p>Criar uma Sala</p>
                                <CiCirclePlus size={30} />
                            </div>
                            <div className='  border-solid border border-b-white w-full'></div>
                            <div className='w-full flex cursor-pointer items-center justify-between'>
                                <p>Entrar na Sala</p>
                                <GrGroup size={30} />
                            </div>

                        </div>
                    </div>
                </>
            ) : null}
            <main className='fonthome bg-bgColor w-full min-h-screen text-primaryColor  flex'>
                <aside className='w-1/5 pl-5 pt-5 bg-[#353952]'>
                    <p className='text-2xl mb-5 border-b border-solid pl-5'>Suas salas</p>

                    <div className='flex flex-col gap-5'>
                        <SalasLado cor="bg-[#7D51D2]" titulo="Casas d'água" />
                        <SalasLado classname='bg-[#feba09]' titulo="UniSenai" />
                        <SalasLado classname='bg-[#16A9FE]' titulo="Sesi Senai" />
                        <SalasLado classname='bg-[#E24A61]' titulo="Fiesc" />
                    </div>

                </aside>
                <section className={`h-full gap-y-16 py-[100px] flex justify-evenly w-full relative items-center flex-wrap  `}>

                    <div onClick={() => { modal ? (setModal(false)) : setModal(true) }} className='bg-[#353952] hover:bg-[#353990] transition-all duration-500 absolute top-3 right-10 cursor-pointer border border-white border-solid' >
                        <IoMdAdd size={50} />
                    </div>

                    <CardSalas
                        onclick={() => { navigate('/dashboard') }}
                        corFundo='bg-[#7D51D2]'
                        corBorda='border-[#7D51D2]'
                        titulo="Casas d'água"
                        descricao='Unidade FLN - 2024'
                        isMod={true}
                        maxMembros='10'
                        membrosAtual='3'
                        limiteCat='31/08 Lustres Unidade 03 - [cod20494] '
                        limitePat='31/08 Cadeira Sala 05 - [cod20494] ' />
                    <CardSalas
                        corFundo='bg-[#feba09]'
                        corBorda='border-[#feba09]'
                        titulo="UniSenai"
                        descricao='Unidade FLN - 2024'
                        isMod={false}
                        maxMembros='20'
                        membrosAtual='5'
                        limiteCat='31/08 Lustres Unidade 03 - [cod20494] '
                        limitePat='31/08 Cadeira Sala 05 - [cod20494] ' />
                    <CardSalas
                        corFundo='bg-[#16A9FE]'
                        corBorda='border-[#16A9FE]'
                        titulo="Sesi Senai"
                        descricao='Estabelecimento São José - 2024'
                        isMod={false}
                        maxMembros='20'
                        membrosAtual='5'
                        limiteCat='31/08 Lustres Unidade 03 - [cod20494] '
                        limitePat='31/08 Cadeira Sala 05 - [cod20494] ' />
                    <CardSalas
                        corFundo='bg-[#E24A61]'
                        corBorda='border-[#E24A61]'
                        titulo="Fiesc"
                        descricao='Unidade FLN - 2024'
                        isMod={false}
                        maxMembros='20'
                        membrosAtual='5'
                        limiteCat='31/08 Lustres Unidade 03 - [cod20494] '
                        limitePat='31/08 Cadeira Sala 05 - [cod20494] ' />


                </section>
            </main>
        </>
    )
}
export default Salas