import React, { useCallback, useState, useEffect } from "react";
import { FormContainer, Label, Paragraph, Input, LabelsGroup, Button } from "./styled";
import axios from "axios";

//yup and hook-form (validators)
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* // aws-amplify
import Amplify from "aws-amplify";
import { API } from "aws-amplify";
import awsExports from "../../src/aws-exports.js";
Amplify.configure(awsExports);

async function addContact() {
  const data = {
    body: {
      name: formState.name,
      email: formState.email,
      telefone: formState.telefone,
    },
  };

  console.log(data);
  const apiData = await API.post("formapi", "/contact", data);
  console.log({ apiData });
  alert("Success");
}

const formState = { name: "", email: "", telefone: "" };

function updateFormState(key, value) {
  formState[key] = value;
}

let schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email().required("E-Mail é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório"),
}); */

function LeadFormJs() {
  /* const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm <
  Validators >
  {
    resolver: yupResolver(schema),
  };

  const onSubmit = useCallback((data) => {
    console.log(data);
    console.log(register);
  }, []); */

  const url = "https://1d0u5setve.execute-api.sa-east-1.amazonaws.com/leads";
  /* const [data, setData] = useState({
    name: "",
    email: "",
    telefone: "",
  }); */
  const [data, setData] = useState({
    name: "",
    email: "",
    telefone: "",
  });

  function handleChange(event) {
    setData({ nome: event.target.value, email: event.target.value, telefone: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
    };

    axios.post(url, { user }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  }

  /* function onSubmit(e) {
    e.preventDefault();
    axios
      .post(url, {
        nome: data.nome,
        email: data.email,
        telefone: parseInt(data.telefone),
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  function handleSubmit(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  } */

  return (
    <div>
      <FormContainer onSubmit={handleSubmit}>
        <Paragraph>Solicite nosso contato:</Paragraph>

        <LabelsGroup>
          <Label>
            Nome:<span>*</span>
          </Label>
          <Input type="text" placeholder="Nome" onChange={handleChange} id="nome" value={data.nome} />
        </LabelsGroup>

        <LabelsGroup>
          <Label>
            E-mail:<span>*</span>
          </Label>
          <Input type="email" placeholder="email@example.com" onChange={handleChange} id="email" value={data.email} />
        </LabelsGroup>

        <LabelsGroup>
          <Label>
            Telefone:<span>*</span>
          </Label>
          <Input type="text" placeholder="991234567891" onChange={handleChange} id="telefone" value={data.telefone} />
        </LabelsGroup>

        <Button type="submit">Enviar</Button>
      </FormContainer>
    </div>
  );
}

export default LeadFormJs;
