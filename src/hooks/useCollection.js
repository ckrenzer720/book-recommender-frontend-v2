import { useState, useEffect } from "react";

const useCollection = () => {
  const [collection, setCollection] = useState([]);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    // Load user collection from localStorage on mount
    const savedCollection = localStorage.getItem("userCollection");
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection));
    }
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast({ isVisible: false, message: "", type: "success" });
  };

  const addToCollection = (book, status = "owned") => {
    const existingBook = collection.find((b) => b.book_id === book.book_id);

    if (existingBook) {
      // If book exists, cycle through statuses: owned -> read -> wishlist -> remove
      const statusOrder = ["owned", "read", "wishlist"];
      const currentIndex = statusOrder.indexOf(existingBook.status);
      const nextIndex = (currentIndex + 1) % statusOrder.length;

      if (nextIndex === 0) {
        // Remove from collection
        const updatedCollection = collection.filter(
          (b) => b.book_id !== book.book_id
        );
        setCollection(updatedCollection);
        localStorage.setItem(
          "userCollection",
          JSON.stringify(updatedCollection)
        );
        showToast(`${book.title} removed from collection`, "info");
      } else {
        // Update status - preserve original order
        const updatedCollection = collection.map((b) =>
          b.book_id === book.book_id
            ? { ...b, status: statusOrder[nextIndex] }
            : b
        );
        setCollection(updatedCollection);
        localStorage.setItem(
          "userCollection",
          JSON.stringify(updatedCollection)
        );
        showToast(
          `${book.title} moved to ${statusOrder[nextIndex]}`,
          "success"
        );
      }
    } else {
      // Add new book to collection - add to the end to preserve existing order
      const newBook = {
        ...book,
        status,
        addedDate: new Date().toISOString(),
      };
      const updatedCollection = [...collection, newBook];
      setCollection(updatedCollection);
      localStorage.setItem("userCollection", JSON.stringify(updatedCollection));
      showToast(`${book.title} added to collection`, "success");
    }
  };

  const removeFromCollection = (bookId) => {
    const book = collection.find((b) => b.book_id === bookId);
    const updatedCollection = collection.filter((b) => b.book_id !== bookId);
    setCollection(updatedCollection);
    localStorage.setItem("userCollection", JSON.stringify(updatedCollection));
    if (book) {
      showToast(`${book.title} removed from collection`, "info");
    }
  };

  const updateBookStatus = (bookId, status) => {
    const book = collection.find((b) => b.book_id === bookId);
    if (!book) return; // Don't update if book doesn't exist

    const updatedCollection = collection.map((b) =>
      b.book_id === bookId ? { ...b, status } : b
    );
    setCollection(updatedCollection);
    localStorage.setItem("userCollection", JSON.stringify(updatedCollection));

    // Show appropriate message based on the action
    if (status === "read") {
      showToast(`${book.title} marked as read`, "success");
    } else if (status === "owned" && book.status === "read") {
      showToast(`${book.title} marked as unread`, "info");
    } else {
      showToast(`${book.title} moved to ${status}`, "success");
    }
  };

  const getBookStatus = (bookId) => {
    const book = collection.find((b) => b.book_id === bookId);
    return book ? book.status : null;
  };

  const getBooksByStatus = (status) => {
    return collection.filter((book) => book.status === status);
  };

  return {
    collection,
    toast,
    addToCollection,
    removeFromCollection,
    updateBookStatus,
    getBookStatus,
    getBooksByStatus,
    hideToast,
  };
};

export default useCollection;
