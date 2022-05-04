const omit = <T>(obj: T, property: keyof T | (keyof T)[]) => {
  if (Array.isArray(property)) {
    const filteredEnteries = Object.entries(obj).filter((element) => {
      const [key] = element;

      return !property.includes(key as keyof T);
    });

    return Object.fromEntries(filteredEnteries);
  }

  const { [property]: unused, ...restOfObj } = obj;

  return restOfObj;
};

export default omit;
