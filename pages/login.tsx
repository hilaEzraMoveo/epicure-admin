import { useState } from "react";
import { HttpClientService } from "@/services/HttpClient.service";
import { useRouter } from "next/router";
import {
  TextField,
  Button,
  Typography,
  makeStyles,
  Container,
} from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await HttpClientService.post(`/users/login`, {
        email: email,
        password: password,
      });
      sessionStorage.setItem("token", response.data as string);
      router.push("/");
    } catch (error) {
      console.log("not valid values");
      alert("User not found- Please provide a valid username and password");
      router.push("/login");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submitButton"
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;

// <form onSubmit={handleSubmit}>
//   <input
//     type="email"
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//     placeholder="Email"
//   />
//   <input
//     type="password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//     placeholder="Password"
//   />
//   <button type="submit">Login</button>
// </form>
