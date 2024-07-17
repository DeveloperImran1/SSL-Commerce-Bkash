

import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const ManageUser = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [click, setClick] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log(userInfo)

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${userInfo?.phone}`)
            return res.data;
        }
    })
    
    const { data: users, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`)
            return res.data;
        }
    })
    console.log(users)
    

    const handleDisable = async(user)=> {
        const data = await axiosSecure.put('/disable', user)
        console.log(data)
        if(data?.data?.modifiedCount){
            toast.success("He is Pending");
        }
        refetch()
    }

    const handleActive = async(user)=> {
        const data = await axiosSecure.put('/active', user)
        console.log(data)
        if(data?.data?.modifiedCount){
            toast.success("Successfully Active");
            toast.success("Send Bonus 40 taka 1st time");
        }
        refetch()
    }

    return (
        <div>
            <div className="overflow-x-auto border w-full mx-auto bg-[#1313180D] rounded-xl border-black  ">
                <table className="min-w-full text-[16px] font-semibold ">
                    <thead className="dark:bg-gray-300 bg-slate-600 mt-10">
                        <tr className="text-left  leading-none dark:text-gray-600 text-white">
                            <th></th>
                            <th className="p-3">Photo</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Active</th>
                            <th className="p-3">Disable</th>
                        </tr>
                    </thead>
                    {
                        users?.map((singleUser, i) => <tbody key={singleUser?._id}>
                    
                            <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <th>{i + 1}</th>
                           
                                <td className="p-3">
                                    <img className="size-[80px] bg-slate-500 object-cover rounded-lg hover:blur-[2px] duration-500" src={`${singleUser?.photo || "https://i.ibb.co/k3LwX3C/folio-img2-1-1536x960.jpg"}`} alt="avatar navigate ui" />

                                </td>

                                <td className="p-3">
                                    <p>{singleUser?.name}</p>

                                </td>
                                <td className="p-3">
                                    <p>{singleUser?.phone}</p>

                                </td>
                                <td className="p-3">
                                    <p>{singleUser?.role}</p>

                                </td>
                                <td className="p-3">
                                    <p>{singleUser?.status}</p>

                                </td>
                                <td className="p-3">
                                    <button onClick={()=> handleDisable(singleUser) } className={`btn`}>Disable</button>

                                </td>
                                <td  className="p-3">
                                    <button onClick={()=> handleActive(singleUser)} className={`btn `}>Active</button>
                                </td>

                   

                         
                      
                            </tr>


                        </tbody>)
                    }

                </table>
            </div>
        </div>
    );
};

export default ManageUser;


