import { ChangeEvent, useState } from "react";
import ProductCard from "./components";
import Model from "./components/ui/Model";
import { formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";

const App = () => {
  // ** State
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  // ** Handler
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  // ** Render
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const renderFormInputsList = formInputsList.map((input) => (
    <div className="flex flex-col mb-2">
      <label
        className="block mb-1 text-sm font-medium text-gray-900"
        htmlFor={input.id}
      >
        {input.label}
      </label>
      <Input
        id={input.id}
        name={input.name}
        type={input.type}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
    </div>
  ));
  return (
    <>
      <div className="my-8 container">
        <div>
          <Button
            className="bg-indigo-700 hover:bg-indigo-800"
            width="w-fit"
            onClick={openModal}
          >
            Add Product
          </Button>
        </div>
        <div className="my-8 mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {renderProductList}
        </div>
      </div>
      <Model isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
        <div className="space-y-3">
          {renderFormInputsList}
          <form className="flex space-x-3 mt-5 mb-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-zinc-700 hover:bg-zinc-800"
              onClick={closeModal}
            >
              Close
            </Button>
          </form>
        </div>
      </Model>
    </>
  );
};

export default App;
