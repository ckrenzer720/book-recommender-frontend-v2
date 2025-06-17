import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

// Mock search function
const mockSearch = (query) => [
  {
    id: 1,
    title: "Example Book",
    author: "Author Name",
    cover: "https://covers.openlibrary.org/b/id/8051016-L.jpg",
  },
  // ...more mock results
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Replace with real API call
    setResults(mockSearch(query));
  }, [query]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{query}"
      </Typography>
      <Grid container spacing={2}>
        {results.map((book) => (
          <Grid item xs={12} sm={6} md={3} key={book.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={book.cover}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2">{book.author}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchResults;
