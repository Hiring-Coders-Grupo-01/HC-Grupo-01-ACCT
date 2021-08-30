import React, { useCallback, useState, useEffect } from "react";
import { FormContainer, Label, Paragraph, Input, Button } from "./styled";
import axios from "axios";
import api from "../../services/api";

/* //yup and hook-form (validators)
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; */

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

  /* const [data, setData] = useState({
    name: "",
    email: "",
    telefone: "",
  }); */
  /* const [data, setData] = useState({
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

    api.post("", { user }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  } */

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
  //console.log = console.warn = console.error = () => {};

  function handleSubmit() {
    console.log("odeio muito");
  }

  return (
    <div>
      <Paragraph>Solicite nosso contato:</Paragraph>

      <FormContainer>
        <Label>
          Nome:<span>*</span>
        </Label>
        <Input type="text" placeholder="Nome" id="nome" />

        <Label>
          E-mail:<span>*</span>
        </Label>
        <Input type="email" placeholder="email@example.com" id="email" />

        <Label>
          Telefone:<span>*</span>
        </Label>
        <Input type="text" placeholder="991234567891" id="telefone" />

        <Button type="submit" onClick={handleSubmit}>
          Enviar
        </Button>
      </FormContainer>
    </div>
  );
}

export default LeadFormJs;
