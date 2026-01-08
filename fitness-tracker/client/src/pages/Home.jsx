import React, { useContext } from "react";
import { AuthContext } from "../../helpers/AuthContext";

function Home() {
  const { userInfo } = useContext(AuthContext);
  return (
    <div>
      <div>{userInfo.name}</div>
      <img src={userInfo.picture} />
    </div>
  );
}

export default Home;
