import { useWindowEvent } from '@mantine/hooks';
import { useCallback, useState } from 'react';

export function useModifier(key: string) {
    const [pressed, setPressed] = useState(false);

    useWindowEvent(
        'keydown',
        useCallback(
            (e) => {
                if (e.key === key) setPressed(true);
            },
            [key]
        )
    );

    useWindowEvent(
        'keyup',
        useCallback(
            (e) => {
                if (e.key === key) setPressed(false);
            },
            [key]
        )
    );

    return pressed;
}
