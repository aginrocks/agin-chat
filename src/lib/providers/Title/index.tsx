import { useState } from 'react';
import { initialTitle, Title, TitleContext, TitleProviderProps } from './contexts';

export function TitleProvider({ children }: TitleProviderProps) {
    const [title, setTitle] = useState<Title>(initialTitle);

    return <TitleContext.Provider value={[title, setTitle]}>{children}</TitleContext.Provider>;
}

export * from './contexts';
