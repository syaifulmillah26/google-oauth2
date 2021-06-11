import React from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

const ResponseGoogle = ({ setState }) => {

  const handleResponse = response => {
    if (response.tokenObj) {
      setState({ loadingMessage: 'Please Wait . . . .', start: true })
      const token = response.tokenObj.id_token
      axios
        .post(
          `${process.env.REACT_APP_SOLIDUS_URL}/api/auth/request`,
          {
            token: token,
            provider: 'google'
          }
        )
        .then((response) => {
          setState({ start: true, loadingMessage: 'Success . . . .', loading: true, done: true })
          console.log(response)
        })
        .catch((e) => {
          setState({ start: true, loadingMessage: 'Something went wrong . . . .', loading: true })
          console.log(e.response)
          console.log("Response", e);
        });
    }
  }

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText='Login with Google'
      onSuccess={handleResponse}
      onFailure={handleResponse}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default ResponseGoogle
