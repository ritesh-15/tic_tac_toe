import { FC } from "react";

interface IProps {
  fontSize?: string;
}

const O: FC<IProps> = ({ fontSize }) => {
  return (
    <div className={`text-[${fontSize || "6rem"}] font-bold text-secondaryRed`}>
      O
    </div>
  );
};

export default O;
