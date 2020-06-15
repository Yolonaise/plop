export function mapToIds(ids: string[]): object[] {
  return ids.map((id) => {
    return { $oid: id };
  });
}
