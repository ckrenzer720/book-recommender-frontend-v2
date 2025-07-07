import { useState } from "react";
import { Box, Typography, Container, Tabs, Tab, Chip } from "@mui/material";
import styled from "styled-components";
import BookCard from "../components/BookCard";
import Toast from "../components/Toast";
import useCollection from "../hooks/useCollection";

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

const MyCollection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { collection, addToCollection, updateBookStatus, toast, hideToast } =
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

  const handleUpdateStatus = (bookId, newStatus) => {
    updateBookStatus(bookId, newStatus);
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
          onUpdateStatus={handleUpdateStatus}
          onViewDetails={handleViewDetails}
          userStatus={book.status}
          averageRating={4.2}
          reviewCount={156}
        />
      ))}
    </BookGrid>
  );

  // Preserve original collection order instead of concatenating by status
  const allBooks = collection;

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Collection
        </Typography>

        {/* Collection Stats */}
        <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Chip
            label={`${
              collection.filter((book) => book.status === "owned").length
            } Owned`}
            color="success"
            variant="outlined"
          />
          <Chip
            label={`${
              collection.filter((book) => book.status === "read").length
            } Read`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${
              collection.filter((book) => book.status === "wishlist").length
            } Wishlist`}
            color="error"
            variant="outlined"
          />
        </Box>

        {/* Tabs for filtering */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label={`All (${allBooks.length})`} />
            <Tab
              label={`Owned (${
                collection.filter((book) => book.status === "owned").length
              })`}
            />
            <Tab
              label={`Read (${
                collection.filter((book) => book.status === "read").length
              })`}
            />
            <Tab
              label={`Wishlist (${
                collection.filter((book) => book.status === "wishlist").length
              })`}
            />
          </Tabs>
        </Box>

        {/* Book Grid */}
        {activeTab === 0 && renderBookGrid(allBooks)}
        {activeTab === 1 &&
          renderBookGrid(collection.filter((book) => book.status === "owned"))}
        {activeTab === 2 &&
          renderBookGrid(collection.filter((book) => book.status === "read"))}
        {activeTab === 3 &&
          renderBookGrid(
            collection.filter((book) => book.status === "wishlist")
          )}

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
          collection.filter((book) => book.status === "owned").length === 0) ||
          (activeTab === 2 &&
            collection.filter((book) => book.status === "read").length === 0) ||
          (activeTab === 3 &&
            collection.filter((book) => book.status === "wishlist").length ===
              0 && (
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
