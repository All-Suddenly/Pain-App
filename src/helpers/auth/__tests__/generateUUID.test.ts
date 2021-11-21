import { hasArrayStringsDuplicates } from '../../arrays';
import { generateUUID } from '../generateUUID';

describe('generateUUID module tests', () => {
  it('should generate a UUID', () => {
    const UUID = generateUUID();

    expect(UUID).toHaveLength(36);
  });

  it('should generate unique UUID', () => {
    const arrayUUIDS = Array.from({ length: 100 }, () => generateUUID());

    expect(hasArrayStringsDuplicates(arrayUUIDS)).toBeFalsy();
  });
});
