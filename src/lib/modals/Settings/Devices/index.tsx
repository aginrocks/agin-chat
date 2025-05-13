import { Setting, SettingsGroup } from '@components/settings';
import { IconShield } from '@tabler/icons-react';
import { Device } from './Device';
import { DeviceVerification } from 'matrix-js-sdk';

export function Devices() {
    return (
        <>
            <SettingsGroup title="This Device">
                {/* <Setting
                    title="Verified Device"
                    description="This device is verified and ready for secure messaging."
                    type="custom"
                    icon={{
                        icon: IconShield,
                        color: 'green',
                    }}
                /> */}
                <Device
                    data={{
                        displayName: 'Device',
                        verified: DeviceVerification.Unverified,
                    }}
                />
            </SettingsGroup>
            <SettingsGroup title="Other Devices">
                <Device
                    data={{
                        displayName: 'Device',
                        verified: DeviceVerification.Unverified,
                    }}
                />
                <Device
                    data={{
                        displayName: 'Device',
                        verified: DeviceVerification.Verified,
                    }}
                />
            </SettingsGroup>
        </>
    );
}
