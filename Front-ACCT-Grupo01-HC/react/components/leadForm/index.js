import React, { useCallback, useState, useEffect } from "react";
import { FormContainer, Label, TitleForm, Paragraph, Input, ButtonInput } from "./styled";
import api from "../../services/api";

function LeadFormJs() {
  const [data, setData] = useState({
    name: "",
    email: "",
    telefone: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    api
      .post("leads", {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
      })
      .then((response) => {
        console.log(response.data);
        alert("Cadastro realizado com sucesso!");
      })
      .catch((error) => {
        console.log(error);

        switch (error.response.status) {
          case 400:
            alert("Campos inválidos, preencha todos os campos");
            break;
          case 409:
            alert("E-mail já cadastrado");
            break;
          default:
            alert("Falha no cadastro, insira campos validos :(");
        }
      });
  }

  function handleChange(event) {
    const newdata = { ...data };
    newdata[event.target.id] = event.target.value;
    setData(newdata);
  }

  return (
    <div>
      <TitleForm>
        <Paragraph>
          Cadastre-se e<br />
          <span>ganhe 10% off</span>
          <br />
          no seu primeiro curso!
        </Paragraph>
      </TitleForm>

      <FormContainer>
        <Label>
          Nome:<span>*</span>
        </Label>
        <Input type="text" placeholder="Nome" id="nome" value={data.nome} onChange={(event) => handleChange(event)} />

        <Label>
          E-mail:<span>*</span>
        </Label>
        <Input type="email" placeholder="email@example.com" id="email" value={data.email} onChange={(event) => handleChange(event)} />

        <Label>
          Telefone:<span>*</span>
        </Label>
        <Input type="text" placeholder="991234567891" id="telefone" value={data.telefone} onChange={(event) => handleChange(event)} />

        <ButtonInput type="submit" onClick={handleSubmit}></ButtonInput>
      </FormContainer>
    </div>
  );
}

export default LeadFormJs;
