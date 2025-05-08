import { createContext, Dispatch, SetStateAction } from 'react';
import { Modal } from './types';

export type ModalsContextType = [Modal<any>[], Dispatch<SetStateAction<Modal<any>[]>>];

const initial: ModalsContextType = [[], () => {}];

export const ModalsContext = createContext<ModalsContextType>(initial);
