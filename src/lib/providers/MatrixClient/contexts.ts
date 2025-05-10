import { MatrixClient } from 'matrix-js-sdk';
import { createContext } from 'react';

export const MatrixClientContext = createContext<MatrixClient | null>(null);

export type MatrixClientProviderProps = {
    children?: React.ReactNode;
};
