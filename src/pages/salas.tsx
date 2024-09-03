import { CardSalas, SalasLado } from '@/components/salas'
import '../App.css'
import { IoMdAdd } from "react-icons/io";
function Salas() {

    return (
        <>
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
                <section className='h-full gap-y-16 py-[100px] flex justify-evenly w-full relative items-center flex-wrap  '>
                    <div className='bg-[#353952] hover:bg-[#353990] transition-all duration-500 absolute top-3 right-10 cursor-pointer border border-white border-solid' > <IoMdAdd size={50} /></div>
                    <CardSalas
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