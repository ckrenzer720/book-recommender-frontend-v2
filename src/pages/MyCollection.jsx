import { useState } from "react";
import { Box, Typography, Container, Tabs, Tab, Chip } from "@mui/material";
import styled from "styled-components";
import BookCard from "../components/BookCard";
import Toast from "../components/Toast";
import useCollection from "../hooks/useCollection";

// Styled Components
const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const MyCollection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { collection, addToCollection, getBooksByStatus, toast, hideToast } =
    useCollection();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddToCollection = (bookId) => {
    // Find the book in the collection and update its status
    const book = collection.find((b) => b.book_id === bookId);
    if (book) {
      addToCollection(book);
    }
  };

  const handleViewDetails = (bookId) => {
    // TODO: Navigate to book details page
    console.log("View details for book:", bookId);
  };

  const renderBookGrid = (books) => (
    <BookGrid>
      {books.map((book) => (
        <BookCard
          key={book.book_id}
          book={book}
          onAddToCollection={handleAddToCollection}
          onViewDetails={handleViewDetails}
          userStatus={book.status}
          averageRating={4.2}
          reviewCount={156}
        />
      ))}
    </BookGrid>
  );

  const allBooks = getBooksByStatus("owned").concat(
    getBooksByStatus("read"),
    getBooksByStatus("wishlist")
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Collection
        </Typography>

        {/* Collection Stats */}
        <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Chip
            label={`${getBooksByStatus("owned").length} Owned`}
            color="success"
            variant="outlined"
          />
          <Chip
            label={`${getBooksByStatus("read").length} Read`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${getBooksByStatus("wishlist").length} Wishlist`}
            color="error"
            variant="outlined"
          />
        </Box>

        {/* Tabs for filtering */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label={`All (${allBooks.length})`} />
            <Tab label={`Owned (${getBooksByStatus("owned").length})`} />
            <Tab label={`Read (${getBooksByStatus("read").length})`} />
            <Tab label={`Wishlist (${getBooksByStatus("wishlist").length})`} />
          </Tabs>
        </Box>

        {/* Book Grid */}
        {activeTab === 0 && renderBookGrid(allBooks)}
        {activeTab === 1 && renderBookGrid(getBooksByStatus("owned"))}
        {activeTab === 2 && renderBookGrid(getBooksByStatus("read"))}
        {activeTab === 3 && renderBookGrid(getBooksByStatus("wishlist"))}

        {/* Empty State */}
        {collection.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your collection is empty
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start adding books to your collection from the home page!
            </Typography>
          </Box>
        )}

        {(collection.length > 0 &&
          activeTab === 1 &&
          getBooksByStatus("owned").length === 0) ||
          (activeTab === 2 && getBooksByStatus("read").length === 0) ||
          (activeTab === 3 && getBooksByStatus("wishlist").length === 0 && (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No books in this category
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adding some books to this category!
              </Typography>
            </Box>
          ))}
      </Box>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </Container>
  );
};

export default MyCollection;
