import { atom } from 'jotai';

export const SidebarOpenAtom = atom(false);

export type SidebarTab = 'members' | 'info';
export const SidebarTabAtom = atom<SidebarTab>('info');
