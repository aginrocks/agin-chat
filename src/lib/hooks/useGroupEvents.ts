import { useMemo } from 'react';
import { MatrixEvent } from 'matrix-js-sdk';
import { MessageProps } from '@components/chat/message';

/**
 * Time threshold in milliseconds to group messages from the same user
 * Messages sent within this timeframe will be considered part of the same group
 */
const TIME_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Hook to group Matrix events similar to how Discord groups messages
 * Messages are grouped when:
 * 1. They are sent by the same user
 * 2. They are sent within TIME_THRESHOLD_MS of each other
 *
 * @param events Array of MatrixEvent objects
 * @returns Array of message groups, where each group contains messages from the same user
 */
export function useGroupEvents(events: MatrixEvent[]): MessageProps[][] {
    return useMemo(() => {
        if (!events.length) return [];

        // Sort events by timestamp
        const sortedEvents = [...events].sort((a, b) => a.getTs() - b.getTs());

        const groups: MessageProps[][] = [];
        let currentGroup: MessageProps[] = [];
        let currentSender: string | undefined = undefined;
        let lastTimestamp = 0;

        sortedEvents.forEach((event) => {
            const sender = event.getSender();
            const timestamp = event.getTs();

            // Start a new group if:
            // 1. This is the first message
            // 2. Sender is different from previous message
            // 3. Time difference exceeds threshold
            if (
                currentGroup.length === 0 ||
                sender !== currentSender ||
                timestamp - lastTimestamp > TIME_THRESHOLD_MS
            ) {
                // Save the current group if it's not empty
                if (currentGroup.length > 0) {
                    groups.push([...currentGroup]);
                }

                // Start a new group
                currentGroup = [{ data: event }];
                currentSender = sender;
            } else {
                // Add to current group
                currentGroup.push({ data: event });
            }

            lastTimestamp = timestamp;
        });

        // Add the last group if it's not empty
        if (currentGroup.length > 0) {
            groups.push(currentGroup);
        }

        return groups;
    }, [events]);
}
