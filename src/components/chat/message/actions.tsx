import { Button } from '@components/ui/button';
import {
    IconCopy,
    IconCornerUpLeft,
    IconCornerUpRight,
    IconDots,
    IconMoodSmile,
    IconPencil,
    IconPin,
    IconTrash,
} from '@tabler/icons-react';
import { MessageAction } from './action';
import { useModifier } from '@lib/hooks';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useAtom } from 'jotai';
import { DropdownOpenAtom } from '.';

export function MessageActions() {
    const moreActionsVisible = useModifier('Shift');
    const [dropdownOpen, setDropdownOpen] = useAtom(DropdownOpenAtom);

    return (
        <div className="p-0.5 rounded-lg border border-black/5 dark:border-white/5 bg-secondary-hover">
            {moreActionsVisible && (
                <>
                    <MessageAction label="Copy Text">
                        <IconCopy />
                    </MessageAction>
                    <MessageAction label="Pin Message">
                        <IconPin />
                    </MessageAction>
                </>
            )}
            <MessageAction label="Add Reaction">
                <IconMoodSmile />
            </MessageAction>
            <MessageAction label="Edit">
                <IconPencil />
            </MessageAction>
            <MessageAction label="Reply">
                <IconCornerUpLeft />
            </MessageAction>
            <MessageAction label="Forward">
                <IconCornerUpRight />
            </MessageAction>
            {moreActionsVisible ? (
                <MessageAction label="Delete" className="text-red-400 hover:text-red-500">
                    <IconTrash />
                </MessageAction>
            ) : (
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenuTrigger>
                        <MessageAction label="More">
                            <IconDots />
                        </MessageAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end" sideOffset={6}>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
}
