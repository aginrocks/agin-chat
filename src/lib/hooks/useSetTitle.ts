import { Title } from '@lib/providers/Title';
import { useTitle } from './useTitle';
import { useEffect } from 'react';

export function useSetTitle(title: Title) {
    const [, setTitle] = useTitle();

    useEffect(() => {
        setTitle(title);
    }, []);
}
