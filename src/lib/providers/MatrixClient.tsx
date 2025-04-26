import { createContext } from 'react';
import { MatrixClient } from 'matrix-js-sdk';

export const MatrixClientContext = createContext<MatrixClient | null>(null);
