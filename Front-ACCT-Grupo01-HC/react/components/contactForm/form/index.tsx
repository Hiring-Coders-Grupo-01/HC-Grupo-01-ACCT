import React from 'react'
import { FormContainer, Grid2Labels, Label, Paragraph, Input, LastInput, LabelsGroup, Button } from './styled'

function FormContactSeparated() {
    return (
        <FormContainer>
            <Paragraph>Solicite nosso contato:</Paragraph>
            <Grid2Labels>
                <LabelsGroup>
                    <Label>Nome:<span>*</span></Label>
                    <Input />
                </LabelsGroup>
                <LabelsGroup style={{ marginLeft: "10px" }}>
                    <Label>E-mail:<span>*</span></Label>
                    <Input />
                </LabelsGroup>
            </Grid2Labels>

            <Grid2Labels>
                <LabelsGroup>
                    <Label>Telefone:<span>*</span></Label>
                    <Input />
                </LabelsGroup>
                <LabelsGroup style={{ marginLeft: "10px" }}>
                    <Label>País:<span>*</span></Label>
                    <Input />
                </LabelsGroup>
            </Grid2Labels>

            <Grid2Labels>
                <LabelsGroup>
                    <Label>Empresa:<span>*</span></Label>
                    <Input />
                </LabelsGroup>
                <LabelsGroup style={{ marginLeft: "10px" }}>
                    <Label>Cargo:</Label>
                    <Input />
                </LabelsGroup>
            </Grid2Labels>

            <Grid2Labels>
                <LabelsGroup>
                    <Label>Número de colaboradores:</Label>
                    <Input />
                </LabelsGroup>
                <LabelsGroup style={{ marginLeft: "10px" }}>
                    <Label>URL do site:</Label>
                    <Input />
                </LabelsGroup>
            </Grid2Labels>

            <LabelsGroup>
                <Label>Como podemos ajudar?:<span>*</span></Label>
                <LastInput />
            </LabelsGroup>

            <Button type="submit">Enviar</Button>
        </FormContainer>
    )
}

export default FormContactSeparated
