"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
// import config from "@/lib/config";

function LoginForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [warning, setWarning] = useState("");
  const axiosClient = axios.create({
    // withCredentials:true
  })

	const postForm = async () => {
		// console.log(username, password);
		if (username !== "" && password !== "") {
			const serverReturn = await axiosClient.post(
				`http://localhost:5000/user/login/`,
				{
					userName: username,
					password: password,
				}
        )
      console.log(serverReturn.data)
			if (serverReturn.data.status >= 400) {
				setWarning(serverReturn.data.message);
			}
		}
	};
	return (
		<div className=' mt-16 w-[400px] mx-auto my-auto relative'>
			<div className=' absolute text-red-500 w-fit mx-auto bottom-[30px]'>
				{warning ? warning : ""}
			</div>
			<div className=' space-y-4'>
				<div className=''>
					<label
						htmlFor='username'
						className=' block  select-none text-lg text-grey-500'
					>
						Username
					</label>
					<input
						id='username'
						className=' focus:outline-none w-full h-8 text-lg px-2 mt-2 rounded-lg'
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
							setWarning("");
						}}
					/>
				</div>
				<div>
					<label
						htmlFor='password'
						className=' block select-none text-lg text-grey-500'
					>
						Password
					</label>
					<input
						id='password'
						type='password'
						className=' focus:outline-none w-full h-8 text-lg px-2 mt-2 rounded-lg'
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
							setWarning("");
						}}
					/>
				</div>
				<div className='flex  h-fit items-center justify-between'>
					<Link href='/register'>
						<h3 className=' text-blue-800 hover:text-blue-900 hover:drop-shadow-xl hover:scale-105'>
							Create Account
						</h3>
					</Link>
					<button
						className=' px-6 py-2 bg-blue-400 rounded-lg text-xl text-white hover:bg-blue-500'
						onClick={postForm}
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}

export default LoginForm;
