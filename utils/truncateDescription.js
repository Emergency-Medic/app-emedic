// utils/truncateDescription.js
export const truncateDescription = (description, wordLimit = 7) => {
    const words = description.split(' ');
    const truncated = words.slice(0, wordLimit).join(' ');
    return words.length > wordLimit ? truncated + '...' : truncated;
  };