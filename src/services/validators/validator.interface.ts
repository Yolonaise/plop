export interface IValidator<T> {
  onCreate: (model: T) => void;
  onDelete: (ref: string) => void;
  onUpdate: (model: T) => void;
  onGet: (ref: string) => void;
}
