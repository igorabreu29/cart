import { CartItems } from '../../App'
import styles from './Cart.module.css'

interface CartProps {
  item: CartItems
  deleteCart: (id: number) => void
  littleFunction: (id: number) => void
}

export function Cart({item, deleteCart, littleFunction}: CartProps) {

  return (
    <div className={styles.cartContent}>
      <p>Name: {item.product.name}</p>
      <p>Price: {item.product.price}</p>
      <span>Quantity: {item.quantity}</span>
      <div>
        <p>Total: {item.quantity * item.product.price}</p>
      </div>
      <button onClick={() => deleteCart(item.product.id)}>Delete from cart</button> 
      <button onClick={() => littleFunction(item.product.id)}>
        -
      </button>
    </div>
  )
}