import { DetailedHTMLProps, FC } from "react";

interface IProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  error?: string;
  parentclassname?: string;
}

const FormField: FC<IProps> = (props) => {
  const { label, error, parentclassname: parentClassName } = props;
  return (
    <div className={`flex flex-col ${parentClassName}`}>
      <label htmlFor="" className="mb-1">
        {label}
      </label>
      <input
        {...props}
        className={`bg-light px-2 py-3 w-full rounded-md outline-none placeholder:text-sm ${props.className}`}
      />
      {error && (
        <small className="text-[0.75rem] text-red-500 mt-2">{error}</small>
      )}
    </div>
  );
};

export default FormField;
