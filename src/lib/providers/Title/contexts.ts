import { APP_NAME } from '@lib/constants/names';
import { Icon } from '@tabler/icons-react';
import { SetStateAction } from 'jotai';
import { createContext, Dispatch } from 'react';

export type Title = {
    title: string;
    /** Icon component or image url */
    icon?: Icon | string;
};

export type TitleContextType = [Title, Dispatch<SetStateAction<Title>>];
export const initialTitle: Title = {
    title: APP_NAME,
};
export const initialTitleContext: TitleContextType = [initialTitle, () => {}];

export const TitleContext = createContext<TitleContextType>(initialTitleContext);

export type TitleProviderProps = {
    children?: React.ReactNode;
};
