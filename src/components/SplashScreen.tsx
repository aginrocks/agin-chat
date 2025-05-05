import { Spinner } from './ui/spinner';

export type SplashScreenProps = {
    children?: React.ReactNode;
};

export function SplashScreen({ children }: SplashScreenProps) {
    return (
        <div className="flex w-screen h-screen items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-background z-[99999]">
            <div className="flex flex-col items-center">
                <Spinner className="mb-3" />
                <div className="font-semibold text-lg mb-0.5">Loading</div>
                <div className="text-sm text-muted-foreground">Connecting to matrix.org</div>
            </div>
        </div>
    );
}
