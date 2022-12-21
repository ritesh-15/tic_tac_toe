import { FC } from "react";

interface IProps {
  fontSize?: string;
}

const O: FC<IProps> = ({ fontSize }) => {
  return <div className={`text-[5rem] font-bold text-secondaryRed`}>O</div>;
};

export default O;
