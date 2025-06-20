import { useState, useEffect } from "react";
import { Box, Typography, Container, IconButton } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import styled from "styled-components";
import BookCard from "../components/BookCard";
import Toast from "../components/Toast";
import useCollection from "../hooks/useCollection";

// Styled Components
const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(8, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

// Mock data for demonstration
const mockBooks = [
  {
    book_id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover_url: "https://covers.openlibrary.org/b/id/8051016-L.jpg",
    genre: "Fiction",
    description:
      "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    isbn: "978-0743273565",
  },
  {
    book_id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover_url: "https://covers.openlibrary.org/b/id/8051017-L.jpg",
    genre: "Fiction",
    description:
      "The story of young Scout Finch and her father Atticus in a racially divided Alabama town.",
    isbn: "978-0446310789",
  },
  {
    book_id: 3,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    cover_url: "https://covers.openlibrary.org/b/id/8051018-L.jpg",
    genre: "Fantasy",
    description:
      "An epic high-fantasy novel about the quest to destroy a powerful ring.",
    isbn: "978-0547928210",
  },
  {
    book_id: 4,
    title: "1984",
    author: "George Orwell",
    cover_url: "https://covers.openlibrary.org/b/id/8051019-L.jpg",
    genre: "Dystopian",
    description:
      "A dystopian novel about totalitarianism and surveillance society.",
    isbn: "978-0451524935",
  },
  {
    book_id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover_url: "https://covers.openlibrary.org/b/id/8051020-L.jpg",
    genre: "Romance",
    description:
      "A romantic novel of manners about the relationship between Elizabeth Bennet and Mr. Darcy.",
    isbn: "978-0141439518",
  },
  {
    book_id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    cover_url: "https://covers.openlibrary.org/b/id/8051021-L.jpg",
    genre: "Fantasy",
    description:
      "A fantasy novel about Bilbo Baggins' journey with thirteen dwarves.",
    isbn: "978-0547928241",
  },
];

const BookCarousel = ({
  books,
  onAddToCollection,
  onViewDetails,
  userCollection,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const booksPerPage = 12;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(books.length - booksPerPage, prev + 1));
  };

  return (
    <Box
      sx={{ position: "relative", bgcolor: "#e6e1d1", p: 2, borderRadius: 2 }}
    >
      <Box sx={{ position: "relative" }}>
        <IconButton
          sx={{
            position: "absolute",
            left: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
          }}
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          <ChevronLeftIcon />
        </IconButton>
        <BookGrid>
          {books.slice(startIndex, startIndex + booksPerPage).map((book) => (
            <BookCard
              key={book.book_id}
              book={book}
              onAddToCollection={onAddToCollection}
              onViewDetails={onViewDetails}
              userStatus={
                userCollection.find((b) => b.book_id === book.book_id)
                  ?.status || null
              }
              averageRating={4.2}
              reviewCount={156}
            />
          ))}
        </BookGrid>
        <IconButton
          sx={{
            position: "absolute",
            right: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
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
  const { collection, addToCollection, toast, hideToast } = useCollection();

  useEffect(() => {
    // TODO: Replace with actual API calls
    setTrendingBooks(mockBooks);
    setRecommendedBooks(mockBooks);
    setTopPicks(mockBooks);
  }, []);

  const handleAddToCollection = (bookId) => {
    const book = mockBooks.find((b) => b.book_id === bookId);
    if (book) {
      addToCollection(book);
    }
  };

  const handleViewDetails = (bookId) => {
    // TODO: Navigate to book details page
    console.log("View details for book:", bookId);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Trending Now
      </Typography>
      <BookCarousel
        books={trendingBooks}
        onAddToCollection={handleAddToCollection}
        onViewDetails={handleViewDetails}
        userCollection={collection}
      />
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Recommended for You
      </Typography>
      <BookCarousel
        books={recommendedBooks}
        onAddToCollection={handleAddToCollection}
        onViewDetails={handleViewDetails}
        userCollection={collection}
      />
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Top Picks
      </Typography>
      <BookCarousel
        books={topPicks}
        onAddToCollection={handleAddToCollection}
        onViewDetails={handleViewDetails}
        userCollection={collection}
      />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </Container>
  );
};

export default Home;
