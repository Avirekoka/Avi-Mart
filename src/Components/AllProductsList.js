import React, {useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Actions/CartAction';
import { useState } from 'react';
import {checkPrime} from '../Utility/utility';

function AllProductList() {

  const ecommerceData = useSelector(state => state.ecommerce);
  const [state,setState] = useState(false);  
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState(ecommerceData);
  const soldOutProducts = [1,3,5];

  const dispatch = useDispatch();

  setTimeout(() => {
    setState(true);
  }, 60000);

  useEffect(() => {
    const filteredProducts = ecommerceData.filter(product => {
      return product.title.toLowerCase().includes(searchText);
    });

    setSearchData(filteredProducts);

  }, [searchText,ecommerceData]);

  return (
    <Container className='mt-4'>
        <div className="row">
          <div className='col-6'>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Search Product</Form.Label>
                <Form.Control placeholder="Search Products" onChange={(e) => setSearchText(e.target.value)} autoComplete="off" style={{width: "20rem"}} value={searchText}/>
              </Form.Group>
            </Form>
          </div>

          <div className='col'>

          </div>

        </div>
        <hr />
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
            {
                searchData?.map(item => {
                    return(
                        <Card style={{ width: '20rem',marginBottom: "1rem", padding: "5px"}} key={item.id} >
                            <Card.Title className='text-center'>{item.title}</Card.Title>
                            <Card.Img variant="top" src={item.image} className="p-5" style={{height: "25rem"}} />
                            <Card.Body>                        
                                <Card.Text>{item.rating.rate}</Card.Text>
                                {
                                  checkPrime(item.id) === true ? <Card.Text><span style={{textDecoration: "line-through"}}>{item.price}</span> 5% off {(item.price - ((item.price*5)/100)).toFixed(2)}</Card.Text> : <Card.Text>{item.price.toFixed(2)}</Card.Text> 
                                }
                            </Card.Body>
                            
                            {
                                state && soldOutProducts.includes(item.id) ? <Button className="disabled">Sold Out</Button> : <Button onClick={() => dispatch(addToCart(item.id))} >Add To Cart</Button>
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