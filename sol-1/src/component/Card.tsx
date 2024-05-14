import React, { useState } from "react";
import axios from "axios";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface CardProps {
  name: string;
}

const Card: React.FC<CardProps> = ({ name }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [b, setB] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://reqres.in/api/users?page=1");
      const userData = response.data;
      setUsers(userData.data);
      setB(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      {!b && (
        <React.Fragment>
          <div>{name}</div>
          <button onClick={fetchDetails}>Get Users</button>
        </React.Fragment>
      )}
      {b && users.length > 0 && (
        <div>
          <h2>User Details:</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <strong>Name:</strong> {user.first_name} {user.last_name}
                <br />
                <strong>Email:</strong> {user.email}
                <br />
                <img src={user.avatar} alt={`Avatar of ${user.first_name}`} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Card;
