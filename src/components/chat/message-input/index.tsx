import { Button } from '@components/ui/button';
import { IconMoodSmile, IconGif, IconSend2, IconSticker } from '@tabler/icons-react';
import TextareaAutosize from 'react-textarea-autosize';
import { AttachButton } from './attach-button';
import { getHotkeyHandler } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import { useStartTyping } from 'react-use';

export function MessageInput() {
    const ref = useRef<HTMLTextAreaElement>(null);

    useStartTyping(() => ref.current?.focus());
    useEffect(() => ref.current?.focus(), []);

    return (
        <div className="border border-white/5 rounded-lg flex bg-secondary-hover items-start">
            <div className="p-1 pr-0">
                <AttachButton />
            </div>
            <TextareaAutosize
                className="flex-1 focus:outline-none py-3 px-1.5 resize-none text-sm"
                placeholder="Message Room Name"
                onKeyDown={getHotkeyHandler([['Enter', (e) => e.preventDefault()]])}
                maxRows={10}
                ref={ref}
            />
            <div className="flex p-1 pl-0">
                <Button variant="ghost" size="icon" className="dark:hover:bg-secondary-hover-2">
                    <IconGif />
                </Button>
                <Button variant="ghost" size="icon" className="dark:hover:bg-secondary-hover-2">
                    <IconSticker />
                </Button>
                <Button variant="ghost" size="icon" className="dark:hover:bg-secondary-hover-2">
                    <IconMoodSmile />
                </Button>
                <Button variant="ghost" size="icon" className="dark:hover:bg-secondary-hover-2">
                    <IconSend2 />
                </Button>
            </div>
        </div>
    );
}
