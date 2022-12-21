import useMessage from "../../app/slices/message/useMessage";

const Message: React.FC = () => {
  const { message, isError, isOpen } = useMessage();

  return (
    <div
      className={`absolute bottom-[8rem] left-0 right-0 mx-auto ${
        isError ? "bg-[#EB5757]" : "bg-[#6FCF97]"
      } w-fit px-3 py-4 rounded-md shadow-md text-white transition-all ${
        isOpen
          ? "opacity-1 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {message}
    </div>
  );
};

export default Message;
