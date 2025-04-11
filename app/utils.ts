function sortKeysWithUnderscoresLast(keys: Iterable<string>): string[] {
  return Array.from(keys).sort((a, b) => {
    const aStartsWithUnderscore = a.startsWith("_");
    const bStartsWithUnderscore = b.startsWith("_");

    if (aStartsWithUnderscore === bStartsWithUnderscore) {
      return 0;
    }
    return aStartsWithUnderscore ? 1 : -1;
  });
}

export const generateColumnsBasedOnData = (data: Record<string, string>[]) => {
  if (!data?.length) {
    return [];
  }

  // Efficiently collect unique keys using Set
  const uniqueKeys = new Set<string>();

  data.forEach((obj) => {
    Object.keys(obj).forEach((key) => uniqueKeys.add(key));
  });

  return sortKeysWithUnderscoresLast(uniqueKeys);
};
