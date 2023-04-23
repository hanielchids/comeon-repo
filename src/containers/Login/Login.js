import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import {
  Container,
  Grid,
  Input,
  Form,
  Segment,
  Button,
} from "semantic-ui-react";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (username.length > 0) {
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => {
          console.log("json response is: ", res);
          return res.json();
        })
        .then((resp) => {
          console.log("response is: ", resp);

          if (Object.keys(resp).length === 0) {
            toast.error("Please Enter valid credentials");
          } else if (resp.status === "success") {
            sessionStorage.setItem("username", username);
            navigate("/");
          } else {
            toast.error("Incorrect username/password");
            setPassword("");
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  return (
    <div>
      <Container>
        <Header />
        <Form
          onSubmit={ProceedLoginusingAPI}
          style={{ backgroundColor: "#585858" }}
        >
          <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form.Input
                type="text"
                icon="user"
                value={username}
                placeholder="Username"
                name="username"
                onChange={handleUsernameChange}
              />
              <Form.Input
                type="password"
                value={password}
                icon="lock"
                name="password"
                onChange={handlePasswordChange}
                placeholder="Password"
              />
              <Button
                size="large"
                content="Login"
                color="olive"
                type="submit"
                value="Login"
              />
            </Grid.Column>
          </Grid>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
