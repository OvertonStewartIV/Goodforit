import { createBrowserRouter, Navigate, Outlet } from "react-router";
import Layout from "./components/Layout";
import RequireOnboarding from "./components/RequireOnboarding";
import Onboarding from "./pages/Onboarding";
import SearchPage from "./pages/SearchPage";
import ConnectWorld from "./pages/ConnectWorld";
import TrustIncome from "./pages/TrustIncome";
import TopUp from "./pages/TopUp";
import PendingDetails from "./pages/PendingDetails";
import Deals from "./pages/Deals";
import Pending from "./pages/Pending";
import Dashboard from "./pages/Dashboard";
import Draft from "./pages/Draft";
import CommunityFeed from "./pages/CommunityFeed";
import Loans from "./pages/Loans";
import LoanDetails from "./pages/LoanDetails";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/Profile";
import Contract from "./pages/Contract";
import ContractDetails from "./pages/ContractDetails";
import Settings from "./pages/Settings";
import ExchangeSettings from "./pages/ExchangeSettings";
import Safety from "./pages/Safety";
import AIInsights from "./pages/AIInsights";
import Matchmaking from "./pages/Matchmaking";
import Cards from "./pages/Cards";
import Rewards from "./pages/Rewards";
import Vouch from "./pages/Vouch";
import Request from "./pages/Request";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Onboarding />,
  },
  {
    path: "/app",
    element: (
      <RequireOnboarding>
        <Layout />
      </RequireOnboarding>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/app/home" replace />,
      },
      {
        path: "connect",
        element: <ConnectWorld />,
      },
      {
        path: "topup",
        element: <TopUp />,
      },
      {
        path: "trust-income",
        element: <TrustIncome />,
      },
      {
        path: "home",
        element: <Dashboard />,
      },
      {
        path: "deals",
        element: <Deals />,
      },
      {
        path: "pending",
        element: <Pending />,
      },
      {
        path: "pending/:id",
        element: <PendingDetails />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "add",
        element: <Draft />,
      },
      {
        path: "feed",
        element: <CommunityFeed />,
      },
      {
        path: "loans",
        element: <Loans />,
      },
      {
        path: "loans/:id",
        element: <LoanDetails />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "user/:username",
        element: <UserProfile />,
      },
      {
        path: "contract",
        element: <Contract />,
      },
      {
        path: "contract/:id",
        element: <ContractDetails />,
      },
      {
        path: "vouch",
        element: <Vouch />,
      },
      {
        path: "request",
        element: <Request />,
      },
      {
        path: "exchange",
        element: <ExchangeSettings />,
      },
      {
        path: "safety",
        element: <Safety />,
      },
      {
        path: "insights",
        element: <AIInsights />,
      },
      {
        path: "matchmaking",
        element: <Matchmaking />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "rewards",
        element: <Rewards />,
      },
    ],
  },
]);
