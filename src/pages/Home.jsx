import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Container,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

// Mock data for demonstration
const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "https://covers.openlibrary.org/b/id/8051016-L.jpg",
    genre: "Fiction",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "https://covers.openlibrary.org/b/id/8051017-L.jpg",
    genre: "Fiction",
  },
  // Add more mock books as needed
];

const BookCarousel = ({ title, books }) => {
  const [startIndex, setStartIndex] = useState(0);
  const booksPerPage = 4;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(books.length - booksPerPage, prev + 1));
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ position: "relative" }}>
        <IconButton
          sx={{
            position: "absolute",
            left: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Grid container spacing={2}>
          {books.slice(startIndex, startIndex + booksPerPage).map((book) => (
            <Grid item xs={12} sm={6} md={3} key={book.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "transform 0.2s ease-in-out",
                  },
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <IconButton
          sx={{
            position: "absolute",
            right: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
          onClick={handleNext}
          disabled={startIndex + booksPerPage >= books.length}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const Home = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [topPicks, setTopPicks] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API calls
    setTrendingBooks(mockBooks);
    setRecommendedBooks(mockBooks);
    setTopPicks(mockBooks);
  }, []);

  return (
    <Container maxWidth="xl">
      <BookCarousel title="Trending Now" books={trendingBooks} />
      <BookCarousel title="Recommended for You" books={recommendedBooks} />
      <BookCarousel title="Top Picks" books={topPicks} />
    </Container>
  );
};

export default Home;
