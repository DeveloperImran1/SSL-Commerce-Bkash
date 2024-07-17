import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import UserDashboard from "./UserDashboard";
import AgentDashboard from "./AgentDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardHome = () => {
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
            <UserDashboard></UserDashboard>
            {
                // user?.role === "user" ? <UserDashboard></UserDashboard> : user?.role === "agent" ? <AgentDashboard></AgentDashboard>: <AdminDashboard></AdminDashboard>
            }
            
        </div>
    );
};

export default DashboardHome;