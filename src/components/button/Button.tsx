import { DetailedHTMLProps, FC } from "react";

interface IProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  icon?: JSX.Element;
}

const Button: FC<IProps> = (props) => {
  const { label, icon } = props;
  return (
    <button
      {...props}
      className={`px-2 py-3 rounded-md w-full flex items-center cursor-pointer ${
        props.disabled && "bg-gray-200 cursor-default"
      } ${props.className}`}
    >
      {icon && <div className="mr-2">{icon}</div>}
      <p className="text-center w-full">{label}</p>
    </button>
  );
};

export default Button;
