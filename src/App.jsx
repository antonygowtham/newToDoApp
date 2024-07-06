import React, { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import Filter from "./components/Filter";
import axios from "axios";
import { useCookies } from "react-cookie";

function App() {
  const serverUrl = import.meta.env.VITE_SERVERURL;

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const userId = cookies.UserId;

  const [tasks, setTasks] = useState(null);
  const [types, setTypes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(url, setState) {
    try {
      const response = await axios.get(url);
      setState(response.data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const getData = () => fetchData(`${serverUrl}/todos/${userId}`, setTasks);
  const getFinishedTasks = () => fetchData(`${serverUrl}/todos/${userId}/is_finished/true`, setTasks);
  const getFilteredTasks = (category) => fetchData(`${serverUrl}/todos/${userId}/category/${category}`, setTasks);
  const getTypes = () => fetchData(`${serverUrl}/types/${userId}`, setTypes);

  useEffect(() => {
    if (authToken) {
      getData();
      getTypes();
    }
  }, [authToken]);

  if (!authToken) {
    return <Auth />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="App">
      <div className="container shadow py-3 px-5 mt-3">
        <div className="row shadow p-3">
          <ListHeader getData={getData} />
        </div>
        <hr />
        <div className="row btn-group">
          <button type="button" className="btn btn-secondary" onClick={getData}>All</button>
          {types?.map((type, index) => (
            <Filter key={index} type={type} getFilteredTasks={getFilteredTasks} />
          ))}
          <button type="button" className="btn btn-secondary" onClick={getFinishedTasks}>Finished</button>
        </div>
        <div className="row shadow p-3">
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
