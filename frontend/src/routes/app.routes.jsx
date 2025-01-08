import { Routes, Route, Navigate } from "react-router-dom";

import { AddMoney } from "../pages/AddMoney";
import { Details } from "../pages/Details";
import { TransferMoney } from "../pages/TransferMoney";
import { UpdateAccount } from "../pages/UpdateAccount";
import { WithdrawMoney } from "../pages/WithdrawMoney";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Details />} />
      <Route path="/update" element={<UpdateAccount />} />
      <Route path="/add" element={<AddMoney />} />
      <Route path="/transfer" element={<TransferMoney />} />
      <Route path="/withdraw" element={<WithdrawMoney />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
