interface IProps {
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: 'email' | 'password' | 'text';
  value?: string;
}

export function Input({
  name,
  onBlur,
  onChange,
  type = 'text',
  value,
}: IProps) {
  return (
    <input
      className="pt-2 border-b border-black"
      type={type}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  );
}
