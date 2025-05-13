import { Setting, SettingsGroup } from '@components/settings';
import { Button } from '@components/ui/button';
import { IconKey } from '@tabler/icons-react';

export function Encryption() {
    return (
        <>
            <SettingsGroup title="Encryption">
                <Setting
                    title="Recovery"
                    description="Recover your cryptographic identity and message history with a recovery key if you've lost all your existing devices."
                    type="custom"
                    rightSection={
                        <Button variant="outline">
                            <IconKey />
                            Change recovery key
                        </Button>
                    }
                />
            </SettingsGroup>
        </>
    );
}
