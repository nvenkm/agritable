import { Text, Button, Stack } from "@mantine/core";
import { ThemeProvider } from "./ThemeProvider";
import MyTable from "./components/MyTable";
import ProductionSortTable from "./components/ProductionSortTable";
import AverageCropYieldTable from "./components/AverageCropYieldTable";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Stack align="center" mt={10}>
          <Routes>
            <Route path="/" element={<ProductionSortTable />} />
            <Route
              path="/average-crop-yield-table"
              element={<AverageCropYieldTable />}
            />
          </Routes>
        </Stack>
      </BrowserRouter>
    </ThemeProvider>
  );
}
