interface IProps {
  children?: React.ReactNode;
}

export function ErrorInput({ children }: IProps) {
  return <div className="text-red-500">{children}</div>;
}
