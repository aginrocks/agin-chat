import { useBindAtoms } from '@lib/atoms';
import { ReactNode } from '@tanstack/react-router';

export type AtomsBindProviderProps = {
    children?: ReactNode;
};

export function AtomsBindProvider({ children }: AtomsBindProviderProps) {
    useBindAtoms();

    return <>{children}</>;
}
