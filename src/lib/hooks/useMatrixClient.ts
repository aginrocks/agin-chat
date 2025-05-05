import { useContext } from 'react';
import { MatrixClientContext } from '../providers/MatrixClient';

export function useMatrixClient() {
    const context = useContext(MatrixClientContext);
    if (!context) {
        throw new Error('useMatrixClient must be used within a MatrixClientProvider');
    }
    return context;
}
