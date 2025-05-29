import { useEffect, useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import Cart from "./Cart"

function App() {
  const [text, setText] = useState("Anything you want to write here")
  const [products, setProducts] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [cartData, setCartData] = useState([])

  const handleShowCart = () => {
    if (cartData.length === 0) {
      alert("Please add items to the cart before proceeding.")
      return false
    } else {
      setShowCart(true)
    }
  }

  useEffect(() => {
    const int = setInterval(() => {
      const randomText = Math.random().toString(36).substring(2, 50)
      setText(randomText)
    }, 3000)
    return () => {
      clearInterval(int)
    }
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("./listItems.json")
      console.log("🚀 ~ fetchProducts ~ response:", response)
      const data = await response.json()
      console.log("🚀 ~ fetchProducts ~ data:", data)
      setProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="App">
      <div className="hero">
        <h1> {text}</h1>
      </div>
      <div className="products">
        <div className="prodHeader">
          <h3>Products</h3>
          <button onClick={handleShowCart}>Cart</button>
        </div>
        <div className="prodList">
          {products.map(product => {
            const isInCart = cartData.includes(product.id)
            return (
              <div className="product" key={product.id}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button
                  onClick={() => {
                    setCartData(prev =>
                      isInCart
                        ? prev.filter(id => id !== product.id)
                        : [product.id, ...prev]
                    )
                  }}
                >
                  {isInCart ? "Already added" : "Add to Cart"}
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <Cart
        show={showCart}
        hideShow={() => setShowCart(false)}
        submit={() => {
          setShowCart(false)
          setCartData([])
        }}
        data={cartData}
      />
    </div>
  )
}

export default App
