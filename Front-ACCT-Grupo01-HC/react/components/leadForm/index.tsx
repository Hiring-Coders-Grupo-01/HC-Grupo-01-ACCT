import React, { useCallback } from 'react'
import { FormContainer, Label, Paragraph, Input, LabelsGroup, Button } from './styled'

//yup and hook-form (validators)
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

/* // aws-amplify
import Amplify from 'aws-amplify';
import { API } from 'aws-amplify';
import awsExports from "../../src/aws-exports.js";
Amplify.configure(awsExports);

async function addContact() {
    const data = {
        body: {
            name: formState.name,
            email: formState.email,
            telefone: formState.telefone
        }
    };

    console.log(data);
    const apiData = await API.post('formapi', '/contact', data);
    console.log({ apiData });
    alert('Success')
}

const formState = {
    name: '',
    email: '',
    telefone: ''
};

function updateFormState(key: string, value: string) {
    formState[key] = value;
} */

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
        console.log(register)
    }, [],
    )

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Paragraph>Solicite nosso contato:</Paragraph>

            <LabelsGroup>
                <Label>Nome:<span>*</span></Label>
                <Input type="text" placeholder="Nome" />
                {errors.name && <span>{errors.name.message}</span>}
            </LabelsGroup>

            <LabelsGroup >
                <Label>E-mail:<span>*</span></Label>
                <Input type="email" placeholder="email@example.com" />
                {errors.email && <span>{errors.email.message}</span>}
            </LabelsGroup>

            <LabelsGroup>
                <Label>Telefone:<span>*</span></Label>
                <Input type="text" placeholder="991234567891" />
                {errors.telefone && <span>{errors.telefone.message}</span>}
            </LabelsGroup>

            <Button type="submit" >Enviar</Button>
        </FormContainer>
    )
}

export default LeadForm
