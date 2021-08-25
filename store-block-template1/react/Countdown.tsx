import React, { useState } from 'react'

import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context/useProduct'


import { useCssHandles } from 'vtex.css-handles'

import { TimeSplit } from './typings/global'
import { tick, getTwoDaysFromNow } from './utils/time'

import productReleaseDate from './graphql/productReleaseDate.graphql'

//react/Countdown.tsx
const DEFAULT_TARGET_DATE = getTwoDaysFromNow()


interface CountdownProps {}

const CSS_HANDLES = ['countdown'] as const


const Countdown: StorefrontFunctionComponent<CountdownProps> = ({}) => {
  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00',
  })
  const handles = useCssHandles(CSS_HANDLES)

  const { product } = useProduct()

  const { data, loading, error } = useQuery(productReleaseDate, {
   variables: {
     slug: product?.linkText
   },
   ssr: false
  })
 
  if (!product) {
    return (
      <div>
        <span>There is no product context.</span>
      </div>
    )
  }

  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <span>Error!</span>
      </div>
    )
  }

  tick(data?.product?.releaseDate || DEFAULT_TARGET_DATE, setTime)

  return (
       
      <div className={`${handles.countdown} db tc`}>
        {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
      </div>
   
  )
}
Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default Countdown
