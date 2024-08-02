import React from "react";
import { Grid, styled } from "@mui/material";
import Banner from "../components/Banner";
import Catagories from "./Catagories";
import Post from "./Post";

const StyledGrid = styled(Grid)({
  backgroundColor: "#f0f0f0",
  padding: "20px",
  borderRadius: "8px",
});

const MainContainer = styled("div")`
  margin-top: 1px;
`;

function Home() {
  return (
    <>
      <MainContainer>
        <Banner />
        <Grid container>
          <Grid item lg={2} sm={2} xs={12}>
            <Catagories />
          </Grid>
          <StyledGrid container item xs={12} sm={10} lg={10}>
            <Post></Post>
          </StyledGrid>
        </Grid>
      </MainContainer>
    </>
  );
}

export default Home;
