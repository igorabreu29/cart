import { useState } from 'react'
import styles from './App.module.css'
import { ProductsContentProps, products } from './api/json';
import { Cart } from './components/Cart';
import { Header } from './components/Header';

export interface CartItems {
  product: ProductsContentProps
  quantity: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItems[]>([])

  const handleAddToCart = (id: number) => {
    const productId = products.find(itemId => itemId.id === id)
    const alreadyExistProductInCart = cart.find(item => {
      return item.product.id === id
    })
    console.log(alreadyExistProductInCart)

    if (alreadyExistProductInCart) {
      const addNewProduct: CartItems[] = cart.map(item => {
        if (item.product.id === id) ({
          ...item,
          quantity: item.quantity++,
        })

        return item
      })

      setCart(addNewProduct)
      return
    }

    const addNewProduct: CartItems = {
      product: productId!,
      quantity: 1
    }

    setCart(state => [...state, addNewProduct])
  }

  function deleteProductFromCart(id: number) {
    const removeProductFromCart = cart.filter(item => {
      return item.product.id !== id
    })

    setCart(removeProductFromCart)
  }

  function little(id: number) {
    const alreadyExistProductInCart = cart.find(item => {
      return item.product.id === id
    })

    if (alreadyExistProductInCart!.quantity > 1) {
      const littleCart: CartItems[] = cart.map(item => {
        if (item.product.id === id) ({
          ...item,
          quantity: item.quantity--
        })
        return item

      })
      setCart(littleCart)
      return;
    }

    const removeProductFromCart = cart.filter(item => {
      return item.product.id !== id
    })

    setCart(removeProductFromCart)
  }

  const totalPrice = cart.reduce((acc, carts) => {
    return acc + (carts.quantity * carts.product.price)
  }, 0)

  const totalItems = cart.reduce((acc, carts) => {
    return acc + carts.quantity
  }, 0)

  return (
    <div className={styles.appContainer}>
      <Header />
      <section className={styles.productContainer}>
        {products.map(product => {
          return (
            <div key={product.id} className={styles.productContent}>
              <img src={`${product.imageURL}`} alt="" />
              <div className={styles.productInformation}>
                <p>{product.name}</p>
                <p>$ {product.price}</p>
              </div>
              <button onClick={() => handleAddToCart(product.id)}>Add by cart</button>
            </div>
          )
        })}
      </section>

      <section className={styles.cartContainer}>
        <h2>Items Cart</h2>
        <h3>Total price: R${totalPrice}</h3>
        <h3>Total items: {totalItems}</h3>

        {cart.map(item => {
          return (
            <Cart 
              key={item.product.id} 
              item={item} 
              deleteCart={deleteProductFromCart} 
              littleFunction={little}
            />
          )
        })}
      </section>
    </div>
  )
}