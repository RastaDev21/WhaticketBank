import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { Details } from "./pages/Details";
import { UpdateAccount } from "./pages/UpdateAccount";
import { AddMoney } from "./pages/AddMoney";
import { TransferMoney } from "./pages/TransferMoney";
import { WithdrawMoney } from "./pages/WithdrawMoney";
import theme from "./styles/theme";
import CssBaseline from "@mui/material/CssBaseline";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Details /> */}
      {/* <UpdateAccount /> */}
      {/* <AddMoney /> */}
      {/* <TransferMoney /> */}
      <WithdrawMoney />
    </ThemeProvider>
  </StrictMode>
);
