import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../context/categories.context";
import CategoryPreview from "../../Components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categories } = useContext(CategoriesContext);
  return (
    <Fragment>
      {Object.keys(categories).map((key) => {
        const products = categories[key];
        return <CategoryPreview key={key} title={key} products={products} />;
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
