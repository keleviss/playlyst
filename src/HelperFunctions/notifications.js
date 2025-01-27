export const notifications = {
  accountAccessDenied: {
    type: "error",
    body: "Account access denied! Please try again."
  },
  searchEmptyString: {
    type: "warning",
    body: "Searchbar is empty! Please type something in the searchbar."
  },
  searchNoLogin: {
    type: "warning",
    body: "Login required! Please log in to search for tracks."
  },
  saveNoLogin: {
    type: "warning",
    body: "Login required! Please log in to create a playlist."
  },
  saveNoTracks: {
    type: "warning",
    body: "You don't have any tracks in your playlist! Add tracks to continue."
  },
};