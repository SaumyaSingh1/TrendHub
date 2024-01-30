import React from "react";
import shoes from "../assets/shoes.png";
import {Link} from 'react-router-dom'

const Card: React.FC<{ image: string; offer: string; category: string }> = ({
  image,
  offer,
  category,
}) => {
  const gridItemStyle: React.CSSProperties = {
    backgroundColor: "#503C3C",
    border: "2px solid rgba(0, 0, 0, 0.8)",
    padding: "20px",
    fontSize: "16px",
    textAlign: "center",
  };
  const imageStyle: React.CSSProperties = {
    maxWidth: "100%",
    maxHeight: "250px",
    margin: "0 auto", // Center the image horizontally
  };

  const offerStyle: React.CSSProperties = {
    color: "#F0DBDB",
    padding: "10px",
    fontSize: "30px",
    marginTop: "10px",
    fontFamily: "Merriweather",
    // fontFamily: "PT Serif",
  };

  return (
    <div style={gridItemStyle}>
     <img src={image} alt="Product" style={imageStyle} />
      <div style={offerStyle}>
        {offer} off on <i>{category}</i> !! Shop Now
      </div>
    </div>
  );
};

function CategoryCards() {
  const mens = {
    category: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1515938736719-95b568dc8dd8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "50%",
  };
  const womens = {
    category: "Indian Wear",
    image:
      "https://images.unsplash.com/photo-1675881149207-4b021be0ecdd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "30%",
  };
  const kid = {
    category: "Kid's Fashion",
    image:
      "https://images.unsplash.com/photo-1629120578156-6b56dc438eea?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "50%",
  };
  const shoe = {
    category: "Shoes",
    image: shoes,
    offer: "50%",
  };
  const bag = {
    category: "Handbags",
    image:
      "https://images.unsplash.com/photo-1597633125184-9fd7e54f0ff7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "60%",
  };
  const trouser = {
    category: "Jeans",
    image:
      "https://images.unsplash.com/photo-1629374355292-bf46fb4a5ffc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "20%",
  };
  const headphones = {
    category: "Gadgets",
    image:
      "https://images.unsplash.com/photo-1614179818511-4bb0af32e44a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "40%",
  };
  const accessories = {
    category: "jewels",
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    offer: "30%",
  };
  const Watches = {
    category: "watch",
    image:
      "https://images.unsplash.com/photo-1552493987-2841b6dd22dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHdhdGNoZXMlMjBmb3IlMjBtZW58ZW58MHwxfDB8fHww",
    offer: "20%",
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
    <Link to='inventory' state={{category:"men's wear"}} >
    <Card {...mens} /></Link>
    <Link to='inventory' state={{category:"women's wear"}}><Card {...womens} /></Link>
    <Link to='inventory' state={{category:"kid's wear"}}><Card {...kid} /></Link>
    <Link to='inventory' state={{category:"shoes"}}><Card {...shoe} /></Link>
    <Link to='inventory' state={{category:"trouser"}}> <Card {...trouser} /></Link>
    <Link to='inventory' state={{category:"bags"}}> <Card {...bag} /></Link>
    <Link to='inventory' state={{category:"headphone"}}> <Card {...headphones} /></Link>
    <Link to='inventory' state={{category:"watch"}}> <Card {...Watches} /></Link>
      <Link to="inventory" state={{category:"jewelery"}}> <Card {...accessories} /></Link> 
     
  </div>
  </>
  );
}

export default CategoryCards;
