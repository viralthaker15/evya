interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip = ({ content, children }: TooltipProps) => {
  return (
    <span className="relative px-2 py-0.5 pb-1 rounded-xl mr-1 text-xs font-medium text-center items-center group">
      {children}
      <div className="absolute bottom-0 right-0 left-0 flex flex-col items-center hidden mb-6 group-hover:flex">
        <span className="relative z-10 p-2 text-xs font-medium leading-none text-black whitespace-no-wrap shadow-lg rounded-md">
          {content}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-sky-50"></div>
      </div>
    </span>
  );
};

export default Tooltip;
