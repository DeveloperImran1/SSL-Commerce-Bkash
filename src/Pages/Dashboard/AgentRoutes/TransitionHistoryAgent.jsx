
import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const TransitionHistoryAgent = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [click, setClick] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo)

    const { data: user, refetch } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${userInfo?.phone}`)
            return res.data;
        }
    })
    console.log(user)
    const myPhone = user?.phone;
    console.log("my phone", myPhone)

    const handleAction = async(action, transitionInfo)=> {
        const agentActionData = {action, transitionInfo, myPhone}
        const data = await axiosSecure.post('/agentAction', agentActionData)
        console.log(data)

        refetch()
    }

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
                            <th className="p-3">Action</th>
                            <th className="p-3">Action</th>
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
                                    <p>{singleTransition?.senderEmail}</p>

                                </td>
                                <td className="p-3">
                                    <p>{singleTransition?.taka}</p>

                                </td>
                                <td className="p-3">
                                    <p>{singleTransition?.status}</p>

                                </td>
                                <td onClick={()=> setClick(true)} className="p-3">
                                    <button onClick={()=> handleAction("Rejected", singleTransition) } className={`btn ${click && 'disabled'}`}>Reject</button>

                                </td>
                                <td onClick={()=> setClick(true)} className="p-3">
                                    <button onClick={()=> handleAction("Accepted", singleTransition)} className={`btn ${click && 'disabled'}`}>Accept</button>
                                </td>

                   

                         
                      
                            </tr>


                        </tbody>)
                    }

                </table>
            </div>
        </div>
    );
};

export default TransitionHistoryAgent;


