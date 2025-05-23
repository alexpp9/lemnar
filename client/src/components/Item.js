const Item = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id || item.name}>
          <img src={item.image_url} alt={item.name} />
          <h2>{item.name}</h2>
          <p>Type: {item.type}</p>
          <p>Material: {item.material}</p>
          <p>Colour: {item.colour}</p>
          <p>Weight: {item.weight} kg</p>
          <p>Price: ${item.price}</p>
          <p>Room: {item.room}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Item;
