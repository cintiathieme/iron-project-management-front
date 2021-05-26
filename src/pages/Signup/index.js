import React from 'react';

import apiService from '../../services/api.services';

import GeneralTemplate from '../../components/templates/GeneralTemplate';
import SignupForm from '../../components/organisms/SignupForm';

const Signup = props => {
  console.log(props)
  const handleCreateUser = async values => {
    try {
      console.log(values);
      // chamar a nossa API via axios (talvez criar um novo metodo dentro do nosso apiService)
      await apiService.signupUser(values);
      // se criar com sucesso, podemos redirecionar o usuario para a página de login!
      props.history.push('/');
    } catch (error) {
      // se algo der errado na API, podemos tentar capturar o erro pelo catch e tentar mostar ess erro para o usuário! (bonus)
      console.log(error);
    }
  }

  return (
    <GeneralTemplate>
      <SignupForm handleCreateUser={handleCreateUser} />
    </GeneralTemplate>
  );
};

export default Signup;
