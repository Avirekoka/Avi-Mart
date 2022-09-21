import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Actions/CartAction';
import { useState } from 'react';
import {checkPrime} from '../Utility/utilityFunction';
import { searchResult } from '../Actions/EcommerceAction';
import Pagination from 'react-bootstrap/Pagination';
import {soldOutProducts,itemsPerPage} from '../Utility/utilityFunction';

function AllProductList() {

  const ecommerceData = useSelector(state => state.ecommerce);
  const [soldProducts,setSoldProducts] = useState(false); 
  const [activePage, setActivePage] = useState(1); 
  const [lowerIndex,setLowerIndex] = useState(0);
  const [higherIndex,setHigherIndex] = useState(itemsPerPage);
  const [initialState, setInitialState] = useState([]);
  const [searchText,setSearchText] = useState({
    txt : "",
    currPage: 1
  })
  const itemsList = [];
  
  const dispatch = useDispatch();

  setTimeout(() => {
    setSoldProducts(true);
  }, 60000);

  
  for (let i = 1; i <= Math.ceil(ecommerceData.length/itemsPerPage); i++) {
    itemsList.push(
      <Pagination.Item key={i} active={i === activePage}>
        {i}
      </Pagination.Item>,
    );
  }
  
  const handlePaginationData = () => {
    if(ecommerceData.length > 0){
      setInitialState(ecommerceData.slice(lowerIndex,higherIndex));
    }
  };

  const handlePageChange = (e) => {
    const currentPage = Number(e.target.textContent);
    setActivePage(currentPage);
    setLowerIndex(itemsPerPage * (currentPage - 1));
    setHigherIndex(itemsPerPage * currentPage);
  };

  const handleSearch = (e) => {
    searchText.currPage = activePage;
    searchText.txt = e.target.value;
    setSearchText(searchResult);
    dispatch(searchResult(searchText));
  }
  
  useEffect(() => {
    handlePaginationData(0,5);
  }, [ecommerceData, activePage]);
  
  return (
    <Container className='mt-4'>
        
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Search Product</Form.Label>
            <Form.Control placeholder="Search Products" onChange={(e) => handleSearch(e)} autoComplete="off" style={{width: "20rem"}} />
          </Form.Group>
        </Form>
        <hr />
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
            {
                initialState?.map(item => {
                    return(
                        <Card style={{ width: '20rem',marginBottom: "1rem", padding: "5px"}} key={item.id} >
                            <Card.Title className='text-center'>{item.title}</Card.Title>
                            <Card.Img variant="top" src={item.image} className="p-5" style={{height: "25rem"}} />
                            <Card.Body>                        
                                <Card.Text style={{background: "green",fontWeight: "bold",width: "3rem",textAlign: "center"}}>{item.rating.rate}<i className="bi bi-sticky"></i></Card.Text>
                                {
                                  checkPrime(item.id) === true ? <Card.Text><span style={{textDecoration: "line-through", color: "red"}}>{item.price}</span> <span style={{color: "green"}}>5% off </span>{(item.price - ((item.price*5)/100)).toFixed(2)}</Card.Text> : <Card.Text>{item.price.toFixed(2)}</Card.Text> 
                                }
                            </Card.Body>
                            
                            {
                                soldProducts && soldOutProducts.includes(item.id) ? <Button className="disabled">Sold Out</Button> : <Button onClick={() => dispatch(addToCart(item.id))} >Add To Cart</Button>
                            }
                            
       
                        </Card>
                    )
                })
            }
        </div>
        
        <Pagination onClick={(e) => handlePageChange(e)}>{itemsList}</Pagination>
    </Container>
  );
}

export default AllProductList;