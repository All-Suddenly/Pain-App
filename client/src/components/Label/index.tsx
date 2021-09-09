interface IProps {
  children: React.ReactNode;
}

export function Label({ children }: IProps) {
  return <label>{children}</label>;
}
