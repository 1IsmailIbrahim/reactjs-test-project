import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
const ItemColors = ({ color, ...rest }: IProps) => {
  return (
    <span
      className="block w-4 h-4 rounded-full cursor-pointer"
      style={{ backgroundColor: `${color}` }}
      {...rest}
    ></span>
  );
};

export default ItemColors;
