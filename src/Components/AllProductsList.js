import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import SearchProduct from './SearchProduct';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Actions/CartAction';
import { useState } from 'react';

function AllProductList({ecommerceData}) {
  const [state,setState] = useState(false);  

  const dispatch = useDispatch();

  setTimeout(() => {
    setState(true);
    
  }, 5000);

  const addItemInCart = (itemId) => {

    dispatch(addToCart(itemId))
  };


  return (
    <Container className='mt-4'>
        <SearchProduct />
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
            {
                ecommerceData?.map(item => {
                    return(
                        <Card style={{ width: '20rem',marginBottom: "1rem", padding: "5px"}} key={item.id} >
                            <Card.Title className='text-center'>{item.title}</Card.Title>
                            <Card.Img variant="top" src={item.image} className="p-5" style={{height: "25rem"}} />
                            <Card.Body>                        
                                <Card.Text>{item.rating.rate}</Card.Text>
                                <Card.Text>{item.price}</Card.Text>
                            </Card.Body>
                            
                            {
                                state && [1,3,5].includes(item.id) ? <Button className="disabled">Sold Out</Button> : <Button onClick={() => addItemInCart(item.id)} >Add To Cart</Button>
                            }
                            
       
                        </Card>
                    )
                })
            }
        </div>
        
        
    </Container>
  );
}

export default AllProductList;