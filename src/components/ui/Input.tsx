import { InputHTMLAttributes, Ref, forwardRef, memo } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1  focus:ring-indigo-500 focus:border-indigo-700 block w-full p-2.5"
      {...rest}
    />
  );
});

export default memo(Input);
