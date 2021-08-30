import React from 'react'
import { Container, Flipper } from './styled'

interface PerspectiveAnimationImageSliderProps {
    children?: any
}

function PerspectiveAnimationImageSlider(props: PerspectiveAnimationImageSliderProps) {
    const {
        children
      } = props
    return (
        <Container>
            <Flipper>
                {children}
            </Flipper>
        </Container>
    )
}

export default PerspectiveAnimationImageSlider;
