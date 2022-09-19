import React from 'react';

import Form from 'react-bootstrap/Form';
import { useDispatch} from 'react-redux';
import { searchResult } from '../Actions/EcommerceAction';

function SearchProduct() {

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
 
  }
  return (
    <div>
        <Form onSubmit={(e) => handleSearch(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Search Product</Form.Label>
            <Form.Control placeholder="Search Products" onChange={(e) => dispatch(searchResult(e.target.value))} autoComplete="off" style={{width: "20rem"}}/>
          </Form.Group>
        </Form>
    </div>
  )
}

export default SearchProduct