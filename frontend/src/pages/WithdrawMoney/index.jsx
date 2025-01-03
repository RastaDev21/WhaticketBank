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
import CardBalance from "../../components/CardBalance";
import CardDeposit from "../../components/CardDeposit";
import CardTransfer from "../../components/CardTransfer";
import CardWithdraw from "../../components/CardWithdraw";
import { api } from "../../services/api";
import { useState, useEffect } from "react";

export function WithdrawMoney() {
  const [isSuccessModalOpen, setSuccessModalOpen] = React.useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = React.useState(false);
  const [withdrawValue, setWithdrawValue] = React.useState("");
  const [balance, setBalance] = useState([]);

  const handleOpenSuccessModal = () => setSuccessModalOpen(true);
  const handleCloseSuccessModal = () => setSuccessModalOpen(false);

  const handleOpenErrorModal = () => setErrorModalOpen(true);
  const handleCloseErrorModal = () => setErrorModalOpen(false);

  const handleAddMoney = () => {
    console.log("Redirecionar para a página de adicionar saldo");
    setErrorModalOpen(false);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await api.get("/accounts/balance");
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Erro ao buscar saldo:", error);
      }
    };
    fetchBalance();
  }, []);

  const handleWithdrawMoney = async () => {
    if (!withdrawValue || Number(withdrawValue) <= 0) {
      handleOpenErrorModal();
      return;
    }

    try {
      await api.post("/accounts/removeMoney", {
        value: Number(withdrawValue),
      });
      setBalance(prev => prev - Number(withdrawValue));
      setWithdrawValue("");
      handleOpenSuccessModal();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        handleOpenErrorModal();
      } else {
        console.error("Erro ao realizar o saque:", error);
      }
    }
  };

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
              <Link to="/add" style={{ textDecoration: "none" }}>
                <CardDeposit />
              </Link>

              <Link to="/transfer" style={{ textDecoration: "none" }}>
                <CardTransfer />
              </Link>
              <CardWithdraw isActive={true} />
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
            Sacar valor de conta corrente
          </Typography>

          <TextField
            id="outlined-required"
            label="Valor a ser sacado"
            placeholder="Digite o valor a ser sacado"
            value={withdrawValue}
            onChange={e => setWithdrawValue(e.target.value)}
            sx={{
              width: "870px",
              marginBottom: "24px",
            }}
          />
          <Button
            variant="contained"
            onClick={handleWithdrawMoney}
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
            SACAR DINHEIRO
          </Button>

          <Modal
            aria-labelledby="transfer-money-modal-title"
            aria-describedby="transfer-money-modal-description"
            open={isSuccessModalOpen}
            onClose={handleCloseSuccessModal}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StyledModalContent>
              <Typography
                id="transfer-money-modal-title"
                className="modal-title"
              >
                Dinheiro sacado
              </Typography>
              <Typography
                id="transfer-money-modal-description"
                className="modal-description"
              >
                Saque autorizado, aguarde a contagem das notas e retire o
                dinheiro.
              </Typography>
              <Button
                variant="contained"
                onClick={handleCloseSuccessModal}
                sx={{
                  marginTop: "20px",
                }}
              >
                ENTENDI
              </Button>
            </StyledModalContent>
          </Modal>

          <Modal
            aria-labelledby="error-modal-title"
            aria-describedby="error-modal-description"
            open={isErrorModalOpen}
            onClose={handleCloseErrorModal}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <StyledModalContent>
              <Typography id="error-modal-title" className="modal-title">
                Erro ao sacar
              </Typography>
              <Typography
                id="error-modal-description"
                className="modal-description"
              >
                Sua conta está sem saldo suficiente para realizar o saque.
                Adicione dinheiro e tente novamente.
              </Typography>
              <Box sx={{ display: "flex", gap: "16px" }}>
                <Button variant="outlined" onClick={handleCloseErrorModal}>
                  CANCELAR
                </Button>
                <Button variant="contained" onClick={handleAddMoney}>
                  ADICIONAR SALDO
                </Button>
              </Box>
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
