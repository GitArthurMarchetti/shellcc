/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from "../components/ui/button"
import tartaruga from '../assets/img/logo-amarelo.png'
import tartarugaVerde from '../assets/img/logo-verde.png'
import tartarugaVermelha from '../assets/img/logo-vermeia.png'


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

                    <div className="m-auto pb-32 text-center">
                        <h1 className="text-9xl  text-center fontTitle">Shellcc</h1>
                        <h2 className="text-2xl fonthome">Uma vida longa aos seus patrimonios</h2>
                    </div>
                    <div className="w-full h-80 content-center pl-20 fonthome ">
                        <p className="text-8xl w-[15.5em] mb-20"><span className="text-[#FFB800]">Gestão</span> e <span className="text-[#FFB800]">supervisão</span>  dos seus <span className="text-[#D63B56]">patrimonios.</span></p>
                        <p className="text-2xl w-96 text-justify">Seus ativos merecem nosso serviço</p>
                        <Button className="bg-green-400 text-primaryColor w-96 hover:bg-green-300">Conhecer nosso serviço</Button>

                    </div>
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0e1125" fill-opacity="1" d="M0,128L60,144C120,160,240,192,360,181.3C480,171,600,117,720,96C840,75,960,85,1080,117.3C1200,149,1320,203,1380,229.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                <section className="bg-[#0e1125] flex flex-row justify-around text-2xl fonthome align-middle items-center">
                    <div className="w-1/3">
                        <p>Objetivo</p>
                        <p>Nosso objetivo é resolver um dos problemas mais comuns no mercado, a desinformação sobre o custo de vida de nossos patrimônios. Por isso, desenvolvemos o Turtle, sistema para gerenciamento de custo de ciclo de vida, onde você e sua empresa poderão se informar sobre o valor da desvalorização dos patrimônios da empresa, para futuramente fazer uma melhoria ou uma prevenção para não ficar com patrimonios desvalorizados.</p>
                    </div>
                    <div>
                        <img className="rounded-[50%] h-72 w-72 bg-white" src={tartaruga} alt="" />
                    </div>
                </section>
                <section><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0e1125" fill-opacity="1" d="M0,64L60,85.3C120,107,240,149,360,181.3C480,213,600,235,720,218.7C840,203,960,149,1080,128C1200,107,1320,117,1380,122.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>


                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0e1125" fill-opacity="1" d="M0,64L60,85.3C120,107,240,149,360,181.3C480,213,600,235,720,218.7C840,203,960,149,1080,128C1200,107,1320,117,1380,122.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>                <section className="bg-[#0e1125] flex flex-row justify-around text-2xl fonthome align-middle items-center">
                    <div>
                        <img className="rounded-[50%] h-72 w-72 bg-white" src={tartarugaVerde} alt="" />
                    </div>
                    <div className="w-1/3">
                        <p>Sobre a Shellcc</p>
                        <p>Composta por alunos do Sesi Senai da unidade de Florianópolis, nossa equipe conta com jovens talentos da programação e do design gráfico. Eduardo Borges, Arthur D’eça, Rafael Schmidt, Rafagath Klug e Luiza Fischer.</p>
                    </div>

                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0e1125" fill-opacity="1" d="M0,64L60,80C120,96,240,128,360,122.7C480,117,600,75,720,53.3C840,32,960,32,1080,53.3C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>                <section>
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0e1125" fill-opacity="1" d="M0,224L60,234.7C120,245,240,267,360,245.3C480,224,600,160,720,133.3C840,107,960,117,1080,133.3C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                <section className="bg-[#0e1125] flex flex-row justify-around text-2xl fonthome align-middle items-center">
                    <div className="w-1/3">
                        <p>Equipe</p>
                        <p>Composta por alunos do Sesi Senai da unidade de Florianópolis, nossa equipe conta com jovens talentos da programação e do design gráfico. Eduardo Borges, Arthur D’eça, Rafael Schmidt, Rafagath Klug e Luiza Fischer.</p>
                    </div>
                    <div>
                        <img className="rounded-[50%] h-72 w-72 bg-white" src={tartarugaVermelha} alt="" />
                    </div>

                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0e1125" fill-opacity="1" d="M0,160L60,176C120,192,240,224,360,208C480,192,600,128,720,101.3C840,75,960,85,1080,122.7C1200,160,1320,224,1380,256L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
            </main >
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