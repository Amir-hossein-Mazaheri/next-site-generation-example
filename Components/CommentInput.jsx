function CommentInput({
  type = "text",
  label,
  id,
  name,
  placeholder,
  className,
  inputRef,
}) {
  return (
    <div className={"flex flex-col gap-3" + " " + className}>
      <label className="font-sm font-bold text-gray-600" htmlFor={id}>
        {label}
      </label>
      {type !== "textarea" ? (
        <input
          className="outline-none bg-gray-200 rounded-full px-5 py-3"
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          ref={inputRef}
        />
      ) : (
        <textarea
          className="outline-none bg-gray-200 rounded-xl min-h-[12rem] max-h-72 px-5 py-3"
          placeholder={placeholder}
          name={name}
          id={id}
          ref={inputRef}
        ></textarea>
      )}{" "}
    </div>
  );
}

export default CommentInput;
