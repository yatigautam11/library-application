export const APP_CONSTANTS = {
  ADMIN_EMAIL: 'admin@example.com',

  LOCAL_STORAGE_KEYS: {
    USERS: 'users',               // For storing the array of all registered users
    CURRENT_USER: 'currentUser',  // For storing the currently logged-in user
    USER_NOTES: 'userNotes'
},

BOOK_PROGRESS: {
  TO_READ: 'to-read',
  IN_PROGRESS: 'in-progress',
  FINISHED: 'finished'
},


  ROUTES: {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    BOOK_ADMIN: '/admin/books',
    MY_LIBRARY: '/my-library',
  },

  API_ENDPOINTS: {
    BOOKS: 'http://localhost:3000/books',
    USER_BOOKS: 'http://localhost:3000/user-books',
  },

  SNACKBAR_DURATION: 3000,

  MESSAGES: {
    ACCESS_DENIED: 'Access Denied',
    LOGIN_SUCCESS: 'You are successfully logged in, Welcome',
    LOGIN_ERROR: 'Invalid credentials',
    SIGNUP_SUCCESS: 'Successfully signed in!',
    SIGNUP_ERROR: 'Please fill all the details properly',
    NO_USER_FOUND: 'No user found. Please sign up first.',
    UNAUTHORIZED: 'Unauthorized. Please log in.',
    FORBIDDEN: 'Access denied.',
    SERVER_ERROR: 'Server error. Try again later.',
    BOOK_ADDED: 'Book added successfully.',
    BOOK_UPDATED: 'Book updated successfully.',
    BOOK_DELETED: 'Book deleted successfully.',
    BOOK_OPERATION_FAILED: 'Book operation failed. Please try again.',
    GENERIC_ERROR: 'Something went wrong. Please try again.',
    NOT_FOUND: 'Resource not found.',
  },

  BOOK_PROGRESS_VALUES: ['to-read', 'in-progress', 'finished'] as const
};

export type BookProgress = typeof APP_CONSTANTS.BOOK_PROGRESS_VALUES[number];