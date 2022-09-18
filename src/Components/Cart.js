import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { decreamentQuantity, increamentQuantity, removeFromCart } from '../Actions/CartAction';

function Cart() {

  const cartData = JSON.parse(localStorage.getItem("cart_data"));

  const dispatch = useDispatch();
  const remove = (itemId) => {
    dispatch(removeFromCart(itemId));
  }
  
  return (

    <Container className="mt-4">
      {
        cartData.length !== 0 ? cartData.map((item) => {
          return(
            <Card key={item.id} className="mt-2">
              <Card.Header>{item.title}</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Button onClick={() => dispatch(increamentQuantity(item.id))}>+</Button>
                <Button onClick={() => dispatch(decreamentQuantity(item.id))}>-</Button>
                <Card.Text>Total Quantity : {item.qty}</Card.Text>
                <Card.Img variant="top" src={item.image} className="p-5" style={{height: "20rem", width: "15rem",cursor: "pointer" }} onClick={() => console.log("Clicked")}/>
                <Card.Text>
                  {item.description}
                </Card.Text>
                
                <Button variant="primary" onClick={() => remove(item.id)}>Remove From Cart</Button>
                </Card.Body>
            </Card>
          )
        }) : "Cart Is empty"
        
      }
    </Container>
    
  );
}

export default Cart;