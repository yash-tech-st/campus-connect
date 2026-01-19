import { useEffect, useState } from "react";

function Dashboard() {
  const [resources, setResources] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/resources", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((err) => console.error("Error loading resources", err));
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto" }}>
      <h2>Dashboard</h2>

      <button onClick={logout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      <h3>Available Resources</h3>

      {resources.length === 0 && <p>No resources uploaded yet</p>}

      {resources.map((res) => (
        <div
          key={res._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h4>{res.title}</h4>
          <p>Subject: {res.subject}</p>

          {res.fileUrl && (
            <a
              href={res.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              style={{
                display: "inline-block",
                marginTop: "10px",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              Download PDF
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
