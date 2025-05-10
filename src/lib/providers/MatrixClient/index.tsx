import { useState } from 'react';
import { MatrixClientContext, MatrixClientProviderProps } from './contexts';
import { SplashScreen } from '@components/SplashScreen';

export function MatrixClientProvider({ children }: MatrixClientProviderProps) {
    const [loading, setLoading] = useState(true);

    return (
        <MatrixClientContext.Provider value={null}>
            {/* <SplashScreen></SplashScreen> */}
            {children}
        </MatrixClientContext.Provider>
    );
}

export * from './contexts';
