import { FaGoogle } from "react-icons/fa"
import { GiTurtle } from "react-icons/gi"
import { useNavigate } from "react-router-dom"

function Signin() {

    const navigate = useNavigate()

    return (
        <>
            <main className="bg-bgColor h-[100vh] text-primaryColor">
                <section className="flex w-11/12 m-auto justify-center items-center h-full">
                    <div className="w-1/4 m-auto flex flex-col justify-center">
                        <div className="bg-[#FDAB3D] w-20 m-auto flex justify-center h-20 items-center rounded-full ">
                            <GiTurtle size={60} />
                        </div>
                        <div className="flex flex-col">
                            <form action="" className="flex flex-col gap-2">
                                <label htmlFor="">Name</label>
                                <input className="bg-transparent  borda-input" type="text" />
                                <label htmlFor="">Email</label>
                                <input className="bg-transparent  borda-input" type="text" />
                                <label htmlFor="">Senha</label>
                                <input type="password" className="bg-transparent borda-input" />
                                <label htmlFor="">Confirmar Senha</label>
                                <input type="password" className="bg-transparent borda-input" />
                                <button className="bg-[#0CC17A] w-1/2 text-xl py-2 font-bold rounded-xl m-auto">Cadastrar</button>
                            </form>
                            <div className="flex flex-col justify-center items-center mt-3 gap-2">
                                <p>
                                    ou
                                </p>
                                <div className="bg-primaryColor p-2 rounded-full">
                                    <FaGoogle size={30} color="black" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-dashed flex-col text-center justify-between p-7 h-3/4 border-4 w-1/3 m-auto">
                        <div className="flex flex-col">
                            <p className="text-xl">
                                Welcome to
                            </p>
                            <h1 className="fontTitle text-8xl text-[#FDAB3D]">
                                Shellcc
                            </h1>
                            <p className="w-3/4 m-auto text-left">
                                A Schellcc é a parceira perfeita para auxiliar na administração de ativos e no desenvolvimento do seu negócio. Com especialidade em acompanhar a desvalorização e maximizar os valores, disponibilizamos suporte estratégico e personalizado para promover o sucesso do seu negócio.
                            </p>
                        </div>
                        <div>
                            <p className="text-xl">Já Possui uma Conta?</p>
                            <button className="text-2xl bg-[#FFB800] p-4 rounded-xl px-10 text-black" onClick={() => navigate('/')} > Entrar </button>
                        </div>
                    </div>
                </section>
            </main >
        </>
    )
}
export { Signin }