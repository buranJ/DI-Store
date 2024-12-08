export const destructProperties = <
  T extends { properties: { id: string; name: string; value?: string }[] }[]
>(
  data: T
): { [key: string]: { id: string; value: string }[] } => {
  return data.reduce((acc, item) => {
    item.properties.forEach(({ name, id, value = '' }) => {
      const index = Object.keys(acc).findIndex((key) => key === name.trim());

      if (index === -1) {
        acc[name.trim()] = [{ id: id, value }];
      } else {
        acc[name.trim()].push({ id: id, value });
      }
    });
    return acc;
  }, {} as { [key: string]: { id: string; value: string }[] });
};
