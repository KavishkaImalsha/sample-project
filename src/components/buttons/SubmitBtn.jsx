import React from 'react'

const SubmitBtn = ({ type, btnName }) => {
  return (
      <>
          <button type={type} className="submitButton">{ btnName }</button>
      </>
  )
}

export default SubmitBtn