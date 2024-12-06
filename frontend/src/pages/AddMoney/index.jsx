import "./styles.css";
import * as React from "react";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import SelectedListItem from "../../components/SelectedListItem";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import Modal from "@mui/material/Modal";
import Card from "../../components/CardBalance"; // Card para saldo disponível
import CardDeposit from "../../components/CardDeposit"; // Botão para depósito
import CardTransfer from "../../components/CardTransfer"; // Botão para transferência
import CardWithdraw from "../../components/CardWithdraw"; // Botão para saque

export function AddMoney() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <Card />
            </Box>

            <Box display="flex" gap="80px">
              <CardDeposit isAddMoneyPage={true} />
              <CardTransfer />
              <CardWithdraw />
            </Box>
          </Box>

          <Typography
            sx={{
              // flexGrow: 1,
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
            label="Dados da conta"
            placeholder="Confirme os dados da sua conta"
            sx={{
              width: "870px",
              marginBottom: "24px",
            }}
          />
          <TextField
            id="outlined-required"
            label="Valor a ser depositado"
            placeholder="Digite o valor a ser depositado"
            sx={{
              width: "870px",
              marginBottom: "24px",
            }}
          />
          <Button
            variant="contained"
            onClick={handleOpen}
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
            ADICIONAR DINHEIRO
          </Button>

          {/* Modal */}
          <Modal
            aria-labelledby="add-money-modal-title"
            aria-describedby="add-money-modal-description"
            open={open}
            onClose={handleClose}
            slots={{ backdrop: StyledBackdrop }}
          >
            <StyledModalContent>
              <Typography id="add-money-modal-title" className="modal-title">
                Dinheiro adicionado
              </Typography>
              <Typography
                id="add-money-modal-description"
                className="modal-description"
              >
                Seu dinheiro foi adicionado com sucesso à sua conta! Verifique
                seu extrato.
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
