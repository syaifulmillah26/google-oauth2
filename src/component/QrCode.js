import React, { Component } from 'react'
import QRCode from 'qrcode.react'

const QrCode = () => {
  return (
    <QRCode
      id="123456"
      value="123456"
      size={290}
      level={"H"}
      includeMargin={true}
    />
  )
}

export default QrCode

