import { Setting, SettingProps } from '@components/settings';
import { Button } from '@components/ui/button';
import { IconShield, IconShieldX, IconTrash } from '@tabler/icons-react';
import { DeviceVerification, Device as TDevice } from 'matrix-js-sdk';
import { VerificationAlert } from './VerificationAlert';

export type DeviceProps = {
    data: TDevice;
    position: SettingProps['position'];
};

export function Device({ data, position }: DeviceProps) {
    return (
        <Setting
            icon={{
                icon: data.verified === DeviceVerification.Verified ? IconShield : IconShieldX,
                color: data.verified === DeviceVerification.Verified ? 'green' : 'red',
                size: 'md',
            }}
            title={data.displayName ?? 'Unknown Device'}
            description={`${data.verified === DeviceVerification.Verified ? 'Verified' : 'Unverified'} • Last activity: Never`}
            type="custom"
            rightSection={
                <Button variant="ghost" size="icon">
                    <IconTrash />
                </Button>
            }
            position={position}
        >
            {data.verified === DeviceVerification.Unverified && <VerificationAlert />}
        </Setting>
    );
}
