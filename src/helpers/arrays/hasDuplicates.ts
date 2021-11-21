export function hasArrayStringsDuplicates(list: string[]) {
  return list.some((item, index) => {
    const indexOf = list.indexOf(item);

    if (indexOf !== -1 && indexOf !== index) {
      return true;
    }

    return false;
  });
}
