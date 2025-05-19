import {
    IconCircleNumber1,
    IconCodeCircle,
    IconCopy,
    IconCornerUpLeft,
    IconCornerUpRight,
    IconDots,
    IconLink,
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

export type MessageActionsProps = {
    canEdit?: boolean;
    canDelete?: boolean;
};

export function MessageActions({
    canEdit: isEditable,
    canDelete: isDeletable,
}: MessageActionsProps) {
    const moreActionsVisible = useModifier('Shift');
    const [dropdownOpen, setDropdownOpen] = useAtom(DropdownOpenAtom);

    return (
        <div className="p-0.5 rounded-lg border border-light-border bg-secondary-hover">
            {moreActionsVisible && (
                <>
                    <MessageAction label="Copy Text">
                        <IconCopy />
                    </MessageAction>
                    <MessageAction label="Copy Link">
                        <IconLink />
                    </MessageAction>
                    <MessageAction label="Pin Message">
                        <IconPin />
                    </MessageAction>
                </>
            )}
            <MessageAction label="Add Reaction">
                <IconMoodSmile />
            </MessageAction>
            {isEditable && (
                <MessageAction label="Edit">
                    <IconPencil />
                </MessageAction>
            )}
            <MessageAction label="Reply">
                <IconCornerUpLeft />
            </MessageAction>
            <MessageAction label="Forward">
                <IconCornerUpRight />
            </MessageAction>
            {moreActionsVisible && isDeletable ? (
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
                    <DropdownMenuContent
                        side="bottom"
                        align="end"
                        sideOffset={6}
                        // className="border-light-border"
                    >
                        {isEditable && (
                            <DropdownMenuItem>
                                <IconPencil />
                                Edit Message
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                            <IconCornerUpLeft />
                            Reply
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <IconCornerUpRight />
                            Forward
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="border-light-border mx-1" />
                        <DropdownMenuItem>
                            <IconCopy />
                            Copy Text
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <IconLink />
                            Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <IconPin />
                            Pin Message
                        </DropdownMenuItem>
                        {isDeletable && (
                            <>
                                <DropdownMenuSeparator className="border-light-border mx-1" />
                                <DropdownMenuItem variant="destructive">
                                    <IconTrash />
                                    Delete Message
                                </DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuSeparator className="border-light-border mx-1" />
                        <DropdownMenuItem>
                            <IconCodeCircle />
                            View Source
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <IconCircleNumber1 />
                            Copy ID
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
}
