import { MatrixEvent } from 'matrix-js-sdk';
import { Redacted } from './redacted';
import { useEffect, useState } from 'react';

export type MessageBodyProps = {
    data: MatrixEvent;
};

export function MessageBody({ data }: MessageBodyProps) {
    const [messageText, setMessageText] = useState<string | null>(null);

    useEffect(() => {
        if (!data) return;

        try {
            if (data.isRedacted()) return;

            const content = data.getContent();
            if (content && content.body) {
                setMessageText(content.body);
            } else {
                console.warn('Message content is empty or undefined', data);
                setMessageText('');
            }
        } catch (e) {
            console.error('Error accessing message content:', e);
            setMessageText('');
        }
    }, [data]);

    if (data.isRedacted()) return <Redacted />;

    if (messageText === null) {
        return <div className="text-sm text-muted-foreground">Loading message...</div>;
    }

    return <div className="text-sm">{messageText}</div>;
}
