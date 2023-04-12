
import LoginForm from "@/components/loginform/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
	
	return (
		<main className=' w-full h-screen flex justify-center items-center'>
			<div className=' w-[600px] h-[400px] bg-blue-100 rounded-xl shadow-xl'>
				<div className='w-full h-16 bg-blue-400 flex justify-center items-center rounded-t-xl drop-shadow-lg'>
					<h1 className=' text-3xl font-bold text-blue-50 drop-shadow-lg tracking-widest'>
						Login
					</h1>
				</div>
				<LoginForm/>
			</div>
		</main>
	);
}
