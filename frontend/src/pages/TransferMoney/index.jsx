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

export function TransferMoney() {
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [transferValue, setTransferValue] = useState("");
  const [balance, setBalance] = useState([]);
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

  async function handleTransferMoney() {
    if (!destinationAccount || !transferValue) {
      setModalMessage("Preencha todos os campos.");
      handleOpen();
      return;
    }

    try {
      const response = await api.post("/accounts/transfer", {
        accountTo: Number(destinationAccount),
        value: Number(transferValue),
      });

      if (Number(destinationAccount) !== accountsId) {
        setBalance(Number(balance) - Number(transferValue));
        setModalMessage("Transferência realizada com sucesso!");
      } else {
        setModalMessage("Você não pode transferir pra sua propia conta ");
      }

      setDestinationAccount("");
      setTransferValue("");
      handleOpen();
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setModalMessage("Conta de destino inválida. Verifique os dados.");
      } else if (error.response && error.response.status === 400) {
        setModalMessage("Saldo insuficiente para realizar a transferência.");
      } else {
        setModalMessage("Ocorreu um erro ao processar sua solicitação.");
      }
      handleOpen();
      console.error("Erro ao realizar transferência:", error);
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
              <Link to="/add" style={{ textDecoration: "none" }}>
                <CardDeposit />
              </Link>
              <CardTransfer isActive={true} />
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
            Transferir valores para outra conta
          </Typography>

          <TextField
            id="destination-account"
            label="Conta de destino"
            placeholder="Insira os dados da conta de destino"
            sx={{
              width: "870px",
              marginBottom: "24px",
            }}
            value={destinationAccount}
            onChange={e => setDestinationAccount(e.target.value)}
          />
          <TextField
            id="transfer-value"
            label="Valor a ser transferido"
            placeholder="Digite o valor a ser transferido"
            sx={{
              width: "870px",
              marginBottom: "24px",
            }}
            value={transferValue}
            onChange={e => setTransferValue(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleTransferMoney}
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
            TRANSFERIR DINHEIRO
          </Button>

          <Modal
            aria-labelledby="transfer-money-modal-title"
            aria-describedby="transfer-money-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
          >
            <StyledModalContent>
              <Typography
                id="transfer-money-modal-title"
                className="modal-title"
              >
                {modalMessage === "Transferência realizada com sucesso!"
                  ? "Sucesso!"
                  : "Atenção"}
              </Typography>
              <Typography
                id="transfer-money-modal-description"
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
