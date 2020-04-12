import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchRepo() {
      const response = await api.get("/repositories");

      setData(response.data);
    }

    fetchRepo();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Conceitos ReactJS",
      url: "https://github.com/tavareshenrique/conceitos-reactjs",
      techs: ["JavaScript", "ReactJS"],
    });

    setData([...data, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setData(data.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {data.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
