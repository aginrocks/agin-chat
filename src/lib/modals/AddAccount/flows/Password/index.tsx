import { Input } from '@components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useCallback, useContext } from 'react';
import { FormContext } from '../../contexts';
import { Button } from '@components/ui/button';
import { usePasswordFlow } from './flow';
import { getHotkeyHandler } from '@mantine/hooks';

export function PasswordFlow() {
    const form = useContext(FormContext);
    const flow = usePasswordFlow();

    const onLogin = useCallback(
        async () =>
            await flow.login({
                baseUrl: form?.values.homeserver_base_url ?? '',
                username: form?.values.username ?? '',
                password: form?.values.password ?? '',
            }),
        [flow]
    );

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
                <Label className="text-sm">Username</Label>
                <Input
                    onKeyDown={getHotkeyHandler([['Enter', onLogin]])}
                    {...form?.getInputProps('username')}
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <Label className="text-sm">Password</Label>
                <Input
                    type="password"
                    onKeyDown={getHotkeyHandler([['Enter', onLogin]])}
                    {...form?.getInputProps('password')}
                />
            </div>
            <Button className="mt-1" onClick={() => onLogin()}>
                Sign In
            </Button>
        </div>
    );
}
