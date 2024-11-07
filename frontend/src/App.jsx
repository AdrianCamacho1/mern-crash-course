import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import UI from "./pages/UI"
import CreatePage from "./pages/CreatePage";
import OwnerPage from "./pages/OwnerPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<Navbar />
			<Routes>
				<Route path='/' element={<UI />} />
				<Route path='/Cart' element={<CartPage />} />
				<Route path='/Owner' element={<OwnerPage />} />
				<Route path='/create' element={<CreatePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/Register" element={<RegisterPage />} />
			</Routes>
		</Box>
	);
}

export default App;