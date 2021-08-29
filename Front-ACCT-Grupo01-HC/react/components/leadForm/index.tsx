import React from 'react'
import { FormContainer, Label, Paragraph, Input, LabelsGroup, Button } from './styled'

function LeadForm() {
    return (
        <FormContainer>
            <Paragraph>Solicite nosso contato:</Paragraph>

            <LabelsGroup>
                <Label>Nome:<span>*</span></Label>
                <Input type="name" placeholder="Nome" required />
            </LabelsGroup>

            <LabelsGroup >
                <Label>E-mail:<span>*</span></Label>
                <Input type="email" placeholder="email@example.com" required />
            </LabelsGroup>

            <LabelsGroup>
                <Label>Telefone:<span>*</span></Label>
                <Input type="telefone" placeholder="991234567891" required />
            </LabelsGroup>

            <Button type="submit">Enviar</Button>
        </FormContainer>
    )
}

export default LeadForm
