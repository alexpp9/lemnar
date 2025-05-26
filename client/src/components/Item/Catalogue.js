import Item from './Item';
const Catalogue = ({ fetchedData }) => {
  return (
    <div>
      <Item data={fetchedData} />
    </div>
  );
};

export default Catalogue;
