import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const MyBalance = () => {
    const axiosPublic = useAxiosPublic();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo)

    const { data:user } = useQuery({
        queryKey: ["userBalance"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${userInfo?.phone}`)
            return res.data;
        }
    })
console.log(user)

    return (
        <div className="w-[350px] mx-auto rounded-2xl bg-white p-6 shadow-lg dark:bg-[#18181B] md:p-8">
            <div className="flex flex-col items-center justify-center space-y-6">
                <svg width={75} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"> <g strokeWidth="0"></g> <g id="navgateui" strokeLinecap="round" strokeLinejoin="round"></g> <g id="navgateui"><path fill="#16BAC5" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"></path></g></svg>
                <h6 className="text-center font-medium text-slate-700 dark:text-white/80">My Current Balance</h6>
                <h6 className="text-center font-medium text-3xl text-slate-700 dark:text-white/80">{user?.balance} Taka</h6>
                <button className="rounded-full bg-[#16BAC5] px-6 py-2 text-white ">Redeem now</button>
            </div>
        </div>
    );
};

export default MyBalance;