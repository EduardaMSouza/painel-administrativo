import DashboardClients from "../components/Dashboard/Dashboard";
import { UsersProvider } from "../context/UsersContext";

function Dashboard(): JSX.Element {
    return (
        <>
        <UsersProvider>
            <DashboardClients/>
        </UsersProvider>
        </>
    );
}

export default Dashboard;