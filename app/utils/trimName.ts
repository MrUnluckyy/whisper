export const trimName = (name: string) => {
  if (!name) return "";
  // Split the full name into parts
  const parts = name.split(" ");

  // If there are more than one part (indicating a full name)
  if (parts.length > 1) {
    // Get the first name
    const firstName = parts[0];

    // Get the first character of the last name
    const lastNameInitial = parts[1].charAt(0);

    // Construct the modified name
    const modifiedName = `${firstName} ${lastNameInitial}.`;

    return modifiedName;
  } else {
    // If it's not a full name, return the original input
    return name;
  }
};
