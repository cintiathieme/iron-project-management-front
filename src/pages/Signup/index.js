import React from 'react';

import GeneralTemplate from '../../components/templates/GeneralTemplate';
import SignupForm from '../../components/organisms/SignupForm';

const Signup = props => {

  const handleCreateUser = async values => {
    console.log(values)
    // chamar a nossa API via axios (talvez criar um novo metodo dentro do nosso apiService)
    // se criar com sucesso, podemos redirecionar o usuario para a página de login!
    // se algo der errado na API, podemos tentar capturar o erro pelo catch e tentar mostar ess erro para o usuário! (bonus)
  }

  return (
    <GeneralTemplate>
      <SignupForm handleCreateUser={handleCreateUser} />
    </GeneralTemplate>
  );
};

export default Signup;
