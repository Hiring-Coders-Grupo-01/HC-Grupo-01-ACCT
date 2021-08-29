import React from 'react'
import { FormContainer, Label, Paragraph, Input, LabelsGroup, Button } from './styled'

function LeadForm() {
    return (
        <FormContainer>
            <Paragraph>Solicite nosso contato:</Paragraph>

            <LabelsGroup>
                <Label>Nome:<span>*</span></Label>
                <Input />
            </LabelsGroup>

            <LabelsGroup >
                <Label>E-mail:<span>*</span></Label>
                <Input />
            </LabelsGroup>

            <LabelsGroup>
                <Label>Telefone:<span>*</span></Label>
                <Input />
            </LabelsGroup>

            <Button type="submit">Enviar</Button>
        </FormContainer>
    )
}

export default LeadForm
