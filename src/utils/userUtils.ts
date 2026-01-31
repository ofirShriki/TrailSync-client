export const getProfilePicturePath = (profilePicture: string | undefined) =>
  profilePicture ? `${import.meta.env.VITE_SERVER_URL}/${profilePicture}` : '/avatars/default.png';
