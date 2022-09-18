import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decreamentQuantity, increamentQuantity, removeFromCart } from '../Actions/CartAction';

function Cart() {

  useSelector(state => state.cart);

  const cartData = JSON.parse(localStorage.getItem("cart_data"));

  const dispatch = useDispatch();
  const remove = (itemId) => {
    dispatch(removeFromCart(itemId));
  }
  
  return (

    <Container className="mt-4">
      <table className="table table-bordered table-hover table-dark align-middle">
        <thead className="text-center">
          <tr>
            <th scope="col">Item No.</th>
            <th scope="col">Title</th>
            <th scope="col">Image</th>
            <th scope="col">Qty</th>
            <th scope="col">Price</th>
            <th scope="col">+/-</th>
            
          </tr>
        </thead>
        {
          cartData && cartData.cartItem.length !== 0 ? cartData.cartItem.map((item) => {
            return(
                
                <tbody key={item.id} className="text-center">
                  <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.title}</td>
                    <td>
                      <img src={item.image} width={"200px"} height={"260px"}/>
                    </td>
                    <td>{item.qty}</td>
                    <td>{item.qty * item.price}</td>
                    <td>
                      <Button onClick={() => dispatch(increamentQuantity(item.id))} style={{marginRight: "1rem"}}>+</Button>
                      <Button onClick={() => dispatch(decreamentQuantity(item.id))}>-</Button>
                      
                    </td>
                    
                  </tr>
                </tbody>
            )
          }) : <>
            <h3>Your cart is empty, fill it now</h3>
            <Link to="/"><Button>Invoices</Button></Link>
            
          </>
        }

        <tfoot className='text-center font-weight-bold'>
          <tr>
            <td colSpan="3">Total</td>
            <td>{cartData.totalQty}</td>
            <td colSpan="2">{cartData.totalAmt}</td>
          </tr>
        </tfoot>
      </table>

      
     
    </Container>
    
  );
}

export default Cart;