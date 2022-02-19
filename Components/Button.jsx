function Btn(props) {
  const { children,className, ...leftProps } = props;

  return (
    <button
      type="button"
      className={"px-3 py-1 text-white rounded-full bg-sky-600 text-sm font-semibold" + (className ? " " + className : "")}
      {...leftProps}
    >
      {children}
    </button>
  );
}

export default Btn;
