import React from 'react'
import Rating from '../src'

export const Desc = () => {
  return (
    <>
      <h1>Desc</h1>
      <div className="rating-desc__wrap">
        <Rating
          defaultValue={1}
          descRender={(value) => {
            const arr = ['极差', '失望', '一般', '满意', '很满意']
            return <span style={{ color: '#FF6633' }}>{arr[Math.ceil(value) - 1]} </span>
          }}
        ></Rating>
      </div>
    </>
  )
}
