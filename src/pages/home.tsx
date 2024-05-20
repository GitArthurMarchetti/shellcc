/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from "../components/ui/button"

export default function Home() {
    return (
        <>
            <header>


                <nav className="flex flex-row w-full justify-between p-2 pl-5 pr-5 bg-gray-800">
                    <div className="w-[20%] flex-row align-middle items-center flex justify-between text-primaryColor">
                        <a href="">Início</a>
                        <a href="">Objetivo</a>
                        <a href="">Equipe</a>
                    </div>

                    <div className="w-[15%] flex flex-row justify-between">
                        <Button className="rounded-full border-white  borderDashed ">Criar conta</Button>
                        <Button className="rounded-full">Entrar</Button>
                    </div>
                </nav>
            </header>
            <main className="w-full h-full bg-bgColor text-primaryColor">
                <section className="bg">
                    <div>
                        <h1 className="text-xl">Shellcc</h1>
                        <h2>Seu patrimonio vivendo mais que uma simples tartatuga</h2>
                    </div>
                    <div>
                        <p>Gestão e supervisão dos seus patrimonios.</p>
                        <p>Seus ativos merecem nosso serviço</p>
                        <Button>Conhecer nosso serviço</Button>
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
                <section>
                    <div>
                        <p>Sobre a Turtle</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, rem pariatur? Tempora vero inventore
                            ex obcaecati! Repellendus vitae, nulla aut inventore numquam nemo libero? Dolores quasi repellendus vero veniam unde?</p>
                    </div>
                    <div>
                        <img className="rounded-full" src="" alt="" />
                    </div>
                </section>
                <section>
                    <div>
                        <img className="rounded-full" src="" alt="" />
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