export function createMeta(): IBaseMeta {
  return {
    createdAt: new Date(),
    deletedAt: null,
    updatedAt: new Date(),
  };
}
