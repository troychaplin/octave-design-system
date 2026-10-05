import type { ProjectCardProps } from '../components/ProjectCard/ProjectCard';
import projects from './ProjectData.json';

// JSON imports type `icon` as a plain string, so the data is typed against the props here, once
export const ProjectData = projects as ProjectCardProps[];
