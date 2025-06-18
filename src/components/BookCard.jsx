import React from "react";
import {
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
  EyeIcon as EyeSolidIcon,
} from "@heroicons/react/24/solid";

const BookCard = ({
  book,
  onAddToCollection,
  onViewDetails,
  userStatus = null,
  averageRating = 0,
  reviewCount = 0,
}) => {
  const { book_id, title, author, cover_url, genre, description, isbn } = book;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarIcon
            key={i}
            className="w-4 h-4 text-yellow-400 fill-current"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        );
      } else {
        stars.push(<StarIcon key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "wishlist":
        return <HeartSolidIcon className="w-5 h-5" />;
      case "owned":
        return <BookmarkSolidIcon className="w-5 h-5" />;
      case "read":
        return <EyeSolidIcon className="w-5 h-5" />;
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
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
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
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <button
              onClick={() => onViewDetails(book_id)}
              className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              View Details
            </button>
            <button
              onClick={() => onAddToCollection(book_id)}
              className={`p-2 rounded-full transition-colors ${getStatusColor(
                userStatus
              )}`}
              title={getStatusTitle(userStatus)}
            >
              {userStatus ? (
                getStatusIcon(userStatus)
              ) : (
                <BookmarkIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Genre badge */}
        {genre && (
          <div className="absolute top-2 left-2">
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {genre}
            </span>
          </div>
        )}

        {/* Status indicator on cover */}
        {userStatus && (
          <div className="absolute top-2 right-2">
            <span
              className={`inline-flex items-center gap-1 text-white text-xs px-2 py-1 rounded-full font-medium ${
                userStatus === "wishlist"
                  ? "bg-red-500"
                  : userStatus === "owned"
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
            >
              {getStatusIcon(userStatus)}
              {userStatus}
            </span>
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="p-4">
        {/* Title */}
        <h3
          className="font-semibold text-gray-900 text-lg leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer"
          onClick={() => onViewDetails(book_id)}
        >
          {title}
        </h3>

        {/* Author */}
        <p className="text-gray-600 text-sm mb-3">by {author}</p>

        {/* Rating */}
        {reviewCount > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {renderStars(averageRating)}
            </div>
            <span className="text-sm text-gray-500">
              {averageRating.toFixed(1)} ({reviewCount} reviews)
            </span>
          </div>
        )}

        {/* ISBN */}
        {isbn && <p className="text-gray-500 text-xs mb-2">ISBN: {isbn}</p>}

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}

        {/* Status indicators at bottom */}
        {userStatus && (
          <div className="flex gap-2 mt-3">
            <span
              className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                userStatus === "wishlist"
                  ? "bg-red-100 text-red-800"
                  : userStatus === "owned"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {getStatusIcon(userStatus)}
              {userStatus === "wishlist"
                ? "In Wishlist"
                : userStatus === "owned"
                ? "In Collection"
                : "Read"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
