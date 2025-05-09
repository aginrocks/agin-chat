import { Separator } from './separator';

export function OrSeparator() {
    return (
        <div className="flex items-center justify-center gap-2">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground">or</span>
            <Separator className="flex-1" />
        </div>
    );
}
