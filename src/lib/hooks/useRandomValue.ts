import { useState } from 'react';
import { useInterval } from 'react-use';

export type UseRandomValueProps = {
    interval: number;
    min: number;
    max: number;
};

export function useRandomValue({ interval, min, max }: UseRandomValueProps) {
    const [value, setValue] = useState(0);

    useInterval(() => {
        const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
        setValue(randomValue);
    }, interval);

    return value;
}
