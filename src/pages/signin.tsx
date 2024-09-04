import { FaPlus } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { GiTurtle } from "react-icons/gi"
import { useNavigate } from "react-router-dom"

function Signin() {

    const navigate = useNavigate()

    return (
        <>
            <main className="fonthome bg-bgColor h-[100vh] text-primaryColor">
                <section className="flex w-11/12 m-auto justify-center items-center h-full">
                    <div className="w-1/4 m-auto flex flex-col justify-center">
                        <div className="bg-[#FFB800] w-[150px] m-auto relative flex justify-center h-[150px] items-center rounded-full ">
                            <GiTurtle size={100} />
                            <FaPlus size={40} className="absolute top-3 right-[20px]" />
                        </div>
                        <div className="flex flex-col">
                            <form action="" className="flex flex-col gap-3 mt-6">
                                <label className="mt-1 text-2xl" htmlFor="">Name</label>
                                <input className="mt-1 bg-transparent focus:outline-none borda-input w-full px-2 py-2 rounded-sm" type="text" />
                                <label className="mt-1 text-2xl" htmlFor="">Email</label>
                                <input className="mt-1 bg-transparent focus:outline-none borda-input w-full px-2 py-2 rounded-sm" type="text" />
                                <label className="mt-1 text-2xl" htmlFor="">Senha</label>
                                <input type="password" className="mt-1 bg-transparent focus:outline-none borda-input w-full px-2 py-2 rounded-sm" />
                                <label className="mt-1 text-2xl" htmlFor="">Confirmar Senha</label>
                                <input type="password" className="mt-1 bg-transparent focus:outline-none borda-input w-full px-2 py-2 rounded-sm" />
                                <button className="bg-[#FFB800] duration-500 mt-5 w-3/4 text-2xl font-semibold py-4 fo rounded-xl m-auto  hover:bg-[#FFB869] font-sans text-[#fff]">Cadastrar</button>
                            </form>
                            <div className="flex flex-col justify-center items-center mt-3 gap-2">
                                <p>
                                    ou
                                </p>
                                <div className="bg-primaryColor p-2 rounded-full">
                                    <FcGoogle size={30} color="black" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-solid  border-[#191d41] shadow-sm shadow-white rounded-3xl flex-col text-center justify-between p-7 h-3/4 border-4 w-1/3 m-auto ">
                        <div className="flex flex-col">
                            <p className="text-xl ">
                                <b>Seja Bem-Vindo</b>
                            </p>
                            <h1 className="fontTitle text-8xl text-[#0CC17A]">
                                Shellcc
                            </h1>
                            <p className="w-3/4 m-auto text-right">
                                <br />A Shellcc auxilia na administração de ativos e no desenvolvimento do seu negócio. Com foco em maximizar valores, oferecemos suporte estratégico e personalizado para impulsionar seu sucesso.
                            </p>
                        </div>
                        <div>
                            <p className="text-lg mb-2">Já Possui uma Conta?</p>
                            <button className="text-2xl bg-[#0CC17A] font-semibold  p-4 rounded-xl px-20 text-[#fff] font-sans " onClick={() => navigate("/login")}>Entrar</button>
                        </div>
                    </div>

                </section>
            </main >
        </>
    )
}
export { Signin }