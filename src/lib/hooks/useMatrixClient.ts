import { useContext } from 'react';
import { MatrixClientContext } from '../providers/MatrixClient';

export function useMatrixClient() {
    const context = useContext(MatrixClientContext);
    return context;
}
