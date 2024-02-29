import React, { useEffect, useState } from "react";
import User from "../Users/User";

function Home()
{
    const[users, setUsers] = useState([])
    const[isRender, setIsRender] = useState(false)

    useEffect(() => {
      fetch('https://localhost:7138/users')
        .then((res) => {
          if (res.status === 204) {
            return Promise.resolve([]);
          } else {
            return res.json();
          }
        })
        .then(
          (result) => {
            setUsers(result);
          }
        );
    }, [isRender]);

    return(
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', paddingTop: 50, }}>
        {users.map((user) => (
          <User key={user.id} user={user} isRender={isRender} setIsRender={setIsRender} />
        ))}
      </div>
    )
}
export default Home;