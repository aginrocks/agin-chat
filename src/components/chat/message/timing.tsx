import { MatrixEvent } from 'matrix-js-sdk';
import moment from 'moment';

export type MessageTimingProps = {
    data: MatrixEvent;
    forceHoursOnly?: boolean;
};

export function MessageTiming({ data, forceHoursOnly }: MessageTimingProps) {
    const date = data.getDate();
    const now = moment();
    const msgTime = moment(date);

    let displayTime: string;

    if (msgTime.isSame(now, 'day') || forceHoursOnly) {
        displayTime = msgTime.format('HH:mm');
    } else if (msgTime.isSame(now.clone().subtract(1, 'day'), 'day')) {
        displayTime = `Yesterday at ${msgTime.format('HH:mm')}`;
    } else {
        displayTime = msgTime.format('DD/MM/YYYY[,] HH:mm');
    }

    return <div className="text-[10px] mt-[1px] text-muted-foreground">{displayTime}</div>;
}
