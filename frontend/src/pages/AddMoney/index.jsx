import "./styles.css";
import * as React from "react";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import SelectedListItem from "../../components/SelectedListItem";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import Modal from "@mui/material/Modal";
import CardDeposit from "../../components/CardDeposit";
import CardTransfer from "../../components/CardTransfer";
import CardWithdraw from "../../components/CardWithdraw";
import { api } from "../../services/api";
import CardBalance from "../../components/CardBalance";
import { useState, useEffect } from "react";

export function AddMoney() {
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [value, setValue] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState(0);

  const user = localStorage.getItem("@whaticketbank:user");
  const accountsId = JSON.parse(user).accountsId;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await api.get("/accounts/balance");
        setBalance(response.data);
      } catch (error) {
        console.error("Erro ao buscar saldo:", error);
      }
    };
    fetchBalance();
  }, []);

  async function handleAddMoney() {
    if (!value || !accountNumber) {
      setModalMessage("Preencha todos os campos.");
      setOpen(true);
      return;
    }

    const depositValue = Number(value);
    const currentBalance = Number(balance);

    if (Number(accountNumber) !== accountsId) {
      if (currentBalance < depositValue) {
        setModalMessage("Saldo insuficiente para realizar o depósito.");
        setOpen(true);
        return;
      }
    }

    try {
      await api.post("/accounts/addMoney", {
        value: depositValue,
        accountNumber: Number(accountNumber),
      });

      if (Number(accountNumber) === accountsId) {
        setBalance(currentBalance + depositValue);
        setModalMessage("Depósito realizado com sucesso na sua conta!");
      } else {
        setModalMessage("Depósito realizado com sucesso na conta de destino!");
      }

      setValue("");
      setAccountNumber("");
      setOpen(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setModalMessage(
          "Conta inválida. Verifique o número da conta e tente novamente."
        );
      } else {
        setModalMessage("Ocorreu um erro ao processar sua solicitação.");
      }
      setOpen(true);
      console.error("Erro ao realizar o depósito:", error);
    }
  }

  return (
    <Stack spacing={2}>
      <ResponsiveAppBar />
      <Box display="flex" gap={"150px"} padding={"40px"}>
        <Box
          sx={{
            width: "308px",
            flexShrink: 0,
            borderRadius: "10px",
            background: "#FFF",
            boxShadow: "0px 0px 23px -1px rgba(0, 0, 0, 0.10)",
          }}
        >
          <SelectedListItem />
        </Box>

        <Box display="flex" flexDirection="column">
          <Box display="flex" gap="350px">
            <Box
              sx={{
                width: "289px",
                height: "128px",
                flexShrink: 0,
                borderRadius: "10px",
                background: "var(--White-text, #FFF)",
                boxShadow: "0px 0px 23px -1px rgba(50, 50, 50, 0.10)",

                marginRight: "80px",
              }}
            >
              <CardBalance balance={balance} />
            </Box>

            <Box display="flex" gap="80px">
              <CardDeposit isActive={true} />
              <Link to="/transfer" style={{ textDecoration: "none" }}>
                <CardTransfer />
              </Link>
              <Link to="/withdraw" style={{ textDecoration: "none" }}>
                <CardWithdraw />
              </Link>
            </Box>
          </Box>

          <Typography
            sx={{
              color: "#323232;",
              fontFamily: "Poppins, sans-serif",
              fontSize: "23px",
              fontWeight: 400,
              letterSpacing: "-0.46px",
              marginBottom: "24px",
              marginTop: "50px",
            }}
          >
            Depositar valores em conta
          </Typography>

          <TextField
            id="outlined-required"
            label="Digite o número da conta"
            placeholder="Confirme o número da sua conta"
            sx={{
              width: "870px",
              marginBottom: "24px",
            }}
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
          />
          <TextField
            id="outlined-required"
            label="Valor a ser depositado"
            placeholder="Digite o valor a ser depositado"
            sx={{
              width: "870px",
              marginBottom: "24px",
            }}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleAddMoney}
            sx={{
              width: "300px",
              height: "50px",
              marginLeft: "285px",
              fontFamily: "Roboto",
              fontSize: "15px",
              fontWeight: 500,
              borderRadius: "4px",
              marginTop: "30px",
              background: "linear-gradient(90deg, #3956FF 0%, #294279 100%)",
              color: "#FFF",
              "&:hover": {
                background: "linear-gradient(90deg, #294279 0%, #3956FF 100%)",
              },
            }}
          >
            DEPOSITAR DINHEIRO
          </Button>

          <Modal
            aria-labelledby="add-money-modal-title"
            aria-describedby="add-money-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
          >
            <StyledModalContent>
              <Typography id="add-money-modal-title" className="modal-title">
                {modalMessage === "Depósito realizado com sucesso!"
                  ? "Sucesso!"
                  : "Atenção"}
              </Typography>
              <Typography
                id="add-money-modal-description"
                className="modal-description"
              >
                {modalMessage}
              </Typography>
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  width: "330px",
                  height: "50px",
                  fontFamily: "Roboto",
                  fontSize: "15px",
                  fontWeight: 500,
                  borderRadius: "4px",
                  marginTop: "20px",
                  background:
                    "linear-gradient(90deg, #3956FF 0%, #294279 100%)",
                  color: "#FFF",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #294279 0%, #3956FF 100%)",
                  },
                }}
              >
                ENTENDI
              </Button>
            </StyledModalContent>
          </Modal>
        </Box>
      </Box>
    </Stack>
  );
}

const StyledModalContent = styled("div")`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 40px;
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.12);

  & .modal-title {
    color: #112402;
    font-family: "IBM Plex Sans";
    font-size: 24px;
    font-weight: 700;
  }

  & .modal-description {
    text-align: center;
    font-family: "IBM Plex Sans";
    font-size: 17px;
    font-weight: 400;
    color: #000;
  }
`;

const StyledBackdrop = styled("div")`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;
