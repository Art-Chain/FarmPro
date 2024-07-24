import { Project } from '@/features/scheme';
import { atom } from 'jotai';

export const ProjectAtom = atom<Project | null>(null);
