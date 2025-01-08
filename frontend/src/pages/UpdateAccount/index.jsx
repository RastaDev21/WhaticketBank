import "./styles.css";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import * as React from "react";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import SelectedListItem from "../../components/SelectedListItem";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { styled, css } from "@mui/system";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { api } from "../../services/api";

export function UpdateAccount() {
  const { user, updateProfile, signOut } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [balanceModal, setBalanceModal] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState(user.name);
  const [Rg, setRg] = useState(user.Rg);
  const [Cpf, setCpf] = useState(user.Cpf);
  const [data_de_nascimento, setData_de_nascimento] = useState(
    user.data_de_nascimento
  );
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();
  const accountsId = user.accountsId;

  async function handleUpdate() {
    const user = {
      name,
      Rg,
      Cpf,
      data_de_nascimento,
      password: passwordNew,
      old_password: passwordOld,
      accountsId,
    };
    await updateProfile({ user });
  }

  const handleDeleteAccount = async () => {
    const userId = user.id;

    try {
      await api.delete(`/accounts/accountsClosure`, {
        data: { userId, accountNumber: user.accountsId },
      });

      setOpen(false);
      setSuccessModal(true);

      setTimeout(() => {
        setSuccessModal(false);
        signOut();
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Erro ao deletar conta:", error.response.data.error);

      if (error.response?.data?.error?.includes("saldo positivo")) {
        setOpen(false);
        setBalanceModal(true);
      }
    }
  };

  useEffect(() => {
    console.log("Dados do usuário:", user);
  }, [user]);

  return (
    <Stack spacing={2}>
      <ResponsiveAppBar />
      <Box display="flex" gap={"30px"} padding={"40px"}>
        <Box
          sx={{
            width: "308px",
            flexShrink: 0,
            borderRadius: "10px",
            background: "#FFF",
            boxShadow: "0px 0px 23px -1px rgba(0, 0, 0, 0.10)",
            marginLeft: "25px",
          }}
        >
          <SelectedListItem />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          marginLeft={"130px"}
        >
          <Box display="flex" width={"695px"} marginTop={"35px"}>
            <Typography
              sx={{
                flexGrow: 1,
                color: "#323232;",
                fontFamily: "Poppins, sans-serif",
                fontSize: "23px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
                letterSpacing: "-0.46px",
                marginBottom: "24px",
              }}
            >
              Meus dados
            </Typography>
          </Box>

          <Box marginBottom={"35px"}>
            <TextField
              id="outlined-required"
              label="Nome completo"
              sx={{
                width: "750px",
                marginRight: "50px",
              }}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              id="outlined-required"
              label="CPF"
              sx={{
                width: "350px",
                marginRight: "50px",
              }}
              disabled
              value={Cpf}
              onChange={e => setCpf(e.target.value)}
            />
            <TextField
              id="outlined-required"
              label="RG"
              sx={{
                width: "350px",
                marginRight: "50px",
              }}
              disabled
              value={Rg}
              onChange={e => setRg(e.target.value)}
            />
            <TextField
              id="outlined-required"
              label="Data de nascimento"
              sx={{
                width: "300px",
              }}
              disabled
              value={data_de_nascimento}
              onChange={e => setData_de_nascimento(e.target.value)}
            />
          </Box>

          <Typography
            sx={{
              color: "#323232;",
              fontFamily: "Poppins, sans-serif",
              fontSize: "23px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              letterSpacing: "-0.46px",
              marginTop: "40px",
              marginBottom: "30px",
            }}
          >
            Sua senha
          </Typography>
          <Box>
            <TextField
              id="outlined-password-input"
              label="Senha atual"
              type="password"
              autoComplete="current-password"
              sx={{
                width: "750px",
                marginRight: "50px",
                marginBottom: "30px",
              }}
              onChange={e => setPasswordOld(e.target.value)}
            />
            <TextField
              id="outlined-password-input"
              label="Nova senha"
              type="password"
              autoComplete="current-password"
              sx={{
                width: "750px",
                marginRight: "50px",
                marginBottom: "30px",
              }}
              onChange={e => setPasswordNew(e.target.value)}
            />

            <Button
              variant="contained"
              sx={{
                width: "300px",
                height: "50px",
                color: "rgba(0, 0, 0, 0.26)",
                fontFamily: "Roboto",
                fontSize: "15px",
                fontStyle: "normal",
                fontWeight: 500,
                letterSpacing: "0.46px",
                backgroundColor: "rgba(0, 0, 0, 0.12)",
                "&:hover": {
                  backgroundColor: "rgba(9, 9, 9, 0.438)",
                },
              }}
              onClick={handleUpdate}
            >
              Salvar
            </Button>
          </Box>

          <Typography
            sx={{
              color: "#323232;",
              fontFamily: "Poppins, sans-serif",
              fontSize: "23px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              letterSpacing: "-0.46px",
            }}
          >
            Excluir minha conta
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleOpen}
            sx={{
              display: "inline-flex",
              height: "52px",
              width: "220px",
              marginTop: "30px",
              flexDirection: "column",
              justifyContent: "center",
              flexShrink: 0,
              borderRadius: "4px",
              backgroundColor: "#FF8587",
              "&:hover": {
                backgroundColor: "#FF6F71",
              },
            }}
          >
            Excluir Conta
          </Button>

          <Modal
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
          >
            <StyledModalContent>
              <Typography id="delete-modal-title" className="modal-title">
                Você tem certeza?
              </Typography>
              <Typography
                id="delete-modal-description"
                className="modal-description"
              >
                Você tem certeza que quer{" "}
                <span className="modal-warning">
                  deletar sua conta de forma permanente?
                </span>
              </Typography>
              <Box display="flex" justifyContent="center" gap={2} marginTop={2}>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{
                    backgroundColor: "#E0E0E0",
                    color: "#000",
                    "&:hover": { backgroundColor: "#C0C0C0" },
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteAccount}
                  sx={{
                    backgroundColor: "#FF8587",
                    "&:hover": { backgroundColor: "#FF6F71" },
                  }}
                >
                  Sim, quero deletar
                </Button>
              </Box>
            </StyledModalContent>
          </Modal>

          <Modal
            aria-labelledby="balance-modal-title"
            aria-describedby="balance-modal-description"
            open={balanceModal}
            onClose={() => setBalanceModal(false)}
            slots={{ backdrop: StyledBackdrop }}
          >
            <StyledModalContent>
              <Typography id="balance-modal-title" className="modal-title">
                Saldo em conta
              </Typography>
              <Typography
                id="balance-modal-description"
                className="modal-description"
              >
                Sua conta possui saldo positivo. <br />
                Por favor, saque todo o saldo antes de tentar excluir sua conta.
              </Typography>
              <Box display="flex" justifyContent="center" marginTop={2}>
                <Button
                  variant="contained"
                  onClick={() => setBalanceModal(false)}
                  sx={{
                    backgroundColor: "#FF8587",
                    "&:hover": { backgroundColor: "#FF6F71" },
                  }}
                >
                  Entendido
                </Button>
              </Box>
            </StyledModalContent>
          </Modal>
        </Box>
      </Box>
    </Stack>
  );
}

const StyledBackdrop = styled("div")`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const StyledModalContent = styled("div")`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 44px;
  padding: 40px;
  width: 420px;
  height: 300px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.12);

  & .modal-title {
    color: #112402;
    font-family: "IBM Plex Sans";
    font-size: 24px;
    font-weight: 700;
    line-height: 33px;
  }

  & .modal-description {
    text-align: center;
    font-family: "IBM Plex Sans";
    font-size: 17px;
    font-weight: 400;
    line-height: 24px;
    color: #000;

    & .modal-warning {
      color: #f22f2a;
      font-weight: 700;
    }
  }
`;
