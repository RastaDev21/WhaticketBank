import "./styles.css";
import * as React from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "../../components/ResponsiveAppBar";
import SelectedListItem from "../../components/SelectedListItem";
import Card from "../../components/CardBalance";
import Table from "../../components/Table";
import CardDeposit from "../../components/CardDeposit";
import CardTransfer from "../../components/CardTransfer";
import CardWithdraw from "../../components/CardWithdraw";

export function Details() {
  return (
    <Stack spacing={2}>
      <ResponsiveAppBar />

      <Box display="flex" gap={"30px"} padding={"40px"}>
        <Box
          sx={{
            width: "308px",
            flexShrink: 0,
            // marginLeft: "40px",
            // marginRight: "40px",
            borderRadius: "10px",
            background: "#FFF",
            boxShadow: "0px 0px 23px -1px rgba(0, 0, 0, 0.10)",
          }}
        >
          <SelectedListItem />
        </Box>

        <Box display="flex" flexDirection="column" flexGrow={1} gap={2}>
          <Box display="flex" gap="600px" marginBottom={"20px"}>
            <Box
              sx={{
                width: "289px",
                height: "128px",
                flexShrink: 0,
                borderRadius: "10px",
                background: "var(--White-text, #FFF)",
                boxShadow: "0px 0px 23px -1px rgba(50, 50, 50, 0.10)",
              }}
            >
              <Card />
            </Box>

            <Box display="flex" gap="80px">
              <Link to="/add" style={{ textDecoration: "none" }}>
                <CardDeposit />
              </Link>

              <Link to="/transfer" style={{ textDecoration: "none" }}>
                <CardTransfer />
              </Link>

              <Link to="/withdraw" style={{ textDecoration: "none" }}>
                <CardWithdraw />
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              background: "#FFF",
              borderRadius: "10px",
              boxShadow: "0px 0px 23px -1px rgba(0, 0, 0, 0.10)",
            }}
          >
            <Table />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
