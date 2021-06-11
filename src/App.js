import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import FadeIn from "react-fade-in"
import Lottie from "react-lottie"
import { defaultOptions, defaultOptions2, defaultOptions3 } from './component/Options';
import MidtransForm from './component/MidtransForm'
import ResponseFacebook from './component/ResponseFacebook';
import ResponseGoogle from './component/ResponseGoogle';


const App = () => {
  const [ state, setState ] = useState({})
  return (
    <FadeIn>
      <div className="d-flex align-items-center justify-content-center mt-5">
        { !state.start ? (
          <div>
            <h1>LOGIN WITH FACEBOOK OR GOOGLE</h1>
            <div className='facebook d-flex align-items-center justify-content-center mb-3 mt-5'>
              <ResponseFacebook setState={setState} />
            </div>
            <div className='google d-flex align-items-center justify-content-center mb-5'>
              <ResponseGoogle setState={setState} />
            </div>
            <div className='google d-flex align-items-center justify-content-center mt-5'>
              <MidtransForm setState={setState} />
            </div>
          </div>
        ) : (
            <div className="d-flex align-items-center justify-content-center ">
              <h1>{state.loadingMessage}</h1>
              {!state.loading ? (
                <Lottie options={defaultOptions} height={120} width={120} />
              ) : (
                <div>
                  {state.done ? (
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

export default App;
