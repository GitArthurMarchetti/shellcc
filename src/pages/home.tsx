/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from "../components/ui/button"
import logoVerdeRafaelPng from "../assets/img/logo-verdeRafael.png"

import { MdMailOutline } from "react-icons/md"
import { useNavigate } from "react-router-dom"


export default function Home() {

    const navigate = useNavigate()
    return (
        <>
            <header className="w-full">
                <nav className="flex flex-row w-full py-6  justify-between p-2 pl-5 pr-5 bg-[#0e1125]">
                    <div className="w-[25%] flex-row  items-center ml-8 gap-3 fonthome flex text-2xl justify-between text-primaryColor">
                        <a className="hover:font-bold transition-all duration-300" href="">
                            Início
                        </a>
                        <a className="hover:font-bold transition-all duration-300" href="#objetivo">
                            Objetivo
                        </a>
                        <a className="hover:font-bold transition-all duration-300" href="#equipe">
                            Equipe
                        </a>
                        <a className="hover:font-bold transition-all duration-300" href="#sobre">
                            Sobre
                        </a>

                    </div>

                    <div className="flex flex-row mr-8 gap-5 justify-between">
                        <Button onClick={() => navigate('/signin')} className="rounded-full text-xl p-6 border-white borderDashed bg-[#0e1125]  transition-all duration-500  hover:bg-[#FFB800]">
                            Criar conta
                        </Button>
                        <Button onClick={() => navigate('/login')} className="rounded-full text-xl p-[1.6rem] border-white border-solid border bg-[#0e1125] transition-all duration-500  hover:bg-green-400">
                            Entrar
                        </Button>
                    </div>
                </nav>
            </header>
            <main className="w-full h-full bg-bgColor text-primaryColor">
                <section className="bgimg pt-10">
                    <img src="" alt="" />

                    <div className="m-auto pb-32 text-center">
                        <h1 className="text-9xl mt-8 text-center fontTitle">
                            Shellcc
                        </h1>
                        <h2 className="text-2xl fonthome">
                            Uma vida longa aos seus patrimonios
                        </h2>
                    </div>
                    <div className="w-full h-50 content-center pl-20 fonthome">

                        <p className="text-6xl w-[15.5em] mb-6">
                            <span className="text-[#FFB800] drop-shadow-2xl">
                                Gestão </span> e <span className="text-[#FFB800]">supervisão</span>  dos seus <span className="text-[#D63B56]">patrimônios.</span>
                        </p>
                        <p className="text-2xl w-96 text-justify">
                            Seus ativos merecem nosso serviço
                        </p>
                        <Button className="bg-green-400 py-6 text-2xl text-primaryColor w-96 hover:bg-green-300">
                            Conhecer nosso serviço
                        </Button>

                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="z-10 relative" viewBox="0 0 1440 320"><path fill="#0e1125" fill-opacity="1" d="M0,128L60,144C120,160,240,192,360,181.3C480,171,600,117,720,96C840,75,960,85,1080,117.3C1200,149,1320,203,1380,229.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                </section>
                <section className="bg-[#0e1125] flex flex-row justify-around text-2xl fonthome align-middle items-center" id="objetivo">
                    <div className="w-2/5">
                        <p className="text-5xl font-bold text-[#FFB800]  ml-5 mb-2.5 ">
                            OBJETIVO
                        </p>
                        <p className="text-xl font-light border-t-4 border-[#FFB800] border-solid">
                            <br />Nosso objetivo é resolver um dos problemas mais comuns no mercado, a desinformação sobre o custo de vida de nossos patrimônios. Por isso, desenvolvemos a SHELLCC,sistema para gerenciamento de custo de ciclo de vida, onde você e sua empresa poderão se informar sobre o valor da desvalorização dos patrimônios da empresa, para futuramente fazer uma melhoria ou uma prevenção para não ficar com patrimonios desvalorizados.
                        </p>
                    </div>
                    <div>

                    </div>
                </section>
                <section >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0e1125" fill-opacity="1" d="M0,64L60,85.3C120,107,240,149,360,181.3C480,213,600,235,720,218.7C840,203,960,149,1080,128C1200,107,1320,117,1380,122.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>

                    <section className="flex flex-row justify-around text-2xl fonthome align-middle items-center" id="equipe">
                        <div>
                            <img className="" alt="" />
                        </div>
                        <div className="w-2/6">
                            <p className="text-5xl font-bold  text-[#D63B56] text-right mr-5 mb-2.5">
                                EQUIPE
                            </p>
                            <p className="text-xl font-light border-t-4 border-[#D63B56] border-solid text-right">
                                <br />Composta por alunos do Sesi Senai da unidade de Florianópolis, nossa equipe conta com jovens talentos da programação e do design gráfico: Arthur D’eça, Eduardo Borges, Luiza Fischer, Rafael Schmidt e Rafagath Klug.
                            </p>
                        </div>


                    </section>
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0e1125" fill-opacity="1" d="M0,64L60,85.3C120,107,240,149,360,181.3C480,213,600,235,720,218.7C840,203,960,149,1080,128C1200,107,1320,117,1380,122.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                <section className="bg-[#0e1125] flex flex-row justify-around text-2xl fonthome align-middle items-center" id="sobre">

                    <div className="w-2/4 ml-10 tracking-wide">
                        <p className="text-5xl font-bold text-green-400 ml-5 mb-2.5 " >
                            SOBRE A SHELLCC
                        </p>

                        <p className="text-xl font-light border-t-4 border-green-400 border-solid">
                            <br />A Shellcc oferece uma solução eficiente para acompanhar e otimizar os ativos da sua empresa. Com nosso sistema, você pode registrar e monitorar todos os ativos, desde equipamentos até propriedades, mantendo um inventário organizado e atualizado. Além disso, fornecemos insights sobre a depreciação ao longo do tempo, permitindo que você tome decisões informadas sobre manutenção, substituição ou venda. Se precisar de suporte ou tiver alguma dúvida, estamos à disposição para ajudar!
                        </p>

                    </div>
                    <div>
                        <img className="rounded-[50%] h-72 w-108 flutuando overflow-hidden mt-10" src={logoVerdeRafaelPng} alt="" />
                    </div>
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0e1125" fill-opacity="1" d="M0,64L60,80C120,96,240,128,360,122.7C480,117,600,75,720,53.3C840,32,960,32,1080,53.3C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>                <section>
                </section>



            </main >
            <footer className="bg-neutral-900	 w-full h-full py-6 text-primaryColor">
                <section className="flex flex-row w-11/12  m-auto justify-around" >
                    <div>
                        <div className="text-center mb-8">
                            <h2 className="fontTitle text-7xl ">
                                Shellcc
                            </h2>
                            <p className=" text-[#0CC17A]">
                                Agradecemos por nos dar uma chance!
                            </p>
                        </div>
                        <div className="gap-2 flex flex-col">
                            <p className="text-xl font-bold">
                                Nossos contatos pessoais:
                            </p>
                            <p className="underline flex  decoration-primaryColor decoration-2 items-center gap-2">
                                avinhasmarchetti@gmail.com <MdMailOutline />
                            </p>
                            <p className="underline flex  decoration-primaryColor decoration-2  items-center gap-2">
                                eduardo_borges@infointelligence.com.br <MdMailOutline />
                            </p>
                            <p className="underline flex  decoration-primaryColor decoration-2 items-center gap-2">
                                luizafische@gmail.com <MdMailOutline />
                            </p>
                            <p className="underline flex  decoration-primaryColor decoration-2 items-center gap-2">
                                rafagmk@gmail.com <MdMailOutline />
                            </p>
                        </div>
                    </div>
                    {/* <p>
                            exemplo@gmail.com
                        </p>
                        <p>
                            exemplo@gmail.com
                        </p>
                        <p>
                            exemplo@gmail.com
                        </p>
                        <p>
                            exemplo@gmail.com
                        </p> */}

                    <div className="flex flex-col items-center p-6 rounded-lg w-full max-w-lg ml-auto mr-4 border-2 border-[#0CC17A] bg-neutral-900 border-solid">
                        <p className="text-center text-2xl font-bold text-[#0CC17A] mb-4">
                            Entre em contato conosco
                        </p>
                        <form className="flex gap-4 flex-col w-full" action="https://formsubmit.co/duduborges333969@gmail.com" method="POST">
                            <input className="h-12 rounded-md focus:ring-2 focus:ring-[#0CC17A] focus:outline-none border border-[#0CC17A] px-4 transition-all duration-300 bg-white" type="text" name="name" required placeholder="Informe seu nome" />
                            <input type="email" className="h-12 rounded-md focus:ring-2 focus:ring-[#0CC17A] focus:outline-none border border-[#0CC17A] px-4 transition-all duration-300 bg-white" name="email" required placeholder="Informe seu email" />
                            <textarea className="h-32 rounded-md focus:ring-2 focus:ring-[#0CC17A] focus:outline-none border border-[#0CC17A] px-4 py-2 transition-all duration-300 resize-none bg-white" name="message" required placeholder="Deixe seu recado"></textarea>
                            <button type="submit" className="bg-white text-[#0CC17A] py-2 rounded-md w-full font-bold hover:bg-stone-300 border-2 border-[#0CC17A]">
                                Enviar
                            </button>
                        </form>
                    </div>

                </section>
            </footer>
        </>
    )
}