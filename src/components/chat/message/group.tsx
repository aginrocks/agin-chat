import { Message, MessageProps } from '.';

export type MessageGroupProps = {
    data: MessageProps[];
};

export function MessageGroup({ data }: MessageGroupProps) {
    return (
        <div className="">
            {data.map((m, i) => (
                <Message key={m.data.getId()} data={m.data} isFirst={i === 0} />
            ))}
        </div>
    );
}
