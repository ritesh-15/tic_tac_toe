import { FC } from "react";

interface IProps {
  fontSize?: string;
}

const X: FC<IProps> = ({ fontSize }) => {
  return <div className="text-[5rem] font-bold text-secondary">X</div>;
};

export default X;
