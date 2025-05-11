import { MatrixClient } from 'matrix-js-sdk';
import { createContext } from 'react';

export const MatrixClientContext = createContext<MatrixClient | undefined>(undefined);

export type MatrixClientProviderProps = {
    children?: React.ReactNode;
};
