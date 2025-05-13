import { Button } from '@components/ui/button';
import { IconCirclePlus, IconMoodSmile, IconGif, IconSend2 } from '@tabler/icons-react';
import TextareaAutosize from 'react-textarea-autosize';

export function MessageInput() {
    return (
        <div className="border border-white/5 rounded-lg p-1 flex">
            <Button variant="ghost" size="icon">
                <IconCirclePlus />
            </Button>
            <TextareaAutosize
                className="flex-1 focus:outline-none py-2 px-1.5 resize-none text-sm"
                placeholder="Message Room Name"
            />
            <Button variant="ghost" size="icon">
                <IconGif />
            </Button>
            <Button variant="ghost" size="icon">
                <IconMoodSmile />
            </Button>
            <Button variant="ghost" size="icon">
                <IconSend2 />
            </Button>
        </div>
    );
}
