import { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";
import "./index.scss";
import ItemColors from "./ItemColors";
import { memo } from "react";

interface IProps {
  product: IProduct;
  setProductEditModal: (product: IProduct) => void;
  openEditModal: () => void;
  openConfirmDelete: () => void;
  setEditTempColor: (val: string[]) => void;
}
const ProductCard = ({
  product,
  setProductEditModal,
  openEditModal,
  setEditTempColor,
  openConfirmDelete,
}: IProps) => {
  const { colors, category, description, imageURL, price, title } = product;

  // ** Render
  const renderColors = colors.map((color) => (
    <ItemColors color={color} key={color}></ItemColors>
  ));
  // ** Handler
  const onEdit = () => {
    setEditTempColor(product.colors);
    setProductEditModal(product);
    openEditModal();
  };
  const onDelete = () => {
    setProductEditModal(product);
    openConfirmDelete();
  };
  // console.log(productEditModalColors);
  return (
    <div className="flex flex-col justify-between shadow-md max-w-sm md:max-w-md lg:max-w-lg my-2 mx-auto product-card border border-gray-100 p-2 box-border">
      <div className="max-h-60 lg:max-h-44 overflow-hidden">
        <Image
          Url={imageURL}
          alt={"Product-Pic"}
          className="w-full h-full rounded-md select-none object-cover"
        />
      </div>
      <div>
        <h3 className="text-lg my-2 font-medium">{title}</h3>
        <p className="text-zinc-600 text-sm">{textSlicer(description)}</p>
        <div className="flex mt-3 mb-3 space-x-2">
          {renderColors}
          <span className="block w-4 h-4 cursor-default"></span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-indigo-700">
            ${Number(price).toLocaleString()}
          </span>
          <div className="flex items-center">
            <Image
              Url={category.imageURL}
              alt={"Product-Pic"}
              className="rounded-full w-8 h-8 me-1 object-center"
            />
            <span>{category.name}</span>
          </div>
        </div>
        <div className="flex justify-between space-x-2 mt-2">
          <Button
            className="bg-indigo-700 hover:bg-indigo-800"
            width="w-full"
            onClick={() => onEdit()}
          >
            Edit
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700"
            width="w-full"
            onClick={() => onDelete()}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
