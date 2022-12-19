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
      className={`px-2 py-3 rounded-md w-full flex items-center cursor-pointer ${props.className}`}
    >
      <div className="mr-2">{icon}</div>
      <p>{label}</p>
    </button>
  );
};

export default Button;
