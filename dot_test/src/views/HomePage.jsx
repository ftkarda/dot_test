import AppBar from "@mui/material/AppBar";
import { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CardItem from "../components/CardItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const theme = createTheme();

export default function Home() {
  const PROD_URL = "https://flickr-server-a5a7c.herokuapp.com/";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams("");
  let searchTags = searchParams.get("tags") || "";

  const handleSearch = (event) => {
    event.preventDefault();
    const tags = event.target.value;
    if (tags) {
      setSearchParams({ tags });
    }
  };

  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          PROD_URL + `feeds/?tags=${searchTags}`
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData({});
  }, [searchTags]);

  if (loading === true) {
    return <div className="loader" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
              >
                <NavLink to="/">
                  <Button variant="contained">Home</Button>
                </NavLink>
                <Typography
                  onClick={logout}
                  ml={2}
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  <Button variant="outlined" color="error">
                    Logout
                  </Button>
                </Typography>
              </Typography>
              <Search value={searchTags} onClick={handleSearch}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search Feeds…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Public Feed
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {data.title}
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="xl">
          <Grid container spacing={4}>
            {data.items.map((item, index) => {
              return <CardItem key={index} data={item} />;
            })}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
