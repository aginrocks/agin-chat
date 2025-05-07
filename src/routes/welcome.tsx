import { SplashSection } from '@/components/SplashScreen';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/welcome')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <SplashSection>
            <div className="font-semibold text-2xl mb-2">Agin Chat</div>
            <div className="text-sm text-muted-foreground">Connecting to matrix.org</div>
        </SplashSection>
    );
}
