import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GiTurtle } from "react-icons/gi";
import { IoEye, IoEyeOff } from "react-icons/io5";

function Login() {
    const [mostra, setMostra] = useState(true)
    return (
        <>
            <main className="bg-bgColor h-[100vh] text-primaryColor">
                <section className="flex w-11/12 m-auto justify-center items-center h-full">
                    <div className="flex border-dashed rounded-3xl flex-col text-center justify-between p-7 h-3/4 border-4 w-1/3 m-auto ">
                        <div className="flex flex-col">
                            <p className="text-xl ">
                                <b>Seja Bem-Vindo</b>
                            </p>
                            <h1 className="fontTitle text-8xl text-[#0CC17A]">
                                Shellcc
                            </h1>
                            <p className="w-3/4 m-auto text-center">
                            <br/>A Shellcc auxilia na administração de ativos e no desenvolvimento do seu negócio. Com foco em maximizar valores, oferecemos suporte estratégico e personalizado para impulsionar seu sucesso.
                            </p>
                        </div>
                        <div>
                            <p className="text-lg">Ainda não possui conta?</p>
                            <button className="text-2xl bg-[#FFB800] p-4 rounded-xl px-20 text-[#0e1125] font-sans ">Criar conta</button>
                        </div>
                    </div>
                    <div className="w-[30%] m-auto flex flex-col justify-center">
                        <div className="bg-[#0CC17A] w-32 m-auto flex justify-center h-32 items-center rounded-full ">
                            <GiTurtle size={90} />
                        </div>
                        <div className="flex flex-col">
                            <form action="" className="flex flex-col gap-2 mt-6">
                                <label className="text-xl" htmlFor="">Email</ label>
                                <input className="bg-transparent focus:outline-none borda-input w-full px-2 py-2 rounded-md" type="text" />
                                <label className="text-xl" htmlFor="">Senha</label>
                                <div className="w-full flex flex-row justify-center align-middle borda-input pr-2  items-center">
                                    <input type={mostra ? 'password' : 'text'} className="w-full pl-2 py-2 rounded-md bg-transparent focus:outline-none  " />
                                    {mostra ?
                                        (<IoEyeOff className="border-input-olho  " onClick={() => setMostra(false)} />)
                                        : (<IoEye className="border-input-olho  " onClick={() => setMostra(true)} />)}

                                </div>
                                <p className="text-right mb-6 ">Esqueceu a senha?</p>
                                <button className="bg-[#0CC17A] w-3/4 text-2xl py-2 fo rounded-xl m-auto  hover:bg-green-300 font-sans text-[#0e1125]">Entrar</button>
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
                </section>
            </main>
        </>
    )
}
export { Login }