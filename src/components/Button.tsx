type Props = React.ComponentProps<"button">;

export function Button({ children, type = "button", ...rest }: Props) {
  return (
    <button
      type={type}
      className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg transition-colors cursor-pointer"
      {...rest}
    >
      {children}
    </button>
  );
}
