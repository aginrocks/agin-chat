import { Title, TitleAtom } from '@lib/atoms';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';

export function useSetTitle(title: Title) {
    const setTitle = useSetAtom(TitleAtom);

    useEffect(() => {
        setTitle(title);
    }, []);
}
