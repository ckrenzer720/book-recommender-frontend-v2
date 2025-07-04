import api from "./axios.js";

// Books service
export const booksService = {
  // Get all books with pagination
  async getBooks(page = 1, limit = 10) {
    try {
      const response = await api.get(`/api/books?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch books"
      );
    }
  },

  // Get book by ID
  async getBookById(id) {
    try {
      const response = await api.get(`/api/books/${id}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message || error.message || "Failed to fetch book"
      );
    }
  },

  // Search books
  async searchBooks(query, page = 1, limit = 10) {
    try {
      const response = await api.get(
        `/api/books/search?q=${encodeURIComponent(
          query
        )}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to search books"
      );
    }
  },

  // Get books by genre
  async getBooksByGenre(genre, page = 1, limit = 10) {
    try {
      const response = await api.get(
        `/api/books?genre=${encodeURIComponent(
          genre
        )}&page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch books by genre"
      );
    }
  },

  // Get recommended books (if endpoint exists)
  async getRecommendedBooks(limit = 10) {
    try {
      const response = await api.get(`/api/recommendations?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch recommendations"
      );
    }
  },
};

export default booksService;
