import { useBindRooms } from './rooms';
import { useBindVerificationRequest } from './verificationRequest';

export function useBindAtoms() {
    useBindRooms();
    useBindVerificationRequest();
}
