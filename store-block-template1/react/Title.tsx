import React from 'react'
import Amplify from 'aws-amplify';
import { API } from 'aws-amplify';
import awsExports from "../src/aws-exports.js";
import { Container, Button, Form } from 'react-bootstrap';


interface TitleProps {}

const Title: StorefrontFunctionComponent<TitleProps> = ({}) => {

  Amplify.configure(awsExports);

  async function addContact() {
    const data = {
      body: {
        name: formState.name,
        email: formState.email,
        message: formState.message
      }
    };
  
    console.log(data);
    const apiData = await API.post('formapi', '/contact', data);
    console.log({ apiData });
    alert('Success')
  }
  
  const formState = { name: '', email: '', message: '' };
  
  function updateFormState(key: string, value: string) {
    formState[key] = value;
  }

  return (
  <Container>
    <div>
      
      
     
        <Form>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control placeholder="Nome" onChange={e => updateFormState('name', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Email" onChange={e => updateFormState('email', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Mensagem</Form.Label>
            <Form.Control placeholder="Mensagem" onChange={e => updateFormState('message', e.target.value)} />
          </Form.Group>
          <Button onClick={addContact}>Login</Button>
        </Form>
      </div>
    </Container>
    );
}

Title.schema = {
  title: 'editor.title.title',
  description: 'editor.title.description',
  type: 'object',
  properties: {},
}

export default Title