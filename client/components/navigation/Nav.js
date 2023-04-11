import React from "react";
import Link from "next/link";

function Nav() {
	return (
		<div className=' h-[64px] bg-blue-200 w-full border-b-2 border-gray-500'>
			<div className=' flex justify-between h-full mx-auto max-w-[1180px]'>
				<Link href='/'>
					<div className=' h-full flex items-center text-3xl font-bold text-blue-600'>
						Dork Movie Review
					</div>
				</Link>
				<div className=' w-[40%] flex gap-12 h-full items-center justify-end text-xl'>
					<Link
						href='/login'
						className=' hover:scale-110 hover:border-2 hover:bg-white rounded-lg border-blue-600 px-5 py-2'
					>
						Login
					</Link>
					<Link
						href='/register'
						className=' hover:scale-110 px-5 py-2 bg-blue-600 rounded-lg text-white'
					>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Nav;
