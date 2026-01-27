type Props = React.ComponentProps<"input"> & {
  legend?: string;
};

export function Input({ legend, ...rest }: Props) {
  return (
    <fieldset>
      <legend className="block text-sm text-slate-700 mb-2">{legend}</legend>
      <input
        type="text"
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
        {...rest}
      />
    </fieldset>
  );
}
