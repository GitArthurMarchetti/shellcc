import { Button } from "../components/ui/button"

export default function Home() {
    return (
        <>
            <header>
                <nav className="flex flex-row w-full justify-between p-2 pl-5 pr-5 bg-gray-800">
                    <div className="w-[20%] flex-row flex justify-between">
                        <Button>Início</Button>
                        <Button>Objetivo</Button>
                        <Button>Equipe</Button>
                    </div>

                    <div className="w-[15%] flex flex-row justify-between">
                        <Button className="rounded-full border-white  borderDashed ">Criar conta</Button>
                        <Button className="rounded-full">Entrar</Button>
                    </div>
                </nav>
            </header>
            <main>
                <section>
                    <div>
                        <h1 className="text-xl">Shellcc</h1>
                    </div>
                    <div></div>
                </section>
            </main>
            <footer>

            </footer>
        </>
    )
}