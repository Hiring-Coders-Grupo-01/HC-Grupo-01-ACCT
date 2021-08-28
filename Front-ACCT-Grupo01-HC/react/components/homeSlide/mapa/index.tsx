import React from 'react'
import { Container, Flipper, MapaQuadrado } from './styled'
import quadranteVTEX from './images/quadrante_vtex_2021.png'

export default function Mapa() {
    return (
        <Container>
            <Flipper>
                <MapaQuadrado src={quadranteVTEX} alt="mapa quadrado" />
            </Flipper>
        </Container>
    )
}
