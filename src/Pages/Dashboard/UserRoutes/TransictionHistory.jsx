import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const TransictionHistory = () => {
    const axiosPublic = useAxiosPublic();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo)

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${userInfo?.phone}`)
            return res.data;
        }
    })
    console.log(user)

    return (
        <div>
            <div className="overflow-x-auto border w-full mx-auto bg-[#1313180D] rounded-xl border-black  ">
                <table className="min-w-full text-[16px] font-semibold ">
                    <thead className="dark:bg-gray-300 bg-slate-600 mt-10">
                        <tr className="text-left  leading-none dark:text-gray-600 text-white">
                            <th></th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Reciver Phone</th>
                            <th className="p-3">Balance</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    {
                        user?.transition?.map((singleTransition, i) => <tbody key={i}>
                    
                            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <th>{i + 1}</th>
                           

                                <td className="p-3">
                                    <p>{singleTransition?.type}</p>

                                </td>
                                <td className="p-3">
                                    <p>{singleTransition?.taka}</p>

                                </td>
                                <td className="p-3">
                                    <p>{singleTransition?.reciverPhone}</p>

                                </td>
                                <td className="p-3">
                                    <p>{singleTransition?.status || "Success"}</p>

                                </td>

                   

                         
                      
                            </tr>


                        </tbody>)
                    }

                </table>
            </div>
        </div>
    );
};

export default TransictionHistory;


