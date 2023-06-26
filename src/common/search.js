const search = (data, keys, searchTerm) => {
  const result = data.filter((item) => searchItem(item, keys, searchTerm));

  return result;
};

const searchItem = (item, keys, searchTerm) => {
  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
  }

  return false;
};

export default search;
