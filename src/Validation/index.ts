import { IProductValid } from "../interfaces";

/**
 *
 * @param product
 * @returns
 */
export const productValidation = (product: IProductValid) => {
  const { title, description, imageURL, price } = product;
  const errors: IProductValid = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  const regUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(imageURL);
  if (!title.trim() || title.length < 5 || title.length > 80) {
    errors.title = "Product title must be between 5 and 80 characters!";
  }
  if (
    !description.trim() ||
    description.length < 10 ||
    description.length > 900
  ) {
    errors.description =
      "Product description must be between 10 and 900 characters!";
  }
  if (!description.trim() || !regUrl) {
    errors.imageURL = "You enter not valid image Url";
  }
  if (!price.trim() || isNaN(Number(price))) {
    errors.price = "Valid price is required";
  }
  return errors;
};
