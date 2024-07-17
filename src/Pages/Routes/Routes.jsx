import {
    createBrowserRouter,
  } from "react-router-dom";
import MainDashboard from "../Dashboard/MainDashboard";
import Register from "../Register/Register";
import Login from "../Login/Login";
import DashboardHome from "../Dashboard/DashboardHome";
import UserProfile from "../Dashboard/UserRoutes/UserProfile";
import SendMoney from "../Dashboard/UserRoutes/SendMoney";
import CashOut from "../Dashboard/UserRoutes/CashOut";
import CashIn from "../Dashboard/UserRoutes/CashIn";
import MyBalance from "../Dashboard/UserRoutes/MyBalance";
import TransictionHistory from "../Dashboard/UserRoutes/TransictionHistory";
import TransitionHistoryAgent from "../Dashboard/AgentRoutes/TransitionHistoryAgent";
import ManageUser from "../Dashboard/AdminRoutes/ManageUser";
  

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainDashboard></MainDashboard>,
      children: [
        // user er jonno routes
        {
          path: '/',
          element: <DashboardHome></DashboardHome>,
          children: [
            {
              path: "/",
              element: <UserProfile></UserProfile>
            },
            {
              path: "/dashboard/sendmoney",
              element: <SendMoney></SendMoney>
            },
            {
              path: "/dashboard/cashout",
              element: <CashOut></CashOut>
            },
            {
              path: "/dashboard/cashin",
              element: <CashIn></CashIn>
            },
            {
              path: "/dashboard/mybalance",
              element: <MyBalance></MyBalance>
            },
            {
              path: "/dashboard/history",
              element: <TransictionHistory></TransictionHistory>
            },
            {
              path: "/dashboard/historyAgent",
              element: <TransitionHistoryAgent></TransitionHistoryAgent>
            },
            {
              path: "/dashboard/manageUser",
              element: <ManageUser></ManageUser>
            },

          ]
        },
      
      ]
    },
    {
      path: '/register',
      element: <Register></Register>
    },
    {
      path: '/login',
      element: <Login></Login>
    },
  ]);

  export default router;