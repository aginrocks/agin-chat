import { ShowSasCallbacks } from 'matrix-js-sdk/lib/crypto-api';

export type CompareEmojiViewProps = {
    sasData: ShowSasCallbacks;
};

export function CompareEmojiView({ sasData }: CompareEmojiViewProps) {
    return (
        <div className="flex items-center justify-center w-full p-6 rounded-sm bg-light-background flex-wrap gap-y-8">
            {sasData.sas.emoji?.map(([emoji, name], i) => (
                <Emoji emoji={emoji} name={name} key={i} />
            ))}
        </div>
    );
}

export type EmojiProps = {
    emoji: string;
    name: string;
};

export function Emoji({ emoji, name }: EmojiProps) {
    return (
        <div className="flex items-center justify-center flex-col gap-3 w-20">
            <div className="text-4xl">{emoji}</div>
            <div className="text-sm font-semibold text-muted-foreground">{name}</div>
        </div>
    );
}
