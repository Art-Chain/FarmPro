import { Project, ProjectForm, ProjectSchema } from '@/features/scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createProject = async (form: ProjectForm) => {
  const projects = await ProjectSchema.array().parseAsync(JSON.parse(await AsyncStorage.getItem('projects') ?? '[]'));
  const project: Project = {
    id: Date.now(),
    ...form,
  };

  projects.push(project);
  await AsyncStorage.setItem('projects', JSON.stringify(projects));
  return project;
};

export const fetchProjects = async () => {
  return ProjectSchema.array().parseAsync(JSON.parse(await AsyncStorage.getItem('projects') ?? '[]'));
};

export const fetchProject = async (id: number) => {
  const projects = await fetchProjects();
  return projects.find((project) => project.id === id) ?? null;
};

export const updateProject = async (id: number, form: Partial<ProjectForm>) => {
  const projects = await fetchProjects();
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex === -1) return;

  const newProject = {
    ...projects[projectIndex],
    ...form,
  };
  projects[projectIndex] = newProject;
  await AsyncStorage.setItem('projects', JSON.stringify(projects));
  return newProject;
};

export const deleteProject = async (id: number) => {
  const projects = await fetchProjects();
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex === -1) return;

  projects.splice(projectIndex, 1);
  await AsyncStorage.setItem('projects', JSON.stringify(projects));
};
