import React from 'react'

type props = {
    message: string
}

const ErrorInput = ({message}:props) => {
  return (
    <span className='text-sm text-red-700 text-wrap font-medium'>{message}</span>
  )
}

export default ErrorInput