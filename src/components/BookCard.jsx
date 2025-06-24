import React from "react";
import styled from "styled-components";
import {
  Favorite,
  Bookmark,
  Visibility,
  BookmarkBorder,
  Launch,
  FavoriteBorder,
  LibraryBooks,
  CheckCircle,
  VisibilityOff,
} from "@mui/icons-material";

// Styled Components
const CardContainer = styled.div`
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const CoverContainer = styled.div`
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ActionButtonContainer = styled.div`
  padding: 0.75rem;
  padding-top: 0;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["isWishlist", "isOwned", "isRead"].includes(prop),
})`
  background-color: ${(props) => {
    if (props.isWishlist) return "#e91e63";
    if (props.isOwned) return "#4caf50";
    if (props.isRead) return "#2196f3";
    return "#0077c2";
  }};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background-color: ${(props) => {
      if (props.isWishlist) return "#c2185b";
      if (props.isOwned) return "#388e3c";
      if (props.isRead) return "#1976d2";
      return "#005fa5";
    }};
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const BookCard = ({
  book,
  onAddToCollection,
  onViewDetails,
  onUpdateStatus,
  userStatus = null,
}) => {
  const { book_id, title, cover_url } = book;

  const handleStatusUpdate = (newStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(book_id, newStatus);
    } else if (onAddToCollection) {
      onAddToCollection(book_id);
    }
  };

  const handleReadToggle = () => {
    if (onUpdateStatus) {
      // If currently read, toggle back to owned. If owned, toggle to read.
      const newStatus = userStatus === "read" ? "owned" : "read";
      onUpdateStatus(book_id, newStatus);
    }
  };

  const renderActionButtons = () => {
    if (userStatus) {
      // Book is in collection - show status action buttons
      return (
        <>
          <ActionButton
            onClick={() => handleStatusUpdate("owned")}
            isOwned={userStatus === "owned"}
          >
            <LibraryBooks />
            Owned
          </ActionButton>
          <ActionButton
            onClick={handleReadToggle}
            isRead={userStatus === "read"}
          >
            {userStatus === "read" ? <VisibilityOff /> : <CheckCircle />}
            {userStatus === "read" ? "Mark as Unread" : "Mark as Read"}
          </ActionButton>
          <ActionButton
            onClick={() => handleStatusUpdate("wishlist")}
            isWishlist={userStatus === "wishlist"}
          >
            <FavoriteBorder />
            Wishlist
          </ActionButton>
        </>
      );
    } else {
      // Book is not in collection - show add to collection button
      return (
        <ActionButton
          onClick={() => handleStatusUpdate("wishlist")}
          isWishlist={true}
          style={{ width: "100%" }}
        >
          <FavoriteBorder />
          Add to Collection
        </ActionButton>
      );
    }
  };

  return (
    <div>
      <CardContainer onClick={() => onViewDetails(book_id)}>
        <CoverContainer>
          <CoverImage
            src={cover_url || "/placeholder-book-cover.jpg"}
            alt={`${title} cover`}
            onError={(e) => {
              e.target.src = "/placeholder-book-cover.jpg";
            }}
          />
        </CoverContainer>
      </CardContainer>
      <ActionButtonContainer>{renderActionButtons()}</ActionButtonContainer>
    </div>
  );
};

export default BookCard;
