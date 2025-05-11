import { useBindDirects } from './directs';
import { useBindRooms } from './rooms';
import { useBindVerificationRequest } from './verificationRequest';

export function useBindAtoms() {
    useBindRooms();
    useBindDirects();
    useBindVerificationRequest();
}
