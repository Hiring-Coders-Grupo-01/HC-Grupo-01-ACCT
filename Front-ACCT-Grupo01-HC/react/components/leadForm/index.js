import React, { useCallback, useState, useEffect } from "react";
import { FormContainer, Label, Paragraph, Input, LabelsGroup, Button } from "./styled";
import axios from "axios";
import api from "../../services/api";

function useFormik({ initialValues, validate }) {
  const [touched, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    console.log("Alguém mexeu nos values", values);
    validateValues(values);
  }, [values]);

  function handleChange(event) {
    const fieldName = event.target.getAttribute("name");
    const { value } = event.target;
    setValues({
      ...values,
      [fieldName]: value,
    });
  }

  function handleBlur(event) {
    const fieldName = event.target.getAttribute("name");
    console.log(fieldName);
    setTouchedFields({
      ...touched,
      [fieldName]: true,
    });
  }

  function validateValues(values) {
    setErrors(validate(values));
  }

  return {
    values,
    errors,
    touched,
    handleBlur,
    setErrors,
    handleChange,
  };
}

function LeadFormJs() {
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

  const formik = useFormik({
    initialValues: {
      userEmail: "email email.com",
      userPassword: "123456",
    },
    validate: function (values) {
      const errors = {};

      if (!values.userEmail.includes("@")) {
        errors.userEmail = "Please, insert a valid email";
      }

      if (values.userPassword.length < 8) {
        errors.userPassword = "Please, insert a valid password";
      }

      return errors;
    },
  });

  return (
    <div>
      <FormContainer
        onSubmit={(event) => {
          event.preventDefault();
          console.log(formik.values);

          // validateValues(formik.values)

          alert("Olha o console!");
        }}
      >
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
          <Input type="email" placeholder="email@example.com" onChange={handleChange} id="email" onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.touched.userEmail && formik.errors.userEmail && <span className="formField__error">{formik.errors.userEmail}</span>}
        </LabelsGroup>

        <LabelsGroup>
          <Label>
            Telefone:<span>*</span>
          </Label>
          <Input type="text" placeholder="991234567891" onChange={handleChange} id="telefone" onBlur={formik.handleBlur} onChange={formik.handleChange} />
          {formik.touched.userPassword && formik.errors.userPassword && <span className="formField__error">{formik.errors.userPassword}</span>}
        </LabelsGroup>

        <Button type="submit">Enviar</Button>
      </FormContainer>
    </div>
  );
}

export default LeadFormJs;
