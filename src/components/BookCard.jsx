import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
  Button,
  CardActions,
} from "@mui/material";
import { Book } from "@mui/icons-material";

const BookCard = ({ book, onViewDetails, onAddToCollection }) => {
  const {
    id,
    book_id,
    title,
    author,
    description,
    cover_image,
    cover_url,
    average_rating,
    total_ratings,
    genre,
    publication_year,
  } = book;

  // Use book_id if available, otherwise fall back to id
  const bookId = book_id || id;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={cover_image || cover_url || "/placeholder-book.jpg"}
        alt={title}
        sx={{
          objectFit: "cover",
          backgroundColor: "grey.200",
        }}
      />

      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          by {author}
        </Typography>

        {publication_year && (
          <Typography variant="caption" color="text.secondary" gutterBottom>
            {publication_year}
          </Typography>
        )}

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              mb: 1,
            }}
          >
            {description}
          </Typography>
        )}

        <Box sx={{ mt: "auto" }}>
          {genre && <Chip label={genre} size="small" sx={{ mb: 1 }} />}

          {average_rating > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Rating
                value={average_rating}
                precision={0.5}
                size="small"
                readOnly
              />
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                ({total_ratings || 0})
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          onClick={() => onViewDetails && onViewDetails(bookId)}
          startIcon={<Book />}
        >
          View Details
        </Button>
        {onAddToCollection && (
          <Button
            size="small"
            onClick={() => onAddToCollection && onAddToCollection(book)}
            variant="outlined"
          >
            Add to Collection
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BookCard;
