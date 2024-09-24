export const validatePassword = (password) => {
  const storedPassword = process.env.NEXT_PUBLIC_EDIT_PASSWORD;
  return password === storedPassword;
};
