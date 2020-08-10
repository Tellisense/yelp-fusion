import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const PageLayout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography
          component="div"
          style={{ height: "100vh" }}
        >
          {children}
        </Typography>
      </Container>
    </>
  );
};

export default PageLayout;
