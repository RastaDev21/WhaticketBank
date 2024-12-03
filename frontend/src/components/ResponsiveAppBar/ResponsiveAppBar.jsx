import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { WhaticketMark } from "../WhaticketMark/WhaticketMark";

export default function ResponsiveAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #3956FF 0%, #294279 100%)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
          // marginBottom: "50px",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Box sx={{ marginLeft: "40px", marginTop: "8px" }}>
              <WhaticketMark />
            </Box>
          </IconButton>
          <Typography
            component="div"
            sx={{
              flexGrow: 1,
              color: "#FFF",
              fontFamily: "Poppins, sans-serif",
              fontSize: "23px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              letterSpacing: "-0.46px",
              marginLeft: "-20px",
            }}
          >
            bank
          </Typography>
          <Typography
            component="div"
            sx={{
              color: "#FFF",
              fontFamily: "Poppins, sans-serif",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              marginRight: "40px",
            }}
          >
            Número da conta: 3454
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}