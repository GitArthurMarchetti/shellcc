import { FaGoogle } from "react-icons/fa"
import { GiTurtle } from "react-icons/gi"

function Login() {
    return (
        <>
            <main className="bg-bgColor h-[100vh] text-primaryColor">
                <section className="flex w-11/12 m-auto justify-center items-center h-full">
                    <div className="flex border-dashed flex-col text-center justify-between p-7 h-3/4 border-4 w-1/4 m-auto">
                        <div className="flex flex-col">
                            <p className="text-xl">
                                Welcome to
                            </p>
                            <h1 className="fontTitle text-8xl">
                                Shellcc
                            </h1>
                            <p className="w-3/4 m-auto text-left">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, veritatis nulla doloribus odit illum tenetur minima dolorum beatae id repellendus. Reiciendis quam dolore eos qui. Cupiditate nemo nisi reprehenderit fuga!
                            </p>
                        </div>
                        <div>
                            <p className="text-xl">Ainda não possui conta?</p>
                            <button className="text-2xl bg-[#FFB800] p-4 rounded-xl px-10 text-black">Criar conta</button>
                        </div>
                    </div>
                    <div className="w-1/4 m-auto flex flex-col justify-center">
                        <div className="bg-[#0CC17A] w-20 m-auto flex justify-center h-20 items-center rounded-full ">
                            <GiTurtle size={60} />
                        </div>
                        <div className="flex flex-col">
                            <form action="" className="flex flex-col gap-2">
                                <label htmlFor="">Email</label>
                                <input className="bg-transparent  borda-input" type="text" />
                                <label htmlFor="">Senha</label>
                                <input type="password" />
                                <p className="text-right">Esqueceu a senha?</p>
                                <button className="bg-[#0CC17A] w-1/2 text-xl py-2 font-bold rounded-xl m-auto">Entrar</button>
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
                </section>
            </main>
        </>
    )
}
export { Login }