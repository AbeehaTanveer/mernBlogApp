import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { categories } from "./Cataogry"; // Corrected import path and spelling
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button, styled } from "@mui/material";

// Define custom styling for the Button component
const StyledButton = styled(Button)({
  backgroundColor: "#6495Ed",
  color: "white",
  width: "100%",
  padding: "10px 20px",
  borderRadius: "5px",
  marginTop: "10px",
  marginBottom: "10px",
  textDecoration: "none",
  "&:hover": {
    color: "red",
  },
});

const Catagories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryType) => {
    setSearchParams({ category: categoryType });
  };

  const handleCreateBlogClick = () => {
    const selectedCategory = searchParams.get("category");
    navigate(`/create?category=${selectedCategory}`);
  };

  return (
    <>
      <StyledButton onClick={handleCreateBlogClick}> Create Blog</StyledButton>
      <Table>
        <TableHead>
          <TableRow  >
            <TableCell  >
              <Link style={{textDecoration:'none'}} to="/">ALL Categories</Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Render category rows */}
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <button
                  onClick={() => handleCategoryClick(category.type)}
                  style={{ border: "none", background: "none", cursor: "pointer" }}
                >
                  {category.type}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Catagories;
