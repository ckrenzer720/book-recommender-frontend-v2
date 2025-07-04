import api from "./axios.js";

// Reviews service
export const reviewsService = {
  // Create a new review
  async createReview(reviewData) {
    try {
      const response = await api.post("/api/reviews", reviewData);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to create review"
      );
    }
  },

  // Get reviews for a specific book
  async getBookReviews(bookId, page = 1, limit = 10) {
    try {
      const response = await api.get(
        `/api/reviews/book/${bookId}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch book reviews"
      );
    }
  },

  // Get reviews by a specific user
  async getUserReviews(userId, page = 1, limit = 10) {
    try {
      const response = await api.get(
        `/api/reviews/user/${userId}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch user reviews"
      );
    }
  },

  // Update a review
  async updateReview(reviewId, reviewData) {
    try {
      const response = await api.put(`/api/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to update review"
      );
    }
  },

  // Delete a review
  async deleteReview(reviewId) {
    try {
      const response = await api.delete(`/api/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to delete review"
      );
    }
  },

  // Get review by ID
  async getReviewById(reviewId) {
    try {
      const response = await api.get(`/api/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch review"
      );
    }
  },
};

export default reviewsService;
