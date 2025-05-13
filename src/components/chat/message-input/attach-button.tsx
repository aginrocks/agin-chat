import { Button } from '@components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { IconChartBar, IconCirclePlus, IconFilePlus, IconSlash } from '@tabler/icons-react';

export function AttachButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost" size="icon" className="dark:hover:bg-secondary-hover-2">
                    <IconCirclePlus />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8}>
                <DropdownMenuItem>
                    <IconFilePlus />
                    Upload a File
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <IconChartBar />
                    Create Poll
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <IconSlash />
                    Use Commands
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
