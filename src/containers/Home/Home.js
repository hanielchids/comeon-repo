import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Games from "../../components/Games/Games";
import { Image, Menu } from "semantic-ui-react";
import logo from "../../images/logo.svg";

const Home = () => {
  const username = sessionStorage.getItem("username");
  const [fullname, setFullName] = useState([]);
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();

  const Logout = (e) => {
    e.preventDefault();
    if (username.length > 0) {
      fetch("http://localhost:3001/logout", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      })
        .then((res) => {
          navigate("/login");
          return res.json();
        })
        .catch((err) => {
          console.error("Logout failed due to: ", err.message);
        });
    }
  };

  const getUser = async (e) => {
    await fetch("http://localhost:3001/players", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        for (let i = 0; i < 3; i++) {
          if (data[i].id === username) {
            setFullName(data[i].name);
            setAvatar(data[i].avatar);
          }
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Menu stackable style={{ backgroundColor: "#585858" }}>
        <Menu.Item>
          <Image src={logo} style={{ height: 50 }} centered />
        </Menu.Item>
        <Menu.Item style={{ color: "white", fontSize: "20px" }}>
          <Image src={avatar} style={{ height: 45 }} alt="" />{" "}
          <span style={{ marginLeft: 10 }}>Welcome, {fullname}</span>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            style={{ backgroundColor: "#cc0000", fontSize: 20, color: "white" }}
            name="Logout"
            onClick={Logout}
            icon="power off"
          />
        </Menu.Menu>
      </Menu>

      <Games />
    </div>
  );
};

export default Home;
