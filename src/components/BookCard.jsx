import React from "react";
import {
  Favorite,
  Bookmark,
  Visibility,
  BookmarkBorder,
} from "@mui/icons-material";

const BookCard = ({
  book,
  onAddToCollection,
  onViewDetails,
  userStatus = null,
}) => {
  const { book_id, title, author, cover_url } = book;

  const getStatusIcon = (status) => {
    switch (status) {
      case "wishlist":
        return <Favorite className="w-2.5 h-2.5" />;
      case "owned":
        return <Bookmark className="w-2.5 h-2.5" />;
      case "read":
        return <Visibility className="w-2.5 h-2.5" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "wishlist":
        return "bg-red-500 text-white hover:bg-red-600";
      case "owned":
        return "bg-green-500 text-white hover:bg-green-600";
      case "read":
        return "bg-blue-500 text-white hover:bg-blue-600";
      default:
        return "bg-white text-gray-800 hover:bg-gray-50";
    }
  };

  const getStatusTitle = (status) => {
    switch (status) {
      case "wishlist":
        return "In Wishlist";
      case "owned":
        return "In Collection";
      case "read":
        return "Read";
      default:
        return "Add to Collection";
    }
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
      {/* Book Cover */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={cover_url || "/placeholder-book-cover.jpg"}
          alt={`${title} cover`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "/placeholder-book-cover.jpg";
          }}
        />

        {/* Overlay with action buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => onAddToCollection(book_id)}
              className={`p-1 rounded-full transition-colors ${getStatusColor(
                userStatus
              )}`}
              title={getStatusTitle(userStatus)}
            >
              {userStatus ? (
                getStatusIcon(userStatus)
              ) : (
                <BookmarkBorder className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Status indicator on cover */}
        {userStatus && (
          <div className="absolute top-2 right-2">
            <span
              className={`inline-flex items-center text-white text-xs px-1 py-1 rounded-full ${
                userStatus === "wishlist"
                  ? "bg-red-500"
                  : userStatus === "owned"
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
            >
              {getStatusIcon(userStatus)}
            </span>
          </div>
        )}
      </div>

      {/* Book Info - Minimal */}
      <div className="p-3">
        {/* Title */}
        <h3
          className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer mb-1"
          onClick={() => onViewDetails(book_id)}
          title={title}
        >
          {title}
        </h3>

        {/* Author */}
        <p
          className="text-gray-600 text-xs line-clamp-1"
          title={`by ${author}`}
        >
          by {author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
