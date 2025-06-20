import React from "react";
import styled from "styled-components";
import {
  Favorite,
  Bookmark,
  Visibility,
  BookmarkBorder,
  Launch,
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
`;

const ActionButton = styled.button`
  background-color: #0077c2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005fa5;
  }
`;

const BookCard = ({
  book,
  onAddToCollection,
  onViewDetails,
  userStatus = null,
}) => {
  const { book_id, title, cover_url } = book;

  const getActionDetails = (status) => {
    switch (status) {
      case "owned":
        return { text: "Read", icon: <Visibility /> };
      case "wishlist":
        return { text: "Locate", icon: <Launch /> };
      default:
        return { text: "Preview Only", icon: null };
    }
  };

  const { text: buttonText, icon: buttonIcon } = getActionDetails(userStatus);

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
      <ActionButtonContainer>
        <ActionButton onClick={() => onAddToCollection(book_id)}>
          {buttonIcon}
          {buttonText}
        </ActionButton>
      </ActionButtonContainer>
    </div>
  );
};

export default BookCard;
