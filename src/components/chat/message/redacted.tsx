import { IconTrash } from '@tabler/icons-react';

export function Redacted() {
    return (
        <div className="flex gap-1 items-center text-muted-foreground">
            <IconTrash className="size-3" />
            <div className="text-sm">Message deleted</div>
        </div>
    );
}
