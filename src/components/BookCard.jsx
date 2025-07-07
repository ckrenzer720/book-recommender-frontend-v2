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
        maxWidth: 220,
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        borderRadius: 2,
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="260"
        image={cover_image || cover_url || "/placeholder-book.jpg"}
        alt={title}
        sx={{
          objectFit: "cover",
          backgroundColor: "grey.200",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 600,
            fontSize: "1.1rem",
            lineHeight: 1.3,
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            mb: 0.5,
          }}
        >
          by {author}
        </Typography>

        {publication_year && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              mb: 1,
              fontStyle: "italic",
            }}
          >
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
              lineHeight: 1.4,
            }}
          >
            {description}
          </Typography>
        )}

        <Box sx={{ mt: "auto", pt: 1 }}>
          {genre && (
            <Chip
              label={genre}
              size="small"
              sx={{
                mb: 1,
                fontSize: "0.75rem",
                height: 24,
              }}
            />
          )}

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

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          onClick={() => onViewDetails && onViewDetails(bookId)}
          startIcon={<Book />}
          sx={{ fontSize: "0.8rem" }}
        >
          View Details
        </Button>
        {onAddToCollection && (
          <Button
            size="small"
            onClick={() => onAddToCollection && onAddToCollection(book)}
            variant="outlined"
            sx={{ fontSize: "0.8rem" }}
          >
            Add to Collection
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default BookCard;
