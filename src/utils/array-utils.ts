export function keyedObjectFromArray(items: { id: string }[]) {
  return items.reduce((acc, cur) => {
    return { ...acc, [cur.id]: cur };
  }, {});
}
