import React from "react";
import LeadFormJs from "../../components/leadForm/index";
import { Container, FormContent } from "./styled";

function ContactForm() {
  return (
    <Container>
      <div></div>
      <FormContent>
        <LeadFormJs />
      </FormContent>
    </Container>
  );
}

export default ContactForm;
