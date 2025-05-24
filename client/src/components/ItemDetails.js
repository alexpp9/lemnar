import { useLocation } from 'react-router-dom';
const ItemDetails = () => {
  const location = useLocation();
  const item =
    location.state && location.state.item ? location.state.item : undefined;
  console.log(item);
  if (!item) {
    return <p className="text-center mt-5">No item data found.</p>;
  }
  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
};

export default ItemDetails;
