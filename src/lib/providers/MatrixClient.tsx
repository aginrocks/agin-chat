import { createContext } from 'react';
import { MatrixClient } from 'matrix-js-sdk';

const MatrixClientContext = createContext<MatrixClient | null>(null);