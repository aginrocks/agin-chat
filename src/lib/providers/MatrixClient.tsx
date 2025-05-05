import { createContext, useState } from 'react';
import { MatrixClient } from 'matrix-js-sdk';
import { SplashScreen } from '@/components/SplashScreen';

export const MatrixClientContext = createContext<MatrixClient | null>(null);

export type MatrixClientProviderProps = {
    children?: React.ReactNode;
};

export function MatrixClientProvider({ children }: MatrixClientProviderProps) {
    const [loading, setLoading] = useState(true);

    return (
        <MatrixClientContext.Provider value={null}>
            <SplashScreen></SplashScreen>
        </MatrixClientContext.Provider>
    );
}
