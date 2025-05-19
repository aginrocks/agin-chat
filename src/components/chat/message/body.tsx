import { MatrixEvent } from 'matrix-js-sdk';
import { Redacted } from './redacted';

export type MessageBodyProps = {
    data: MatrixEvent;
};

export function MessageBody({ data }: MessageBodyProps) {
    if (data.isRedacted()) return <Redacted />;
    return <div className="text-sm">{data.getContent().body}</div>;
}
