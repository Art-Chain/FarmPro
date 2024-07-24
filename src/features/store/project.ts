import { ProjectForm } from '@/features/scheme';
import { atom } from 'jotai';

export const ProjectFormAtom = atom<ProjectForm | null>(null);
