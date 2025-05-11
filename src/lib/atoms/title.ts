import { APP_NAME } from '@lib/constants/names';
import { Icon } from '@tabler/icons-react';
import { atom } from 'jotai';

export type Title = {
    title: string;
    /** Icon component or image url */
    icon?: Icon | string;
};

export const initialTitle: Title = {
    title: APP_NAME,
};

export const TitleAtom = atom<Title>(initialTitle);
