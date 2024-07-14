import "./App.css";
import Dashboard from "./pages/Dashboard";
import detailCharacter from "./pages/detailCharacter.tsx";
import { ApolloProvider } from "@apollo/client";
import Endpoint from "./api/Endpoint";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <ApolloProvider client={Endpoint}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/char/:id" Component={detailCharacter} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
