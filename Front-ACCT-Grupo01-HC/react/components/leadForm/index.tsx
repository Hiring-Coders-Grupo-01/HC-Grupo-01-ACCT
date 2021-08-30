import React, { useCallback } from 'react'
import { FormContainer, Label, Paragraph, Input, LabelsGroup, Button } from './styled'

//yup and hook-form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

type Validators = {
    name: string,
    email: string,
    telefone: string
}

let schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email().required('E-Mail é obrigatório'),
    telefone: yup.string().required('Telefone é obrigatório')
});

function LeadForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<Validators>({
        resolver: yupResolver(schema)
    })

    const onSubmit = useCallback((data) => {
        console.log(data)
    }, [],
    )

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Paragraph>Solicite nosso contato:</Paragraph>

            <LabelsGroup>
                <Label>Nome:<span>*</span></Label>
                <Input type="text" placeholder="Nome" required {...register("name")} />
                {errors.name && <span>{errors.name.message}</span>}
            </LabelsGroup>

            <LabelsGroup >
                <Label>E-mail:<span>*</span></Label>
                <Input type="email" placeholder="email@example.com" required {...register("email")} />
                {errors.email && <span>{errors.email.message}</span>}
            </LabelsGroup>

            <LabelsGroup>
                <Label>Telefone:<span>*</span></Label>
                <Input type="text" placeholder="991234567891" required {...register("telefone")} />
                {errors.telefone && <span>{errors.telefone.message}</span>}
            </LabelsGroup>

            <Button type="submit">Enviar</Button>
        </FormContainer>
    )
}

export default LeadForm
