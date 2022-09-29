import "./directory-item.styles.jsx";
import {
  BackgroundImage,
  DirectoryBodyContainer,
  DirectoryItemContainer,
} from "./directory-item.styles.jsx";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage
        imageUrl={imageUrl}
        // style={{
        //   backgroundImage: `url(${imageUrl})`,
        // }}
      />
      <DirectoryBodyContainer>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryBodyContainer>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
