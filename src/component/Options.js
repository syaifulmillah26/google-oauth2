import * as legoData from "../legoLoading.json"
import * as doneData from "../doneLoading.json"
import * as errorData from "../errorLoading.json"


export const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
  preserveAspectRatio: "xMidYMid slice"
  }
}

export const defaultOptions2 = {
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}

export const defaultOptions3 = {
  loop: false,
  autoplay: true,
  animationData: errorData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
}
