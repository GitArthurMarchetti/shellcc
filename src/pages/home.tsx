/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from "../components/ui/button"
import tartaruga from '../assets/img/logo-amarelo.png'
export default function Home() {
    return (
        <>
            <header>
                <nav className="flex flex-row w-full justify-between p-2 pl-5 pr-5 bg-gray-800">
                    <div className="w-[20%] flex-row align-middle items-center flex justify-between text-primaryColor">
                        <a href="">Início</a>
                        <a href="">Objetivo</a>
                        <a href="">Sobre</a>
                        <a href="">Equipe</a>
                    </div>

                    <div className="w-[15%] flex flex-row justify-between ">
                        <Button className="rounded-full border-white borderDashed ">Criar conta</Button>
                        <Button className="rounded-full">Entrar</Button>
                    </div>
                </nav>
            </header>
            <main className="w-full h-full bg-bgColor text-primaryColor">
                <section className="bg-bgColor py-10">
                    <img src="" alt="" />

                    <div className="m-auto text-center">
                        <h1 className="text-9xl  text-center fontTitle">Shellcc</h1>
                        <h2 className="text-2xl fonthome">Uma vida longa aos seus patrimonios</h2>
                    </div>
                    <div className="w-full h-80 content-center pl-20 fonthome ">
                        <p className="text-6xl w-[800px]"><span className="text-[#FFB800]">Gestão</span> e <span className="text-[#FFB800]">supervisão</span>  dos seus <span className="text-[#D63B56]">patrimonios.</span></p>
                        <p className="text-2xl">Seus ativos merecem nosso serviço</p>
                        <Button className="bg-green-400 text-bgColor hover:bg-green-300">Conhecer nosso serviço</Button>

                    </div>
                </section>
                <section>
                    <div>
                        <img className="rounded-full" src="" alt="" />
                    </div>
                    <div>
                        <p>Objetivo</p>
                        <p>Nosso objetivo é resolver um dos problemas mais comuns no mercado, a desinformação sobre o
                            custo de vida de nossos patrimônios. Por isso, desenvolvemos o Turtle, sistema para gerenciamento de custo de ciclo de vida,
                            onde você e sua empresa poderão se informar sobre o valor da desvalorização dos patrimônios da empresa, para futuramente fazer uma melhoria
                            ou uma prevenção para não ficar com patrimonios desvalorizados.</p>
                    </div>
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0e1125" fill-opacity="1" d="M0,0L60,53.3C120,107,240,213,360,218.7C480,224,600,128,720,117.3C840,107,960,181,1080,197.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                <section className="bg-[#0e1125] flex flex-row justify-around text-2xl fonthome align-middle items-center">
                    <div className="w-1/3">
                        <p>Sobre a Shellcc</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, rem pariatur? Tempora vero inventore
                            ex obcaecati! Repellendus vitae, nulla aut inventore numquam nemo libero? Dolores quasi repellendus vero veniam unde?</p>
                    </div>
                    <div>
                        <img className="rounded-[50%] h-72 w-72 bg-white" src={tartaruga} alt="" />
                    </div>
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0e1125" fill-opacity="1" d="M0,160L40,149.3C80,139,160,117,240,138.7C320,160,400,224,480,250.7C560,277,640,267,720,229.3C800,192,880,128,960,138.7C1040,149,1120,235,1200,266.7C1280,299,1360,277,1400,266.7L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>                <section>
                    <div>
                        <img className="rounded[30%]" src="" alt="" />
                    </div>
                    <div>
                        <p>Equipe</p>
                        <p>Composta por alunos do Sesi Senai da unidade de Florianópolis, nossa equipe conta com jovens talentos da programação e do
                            design gráfico. Eduardo Borges, Arthur D’eça, Rafael Schmidt, Rafagath Klug e Luiza Fischer.</p>
                    </div>

                </section>
            </main>
            <footer className="bg-black w-full h-full text-primaryColor">
                <section className="flex flex-row w-11/12  m-auto justify-around">
                    <div>
                        <h2>Shellc</h2>
                        <p>Agradecemos por nos dar uma chance!</p>
                        <p>Nossos contatos pessoais:</p>
                        <p>exemplo@gmail.com</p>
                        <p>exemplo@gmail.com</p>
                        <p>exemplo@gmail.com</p>
                        <p>exemplo@gmail.com</p>
                        <p>exemplo@gmail.com</p>
                        <p>exemplo@gmail.com</p>
                    </div>
                    <div className="flex flex-col">
                        <p>Entrar em contato</p>
                        <form className="flex flex-col" action="https://formsubmit.co/duduborges333969@gmail.com" method="POST">
                            <input type="text" name="name" required />
                            <input type="email" name="email" required />
                            <textarea name="message" required />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </section>
            </footer>
        </>
    )
}