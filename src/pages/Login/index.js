import React, { useState } from 'react';

import Toast from 'react-bootstrap/Toast'
import GeneralTemplate from '../../components/templates/GeneralTemplate';
import FormLogin from '../../components/organisms/LoginForm';

import apiService from '../../services/api.services';

const Login = props => {
  const [show, setShow] = useState(false);

  const handleLoginUser = async values => {
    try {
      // chama a API na rota /login pra tentar pegar o token
      const token = await apiService.loginUser(values);
      // guardar o token recebido da API
      localStorage.setItem('token', token);
      // redirecionar o usuário para a página de projetos /projects
      props.history.push('/projects');
    } catch (error) {
      if (error.response.data.message === 'Invalid credentials') {
        setShow(true);
      }
    }
  }

  return (
    <GeneralTemplate>
      <FormLogin handleLoginUser={handleLoginUser} />

      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Erro do tentar fazer login na aplicação</strong>
        </Toast.Header>
        <Toast.Body>Credenciais inválidas. Por favor verifique e tente novamente</Toast.Body>
      </Toast>
    </GeneralTemplate>
  );
};

export default Login;
