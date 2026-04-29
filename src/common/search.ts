const search = <T extends Record<string, unknown>>(data: T[], keys: Array<keyof T>, searchTerm: string): T[] => {
  return data.filter((item) => searchItem(item, keys, searchTerm));
};

const searchItem = <T extends Record<string, unknown>>(item: T, keys: Array<keyof T>, searchTerm: string): boolean => {
  const normalizedSearchTerm = searchTerm.toLowerCase();

  for (const key of keys) {
    const value = item[key];
    if (typeof value === "string" && value.toLowerCase().includes(normalizedSearchTerm)) {
      return true;
    }
  }

  return false;
};

export default search;
