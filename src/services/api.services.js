import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_PROJECTS_API_URL,
    });

    this.api.interceptors.request.use(
      config => {
        // verificar se o request que eu estou fazendo é para rota protegida
        if (config.url.includes('/auth')) {
          return config;
        }
        // se for requet para rota protegida, preciso pegar o token no localStorage e inserir em um header "Authorization"
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config; // após retornar o config ele inicia o request!
      },
    ); // aqui conseguimos colocar qualquer informação dentro do request ANTES dele ser feito para a API!!!

    this.api.interceptors.response.use(
      config => config, // callback em caso do request ser bem sucedido!!!
      error => { // callback em caso do request dar algum erro!!!
        if (error.response.status === 401 && error.response.data.type === 'Auth') {
          localStorage.removeItem('token');
          window.location.href = '/'; // forçando o user a voltar para o login!!!
        }

        return error;
      }
    );
  }

  getProjects = async () => {
    const { data } = await this.api.get('/projects');

    return data; // listagem de projetos

  }

  getProjectDetail = async projectId => {
    const { data } = await this.api.get(`/projects/${projectId}`);

    return data;
  }

  createProject = async projectData => {
    await this.api({
      url: '/projects',
      method: 'POST',
      data: projectData,
    });
  }

  createTask = async taskData => {
    await this.api.post('/tasks', taskData);
  }

  signupUser = async userData => {
    await this.api.post('/auth/signup', userData);
  }

  loginUser = async userData => {
    const { data } = await this.api.post('/auth/login', userData);

    return data.message;
  }

}

export default new ApiService();

