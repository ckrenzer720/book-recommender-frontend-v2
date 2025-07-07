import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Container } from "@mui/material";
import styled from "styled-components";
import BookCard from "../components/BookCard";

// Styled Components
const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  justify-items: center;
  padding: 1rem 0;

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 2.5rem;
  }
`;

// Mock search function
const mockSearch = (query) => {
  const allBooks = [
    {
      book_id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover_url: "https://covers.openlibrary.org/b/id/8051016-L.jpg",
      genre: "Fiction",
      description:
        "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
      publication_year: "1925",
      average_rating: 4.2,
      total_ratings: 156,
    },
    {
      book_id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover_url: "https://covers.openlibrary.org/b/id/8051017-L.jpg",
      genre: "Fiction",
      description:
        "The story of young Scout Finch and her father Atticus in a racially divided Alabama town.",
      publication_year: "1960",
      average_rating: 4.5,
      total_ratings: 234,
    },
    {
      book_id: 3,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      cover_url: "https://covers.openlibrary.org/b/id/8051018-L.jpg",
      genre: "Fantasy",
      description:
        "An epic high-fantasy novel about the quest to destroy a powerful ring.",
      publication_year: "1954",
      average_rating: 4.8,
      total_ratings: 567,
    },
  ];

  if (!query) return allBooks;

  const searchTerm = query.toLowerCase();
  return allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.genre.toLowerCase().includes(searchTerm)
  );
};

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

  const handleViewDetails = (bookId) => {
    // TODO: Navigate to book details page
    console.log("View details for book:", bookId);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Search Results for "{query}"
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Found {results.length} results
        </Typography>

        <BookGrid>
          {results.map((book) => (
            <BookCard
              key={book.book_id}
              book={book}
              onViewDetails={handleViewDetails}
            />
          ))}
        </BookGrid>

        {results.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No books found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search terms or browse our recommendations.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default SearchResults;
