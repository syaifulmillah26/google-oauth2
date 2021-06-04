import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.css";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as legoData from "./legoLoading.json";
import * as doneData from "./doneLoading.json";
import * as errorData from "./errorLoading.json";


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
  }
}

const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}

const defaultOptions3 = {
  loop: false,
  autoplay: true,
  animationData: errorData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      start: undefined,
      loading: undefined,
      done: false
    }
  }

  responseGoogle = (response) => {
    if (response.tokenObj) {
      this.setState({ start: true })
      const token = response.tokenObj.id_token
      const provider = response.tokenObj.idpId
      axios
        .post(
          `${process.env.REACT_APP_MENUKU_URL}/api/auth/request`,
          {
            token: token,
            provider: provider
          }
        )
        .then((response) => {
          this.setState({ loading: true, done: true })
          console.log(response)
        })
        .catch((e) => {
          this.setState({ loading: true })
          console.log(e.response)
          console.log("Response", e);
        });
    }
  }

  render() {
    return (
      <FadeIn>
        <div className="d-flex align-items-center justify-content-center mt-5">
          { !this.state.start ? (
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText='Login with Google'
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          ) : (
              <div className="d-flex align-items-center justify-content-center ">
                <h1>Exchanging Token . . . . </h1>
                {!this.state.loading ? (
                  <Lottie options={defaultOptions} height={120} width={120} />
                ) : (
                  <div>
                    {this.state.done ? (
                      <div>
                        <Lottie options={defaultOptions2} height={120} width={120} />
                      </div>
                      ) : (
                      <Lottie options={defaultOptions3} height={120} width={120} />
                    )}
                  </div>
                )}
              </div>
          )}
        </div>
      </FadeIn>
    )
  }
}
