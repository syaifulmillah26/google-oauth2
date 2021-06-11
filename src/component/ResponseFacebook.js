import React from 'react'
import FacebookLogin from 'react-facebook-login'
import axios from 'axios'

const ResponseFacebook = ({ setState }) => {

  const handleResponse = response => {
    if (response.accessToken) {
      setState({ loadingMessage: 'Please Wait . . . .', start: true })
      const token = response.accessToken
      axios
        .post(
          `${process.env.REACT_APP_SOLIDUS_URL}/api/auth/request`,
          {
            token: token,
            provider: 'facebook'
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
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      callback={handleResponse}
    />
  )
}

export default ResponseFacebook
