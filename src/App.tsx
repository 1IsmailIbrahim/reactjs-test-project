import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components";
import Model from "./components/ui/Model";
import { categories, colors, formInputsList, productList } from "./data";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { IProduct } from "./interfaces";
import { productValidation } from "./Validation";
import ErrorMessage from "./components/ErrorMessage";
import ItemColors from "./components/ItemColors";
import { v4 as uuid } from "uuid";
import Select from "./components/ui/Select";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const defaultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  // ** State
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [productEditModal, setProductEditModal] =
    useState<IProduct>(defaultProduct);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  // ** Handler
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const closeEditModal = () => setIsOpenEditModal(false);
  const openEditModal = () => setIsOpenEditModal(true);

  const closeConfirmDelete = () => setIsOpenConfirmDelete(false);
  const openConfirmDelete = () => setIsOpenConfirmDelete(true);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // FOR EDIT FORM
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductEditModal({
      ...productEditModal,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const addCancel = () => {
    closeModal();
    setProduct(defaultProduct);
  };

  // FOR EDIT FORM
  const addCancelEditModal = () => {
    closeEditModal();
    setProductEditModal(defaultProduct);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { description, title, price, imageURL } = product;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });
    const hassErrorMsg =
      Object.values(errors).some((v) => v === "") &&
      Object.values(errors).every((v) => v === "");
    if (!hassErrorMsg) {
      setErrors(errors);
      return;
    }
    setProducts((prev) => [
      { ...product, id: uuid(), colors: tempColor, category: selectedCategory },
      ...prev,
    ]);
    setProduct(defaultProduct);
    setTempColor([]);
    closeModal();
    toast.success("Product is added successfully!");
  };

  // FOR EDIT FORM
  const submitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { description, title, price, imageURL } = productEditModal;
    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
    });
    const hassErrorMsg =
      Object.values(errors).some((v) => v === "") &&
      Object.values(errors).every((v) => v === "");
    if (!hassErrorMsg) {
      setErrors(errors);
      return;
    }

    const selectedProduct = products.map(
      (product) => product.id === productEditModal.id
    );

    productEditModal.colors = tempColor;
    const updatedProducts = [...products];
    updatedProducts[selectedProduct.indexOf(true)] = productEditModal;
    setProducts(updatedProducts);

    setProductEditModal(defaultProduct);
    setTempColor([]);
    closeEditModal();
    toast.success("Product is updated successfully!", {
      style: {
        backgroundColor: "#F5F515",
      },
    });
  };

  // FOR DELET PRODUCT
  const removeProductHandler = (): void => {
    const deleteProductFilter = products.filter(
      (product) => product.id !== productEditModal.id
    );
    setProducts(deleteProductFilter);
    closeConfirmDelete();
    toast.success("Product is deleted successfully!", {
      style: {
        backgroundColor: "#E12F2F",
        color: "white",
      },
    });
  };

  // ** Render
  const renderProductList = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductEditModal={setProductEditModal}
      openEditModal={openEditModal}
      setEditTempColor={setTempColor}
      openConfirmDelete={openConfirmDelete}
    />
  ));

  const renderFormInputsList = formInputsList.map((input) => (
    <div className="flex flex-col mb-2" key={input.id}>
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
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  // FOR EDIT FORM
  const renderEditFormInputsList = formInputsList.map((input) => (
    <div className="flex flex-col mb-2" key={input.id}>
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
        value={productEditModal[input.name]}
        onChange={onChangeEditHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProductColors = colors.map((color) => (
    <ItemColors
      key={color}
      color={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((e) => e !== color));
          return;
        }
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));

  return (
    <>
      <div className="my-8 container">
        <div className="flex justify-center">
          <Button
            className="bg-indigo-700 hover:bg-indigo-800"
            width="w-fit"
            onClick={openModal}
          >
            Build a Product
          </Button>
        </div>
        <div className="my-8 mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {renderProductList}
        </div>
      </div>

      {/* ADD PRODUCT MODAL */}
      <Model isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputsList}
          <Select
            setSelected={setSelectedCategory}
            selected={selectedCategory}
          />
          <div className="flex flex-wrap mt-2 mb-3 space-x-2">
            {tempColor.map((color) => (
              <span
                className="bg-[] text-cyan-50 p-1 rounded-md text-xs mb-1"
                key={color}
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap space-x-2">{renderProductColors}</div>
          <div className="flex space-x-3 mt-5 mb-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-zinc-700 hover:bg-zinc-800"
              onClick={addCancel}
            >
              Close
            </Button>
          </div>
        </form>
      </Model>

      {/* EDIT THIS PRODUCT FOR EDIT FORM */}
      <Model
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        title="EDIT THIS PRODUCT"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderEditFormInputsList}
          <Select
            selected={productEditModal.category}
            setSelected={(value) =>
              setProductEditModal({ ...productEditModal, category: value })
            }
          />
          <div className="flex flex-wrap mt-2 mb-3 space-x-2">
            {tempColor.map((color) => (
              <span
                className="text-cyan-50 p-1 rounded-md text-xs mb-1"
                key={color}
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap space-x-2">{renderProductColors}</div>
          <div className="flex space-x-3 mt-5 mb-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-zinc-700 hover:bg-zinc-800"
              onClick={addCancelEditModal}
            >
              Close
            </Button>
          </div>
        </form>
      </Model>

      {/* Delete THIS PRODUCT */}
      <Model
        isOpen={isOpenConfirmDelete}
        closeModal={closeConfirmDelete}
        title="Delete Product"
        description="If you delete this product, you will lose all data about it, and you will not be able to return it again."
      >
        <div className="flex space-x-3 mt-5 mb-3">
          <Button
            className="bg-red-700 hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Delete
          </Button>
          <Button
            className="bg-zinc-700 hover:bg-zinc-800"
            onClick={closeConfirmDelete}
          >
            Close
          </Button>
        </div>
      </Model>

      <Toaster />
    </>
  );
};

export default App;
