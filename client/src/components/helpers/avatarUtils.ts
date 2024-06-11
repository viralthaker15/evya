export const getInitials = (name: string): string => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");
  return initials.substring(0, 2).toUpperCase(); // Ensure the initials are no more than 2 characters
};
