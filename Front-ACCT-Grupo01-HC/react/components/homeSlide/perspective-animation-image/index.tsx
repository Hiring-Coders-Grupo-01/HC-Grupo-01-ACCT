import React from 'react'
import { Container, Flipper, Perspective3D } from './styled'

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
                <Perspective3D>
                    {children}
                </Perspective3D>
            </Flipper>
        </Container>
    )
}

export default PerspectiveAnimationImageSlider;
