import { useState } from "react"

function Cart({ show, hideShow, submit, data }) {
  const handleSubmit = () => {
    if (!address) {
      alert("Please enter your address before submitting.")
      return
    }
    console.log("Order submitted for item:", data, "to address:", address)
    setShowAddress(false)
    setAddress("")
    submit()
  }
  const [showAddress, setShowAddress] = useState(false)
  const [address, setAddress] = useState("")
  return (
    <div>
      {show && (
        <div className="cart">
          <div className="cartCon">
            <div className="cartHeader">
              <h2>Cart 🛒</h2>
              <button className="close" onClick={hideShow}>
                X
              </button>
            </div>
            {!showAddress ? (
              <>
                <p>Items Selected</p>
                <table className="cartTable">
                  <th>Items Names</th>
                  <th>Price</th>
                  {data.map((item, index) => (
                    <tr>
                      <td key={index}>
                        <span>Item {item}</span>
                      </td>
                      <td key={index}>
                        <span>${(item * 10).toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <b>Total Items : {data.length} </b>
                    </td>
                    <td>
                      <b>
                        $
                        {data
                          .reduce((acc, item) => acc + item * 10, 0)
                          .toFixed(2)}
                      </b>
                    </td>
                  </tr>
                </table>
              </>
            ) : (
              <div className="address">
                <p>Please enter your address</p>
                <textarea
                  rows="4"
                  cols="30"
                  placeholder="Enter your address here..."
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
            )}
            <button
              onClick={
                !showAddress
                  ? () => {
                      setShowAddress(prev => !prev)
                      console.log("Items in cart:", data)
                    }
                  : handleSubmit
              }
            >
              {showAddress ? "Submit" : "Proceed to Buy"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
