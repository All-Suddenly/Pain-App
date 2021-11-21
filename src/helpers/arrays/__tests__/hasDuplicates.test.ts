import { hasArrayStringsDuplicates } from '../hasDuplicates';

describe('hasDuplicate module tests', () => {
  it('should return true if array has duplicates', () => {
    const arrayStringsWithDuplicates = ['a', 'a', 'b', 'c', 'd', 'e', 'f'];
    const result = hasArrayStringsDuplicates(arrayStringsWithDuplicates);
    expect(result).toBe(true);
  });

  it('should return false if array has no duplicates', () => {
    const arrayStringsWithoutDuplicates = ['a', 'b', 'c', 'd', 'e', 'f'];
    const result = hasArrayStringsDuplicates(arrayStringsWithoutDuplicates);
    expect(result).toBe(false);
  });
});
