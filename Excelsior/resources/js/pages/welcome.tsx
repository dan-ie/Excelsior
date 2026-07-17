import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';


export default function Welcome() {
    const { auth } = usePage().props;

    return (

       <>
            <Head title="Excelsior | Certificate maker" />
            <div className="flex min-h-screen flex-col  items-center bg-[#FFFFFF] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-black">
                <header className="mb-6 w-full text-sm not-has-[nav]:hidden ">
                    <nav className="flex items-center justify-end gap-4">

<h1 className="text-6xl text-zinc-600 font-black mr-auto dark:text-white "> Excelsior </h1>
<h1 className="text-lg text-zinc-600 font-normal dark:text-white"> Join us to get started. </h1>


                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className=" inline-block rounded-lg border border-transparent bg-blue-50 px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#A7C7E7] hover:bg-[#E5F3FD] dark:text-[#7F7F7F]  dark:hover:text-[#1b1b18] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={register()}
                                    className="  inline-block rounded-lg border-2 border-[#FF964F] bg-[#FFA05F] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#FED8B1] hover:bg-[#FED0B1] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b] dark:hover:text-[#1b1b18]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full  justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-full flex-col-reverse lg:max-w-full lg:flex-row">
                        <div className="flex-1  flex flex-col justify-center min-h-[500px]  rounded-tl-lg bg-gradient-to-br from-blue-300 via-blue-700 to-indigo-950 p-10 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="text-6xl font-extrabold text-white ">
                                Credential your achievements
                                <br />
                                in minutes!  </h1>
                            <p className="mb-2 text-base italic text-[#E2E8F0] dark:text-[#A1A09A]  dark:text-[#D4D4D4]">
                                <br />
                                ✔️ Secure certificate creation platform for turning your milestones into meaningful credentials.
                                <br />
                                <br/>
                                ✔️ Create professional digital certificates, credentials and badgets with ease.
                                <br />
                                <br/>
                                ✔️ Save hours of manual work and choose from hundreds of customizable templates.


                            </p>
                        </div>
                        <div className="flex-1   flex items-center justify-center relative dark:bg-black">
                         <img
                          src="/images/certificates.png"

                           />
                        <div className="absolute bottom-0 left-0 right-0 h-90 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80"> </div>
                        </div>
                    </main>
                </div>

                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
