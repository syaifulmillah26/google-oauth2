import React, { useState } from 'react';
import axios from 'axios'


const MidtransForm = ({ setState }) => {
  const [input, setInput] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault()
    setState({ loadingMessage: 'Please Wait . . . .', start: true })
    const { orderId, amount, snapToken } = input;
    if (event) {
      if (snapToken) {
        window.snap.pay(snapToken)
      } else {
        axios
          .post(
            `${process.env.REACT_APP_SOLIDUS_URL}/api/midtrans/charge`,
            {
              orderId: orderId,
              amount: amount
            },
            {
              headers: {
                'Authorization': 'Bearer 1e8273328b743c662f23ab6916e0ec46ff4049fd2bc146f1'
              }
            }
          )
          .then((response) => {
            setInput({ snapToken: response.data.token })
            console.log(response)
            window.snap.pay(response.data.token)
          })
          .catch((e) => {
            setState({ start: true, loadingMessage: 'Something went wrong . . . .', loading: true })
            console.log(e.response)
            console.log("Response", e);
          });
      }
    }
  }

  const handleInputChange = (event) => {
    event.persist();
    setInput(input => ({...input, [event.target.name]: event.target.value}));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Order Id</label>
        <input type="text" className='form-control' name="orderId" onChange={handleInputChange} value={input.orderId|| ''} required />
        <label>Gross Amount</label>
        <input type="number" className='form-control' name="amount" onChange={handleInputChange} value={input.amount|| ''} required />
        <input type="hidden" className='form-control' name="snapToken" onChange={handleInputChange} value={input.snapToken|| ''} required />
      </div>
      <button type="submit" className='btn btn-primary mt-2'>Pay Now</button>
    </form>
  )
}
export default MidtransForm;