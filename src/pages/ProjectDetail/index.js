import React from 'react';

import apiService from '../../services/api.services';

import GeneralTemplate from '../../components/templates/GeneralTemplate';
import CreateTaskModalForm from '../../components/organisms/CreateTaskModalForm';

const ProjectDetail = props => {
  const [project, setProject] = React.useState({});

  const getProjectDetail = async () => {
    try {
      const project = await apiService.getProjectDetail(props.match.params.id);
      
      setProject(project);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getProjectDetail();
  }, []);

  const createNewTask = async taskInfo => {
    try {
      taskInfo.project = props.match.params.id;

      await apiService.createTask(taskInfo);
      await getProjectDetail();
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <GeneralTemplate>
      <h1>Nome do Projeto: {project.name}</h1>
      <p>Descrição: {project.description}</p>

      <CreateTaskModalForm createNewTask={createNewTask} />

      <p>Tasks:</p>
      <ul>
        {project.tasks && project.tasks.map(task => (
          <li key={task._id}>{task.name}</li>
        ))}
      </ul>
    </GeneralTemplate>
  );
};

export default ProjectDetail;
