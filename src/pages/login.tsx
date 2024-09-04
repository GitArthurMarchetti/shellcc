import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GiTurtle } from "react-icons/gi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Login() {
    const [mostra, setMostra] = useState(true)
    const navigate = useNavigate()
    return (
        <>
            <main className="fonthome bg-bgColor h-[100vh] text-primaryColor">
                <section className="flex w-11/12 m-auto justify-center items-center h-full">
                    <div className="flex border-solid  border-[#191d41] shadow-sm shadow-white rounded-3xl flex-col text-center justify-between p-7 h-3/4 border-4 w-1/3 m-auto ">
                        <div className="flex flex-col">
                            <p className="text-xl ">
                                <b>Seja Bem-Vindo</b>
                            </p>
                            <h1 className="fontTitle text-8xl text-[#FFB800]">
                                Shellcc
                            </h1>
                            <p className="w-3/4 m-auto text-left">
                                <br />A Shellcc auxilia na administração de ativos e no desenvolvimento do seu negócio. Com foco em maximizar valores, oferecemos suporte estratégico e personalizado para impulsionar seu sucesso.
                            </p>
                        </div>
                        <div>
                            <p className="text-lg mb-2">Ainda não possui conta?</p>
                            <button className="text-2xl bg-[#FFB800] font-semibold  p-4 rounded-xl px-20 text-[#fff] font-sans " onClick={() => navigate("/signin")}>Criar conta</button>
                        </div>
                    </div>
                    <div className="w-[30%] m-auto flex flex-col justify-center">
                        <div className="bg-[#0CC17A] w-[150px] m-auto flex justify-center h-[150px] items-center rounded-full mb-4 ">
                            <GiTurtle size={100} />
                        </div>
                        <div className="flex flex-col">
                            <form action="" className="flex flex-col gap-3 mt-6">
                                <label className=" text-2xl" htmlFor="">Email</ label>
                                <input className="mt-1 bg-transparent focus:outline-none borda-input w-full px-2 py-2 rounded-sm" type="text" />
                                <label className="mt-1 text-2xl" htmlFor="">Senha</label>
                                <div className="mt-1 w-full flex flex-row justify-center align-middle borda-input rounded-sm pr-2  items-center">
                                    <input type={mostra ? 'password' : 'text'} className="w-full pl-2 py-2  rounded-md bg-transparent focus:outline-none  " />
                                    {mostra ?
                                        (<IoEyeOff className="border-input-olho  " size={25} onClick={() => setMostra(false)} />)
                                        : (<IoEye className="border-input-olho  " size={25} onClick={() => setMostra(true)} />)}

                                </div>
                                <p className="text-right mb-6 underline mt-1">Esqueceu a senha?</p>
                                <button className="bg-[#0CC17A] w-3/4 text-2xl font-semibold py-4 fo rounded-xl m-auto duration-500  hover:bg-green-300 font-sans text-[#fff]" onClick={() => navigate("/dashboard")}>Entrar</button>
                            </form>
                            <div className="flex flex-col justify-center items-center mt-3 gap-2">
                                <p className="text-[20px] p-2 ">
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