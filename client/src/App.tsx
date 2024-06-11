import UserTable from "./components/UserTable";
import { AppProvider } from "./contexts/AppContext";
import "./index.css";

function App() {
  return (
    <AppProvider>
      <div>
        <div className="font-sans min-h-screen">
          <UserTable />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
