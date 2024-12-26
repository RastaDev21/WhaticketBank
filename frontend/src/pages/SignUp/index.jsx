import "./styles.css";
import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import background from "../../assets/image-lateral.png";
import logo from "../../assets/Capa_1.svg";

export function SignUp() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !cpf || !rg || !dateOfBirth || !password) {
      return alert("Preencha todos os campos");
    }

    api
      .post("/users", { name, cpf, rg, dateOfBirth, password })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possível cadastrar");
        }
      });
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            marginBottom: 0,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: "200px",
              height: "50px",
            }}
          />
          <Typography
            sx={{
              color: "#070E39",
              fontFamily: "Poppins, sans-serif",
              fontSize: "30px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              letterSpacing: "-0.46px",
              marginTop: "2px",
            }}
          >
            bank
          </Typography>
        </Box>

        <Typography
          sx={{
            display: "flex",
            width: "482px",
            height: "77px",
            flexDirection: "column",
            justifyContent: "center",
            flexShrink: 0,
            color: "#2C3244",
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "25px",
            letterSpacing: "0.25px",
            marginBottom: 1,
          }}
        >
          Tenha acesso ao primeiro banco integrado aos seus chatbots! Automatize
          processos de pagamentos e receba com facilidade
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "400px",
          }}
        >
          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.54)",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "25px",
              letterSpacing: "0.25px",
            }}
          >
            Qual seu nome completo?
          </Typography>
          <TextField
            label="Insira aqui seu nome completo"
            id="outlined-size-small"
            defaultValue=""
            size="small"
            sx={{
              width: "100%",
            }}
            onChange={e => setName(e.target.value)}
          />
          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.54)",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "25px",
              letterSpacing: "0.25px",
            }}
          >
            Informe seu CPF:
          </Typography>
          <TextField
            label="Insira apenas números"
            id="outlined-size-small"
            defaultValue=""
            size="small"
            sx={{
              width: "100%",
            }}
            onChange={e => setCpf(e.target.value)}
          />
          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.54)",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "25px",
              letterSpacing: "0.25px",
            }}
          >
            Informe seu RG:
          </Typography>
          <TextField
            label="Insira apenas números"
            id="outlined-size-small"
            defaultValue=""
            size="small"
            sx={{
              width: "100%",
            }}
            onChange={e => setRg(e.target.value)}
          />
          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.54)",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "25px",
              letterSpacing: "0.25px",
            }}
          >
            Qual sua data de nascimento?
          </Typography>
          <TextField
            label="Insira apenas números"
            id="outlined-size-small"
            defaultValue=""
            size="small"
            sx={{
              width: "100%",
            }}
            onChange={e => setDateOfBirth(e.target.value)}
          />

          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.54)",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "25px",
              letterSpacing: "0.25px",
            }}
          >
            Senha:
          </Typography>
          <TextField
            label="Insira sua senha"
            id="outlined-password"
            defaultValue=""
            size="small"
            type="password"
            sx={{
              width: "100%",
            }}
            onChange={e => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            sx={{
              width: "300px",
              height: "50px",
              alignSelf: "center",
              fontFamily: "Roboto",
              fontSize: "15px",
              fontWeight: 500,
              borderRadius: "50px",
              marginTop: "10px",
              background: "linear-gradient(90deg, #3956FF 0%, #294279 100%)",
              color: "#FFF",
              "&:hover": {
                background: "linear-gradient(90deg, #294279 0%, #3956FF 100%)",
              },
            }}
            onClick={handleSignUp}
          >
            Criar minha conta
          </Button>

          <Button
            component={Link}
            to="/"
            variant="text"
            sx={{
              width: "300px",
              height: "50px",
              alignSelf: "center",
              fontFamily: "Roboto",
              fontSize: "18px",
              fontWeight: 500,
              color: "#3956FF",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Voltar para o login
          </Button>
        </Box>

        <Typography
          sx={{
            marginTop: 4,
            marginBottom: 1, // Espaço inferior para evitar que fique grudado
            width: "418.158px",
            height: "56.763px",
            textAlign: "center",
            fontFamily: "Poppins",
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: "20px", // 166.667%
            flexShrink: 0,
          }}
        >
          <span
            style={{
              color: "#3956FF",
              fontWeight: 600,
            }}
          >
            Copyright ©Whaticket 2024
          </span>
          <br />
          <span
            style={{
              color: "#9797A5",
              fontWeight: 400,
            }}
          >
            This site is protected by reCAPTCHA Enterprise and the Google
          </span>
          <br />
          <span
            style={{
              color: "#3956FF",
              fontWeight: 200,
            }}
          >
            Privacy Policy
          </span>
          <span
            style={{
              color: "#9797A5",
              fontWeight: 400,
            }}
          >
            {" "}
            and{" "}
          </span>
          <span
            style={{
              color: "#3956FF",
              fontWeight: 200,
            }}
          >
            Terms of Service
          </span>
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${background})`,
          backgroundColor: "lightgray",
          backgroundPosition: "50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderRadius: "80px 0px 0px 80px",
        }}
      />
    </Box>
  );
}