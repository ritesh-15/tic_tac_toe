import { DetailedHTMLProps, FC } from "react";

interface IProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  icon?: JSX.Element;
  isLoading?: boolean;
}

const Button: FC<IProps> = (props) => {
  const { label, icon, isLoading, className } = props;
  return (
    <button
      {...props}
      disabled={isLoading || false}
      className={`px-2 py-3 rounded-md w-full flex items-center ${
        !isLoading && className
      } ${isLoading ? "bg-gray-200 cursor-default" : "cursor-pointer"}`}
    >
      {icon && <div className="mr-2">{icon}</div>}
      <p className="text-center w-full">{label}</p>
    </button>
  );
};

export default Button;
