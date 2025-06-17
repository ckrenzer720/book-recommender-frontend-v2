import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Container,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

// Mock data for demonstration
const mockCollection = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://covers.openlibrary.org/b/id/8051016-L.jpg",
    genre: "Fiction",
    rating: 4.5,
    notes: "A classic American novel",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://covers.openlibrary.org/b/id/8051017-L.jpg",
    genre: "Fiction",
    rating: 5,
    notes: "Must-read classic",
  },
];

const MyCollection = () => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API call to get user's collection
    setCollection(mockCollection);
  }, []);

  const handleDelete = (bookId) => {
    // TODO: Implement delete functionality
    setCollection((prev) => prev.filter((book) => book.id !== bookId));
  };

  const handleEdit = (bookId) => {
    // TODO: Implement edit functionality
    console.log("Edit book:", bookId);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Collection
        </Typography>
        <Grid container spacing={3}>
          {collection.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={book.cover}
                  alt={book.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Genre: {book.genre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {book.rating}/5
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Notes: {book.notes}
                  </Typography>
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(book.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(book.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MyCollection;
