import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <h1>Campus Connect</h1>
      {token ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;
