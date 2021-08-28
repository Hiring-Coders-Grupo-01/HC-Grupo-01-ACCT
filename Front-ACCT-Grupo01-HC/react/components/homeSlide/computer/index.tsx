import React from 'react'
import { Container, Perspective, Section, Pc, Lady, Gentleman, LadyComputer, Cacto, Cotonete, Pedra, Pontinho, PontinhoAmarelo, Folha } from './styled'
import pc from './images/computer.png'
import lady from './images/lady.png'
import gentleman from './images/gentleman.png'
import ladyComputer from './images/lady_computer.png'
import cacto from './images/cacto.png'
import cotonete from './images/cotonete.png'
import pedra from './images/pedra.png'
import pontinho from './images/pontinho.png'
import pontinhoAmarelo from './images/pontinhoAmarelo.png'
import folha from './images/folha.png'

function ComputerSlide() {
    return (
        <Container>
            <Perspective>
                <Section>
                    <Pc src={pc} alt="pc" />
                    <Lady src={lady} alt="lady" />
                    <Gentleman src={gentleman} alt="gentleman" />
                    <LadyComputer src={ladyComputer} alt="ladyComputer" />
                    <Cacto src={cacto} alt="cacto" />
                    <Cotonete src={cotonete} alt="cotonete" />
                    <Pedra src={pedra} alt="pedra" />
                    <Pontinho src={pontinho} alt="pontinho" />
                    <PontinhoAmarelo src={pontinhoAmarelo} alt="pontinhoAmarelo" />
                    <Folha src={folha} alt="folha" />
                </Section>
            </Perspective>
        </Container>
    )
}

export default ComputerSlide
