// CartPage.jsx
import { FaHome ,FaMoneyBill } from "react-icons/fa";
import './cart.css'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import Navbar from './navbar/Navbar';

function CartPage() {
  const navigate = useNavigate();
  const { cart, totalQuantity,
     totalPrice, 
     incrementQuantity, 
     decrementQuantity, 
     removeFromCart, 
     toggleCheckedItem ,
     toggleAllItems} = useCart();
  
  return (
    <>
      <Navbar />
      <div className="cart-page">
       
        <button onClick={() => navigate('/')} id="backhome"> <FaHome size={25} /></button>
        <h3>Hãy Chọn những sản phẩm muốn thanh toán</h3>
        <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              onChange={(e) => toggleAllItems(e.target.checked)}
            />
            <label class="form-check-label" for="flexCheckDefault">
                Chọn tất cả sản phẩm
            </label>
          </div>
        <div className="cart-items">
          <ul>
          {cart.map((item, index) => (
          <li key={index} className="cart-item">
            <div className="item-image">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleCheckedItem(item)}
                />
                  </div>
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </div>
                <div className="item-details">
                  <p>
                    {item.name} sl: {item.quantity} - {item.price}$
                  </p>
                  <div>
                    <button id="but-1" onClick={() => incrementQuantity(item)}>
                      +
                    </button>
                    <button id="but-2" onClick={() => removeFromCart(item)}>
                      X
                    </button>
                    <button id="but-1" onClick={() => decrementQuantity(item)}>
                      -
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {totalQuantity > 0 && (
          <div>
            <h4>
              Tổng số sản phẩm đã chọn: {totalQuantity} - Tổng giá: {totalPrice}$
            </h4>
          </div>
        )}
        <button id="thanhtoan">
      <div className="icon">
        <FaMoneyBill size={25} />
      </div>
      Thanh Toan
    </button>
        
      </div>
    </>
  );
}

export default CartPage;
