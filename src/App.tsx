import { useState } from "react";
import ProductCard from "./components";
import Model from "./components/ui/Model";
import { productList } from "./data";
import Button from "./components/ui/Button";

function App() {
  // ** State
  const [isOpen, setIsOpen] = useState(false);

  // ** Handler
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // ** Render
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  return (
    <>
      <div className="container">
        <Button
          className="bg-indigo-700 hover:bg-indigo-800"
          onClick={openModal}
        >
          Add Product
        </Button>
        <div className=" my-8 mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {renderProductList}
        </div>
      </div>
      <Model isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
        <div className="flex space-x-3">
          <Button className="bg-indigo-700 hover:bg-indigo-800">Submit</Button>
          <Button
            className="bg-zinc-700 hover:bg-zinc-800"
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
      </Model>
    </>
  );
}

export default App;
