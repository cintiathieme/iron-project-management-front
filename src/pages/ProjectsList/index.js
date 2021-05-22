import React, { useState, useEffect } from 'react';

import apiService from '../../services/api.services';

import GeneralTemplate from '../../components/templates/GeneralTemplate';
import ProjectsTable from '../../components/organisms/ProjectsTable';
import CreateProjectForm from '../../components/organisms/CreateProjectForm';

const ProjectsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]); // inicia com o array declarado acima!!

  const getProjects = async () => {
    try {
      const projects = await apiService.getProjects();
  
      setProjects(projects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []); // Como um componentDidMount!! (chama uma vez somente após o compoenente ser MONTADO)

  const createProject = async values => {
    try {
      setIsLoading(true); // coloco a pagina no estado carregando

      await apiService.createProject(values); // faço a chamada para a API criar um novo projeto
      await getProjects(); // faço outra chamada para pegar novamente todos os projetos!

      setIsLoading(false); // reverto o o estado carregando
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GeneralTemplate>
      <CreateProjectForm handleCreateProject={createProject} isLoading={isLoading} />
      <ProjectsTable projects={projects}/>
    </GeneralTemplate>
  );
};

export default ProjectsList;
