import { MatrixEvent } from 'matrix-js-sdk';

export type MessageBodyProps = {
    data: MatrixEvent;
};

export function MessageBody({ data }: MessageBodyProps) {
    return <div className="text-sm">{data.getContent().body}</div>;
}
