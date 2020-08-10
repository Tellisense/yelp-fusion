import React from "react";
import PageLayout from "./components/Container";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Home";

const App = () => {
  return (
    <>
      <NavBar />
      <PageLayout>
        <Dashboard />
      </PageLayout>
    </>
  );
};

export default App;
