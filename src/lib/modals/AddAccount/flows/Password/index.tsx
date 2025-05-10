import { Input } from '@components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useContext } from 'react';
import { FormContext } from '../../contexts';
import { Button } from '@components/ui/button';
import { usePasswordFlow } from './flow';

export function PasswordFlow() {
    const form = useContext(FormContext);
    const flow = usePasswordFlow();

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
                <Label className="text-sm">Username</Label>
                <Input {...form?.getInputProps('username')} />
            </div>
            <div className="flex flex-col gap-1.5">
                <Label className="text-sm">Password</Label>
                <Input type="password" {...form?.getInputProps('password')} />
            </div>
            <Button
                className="mt-1"
                onClick={() =>
                    flow.login({
                        baseUrl: form?.values.homeserver_base_url ?? '',
                        username: form?.values.username ?? '',
                        password: form?.values.password ?? '',
                    })
                }
            >
                Sign In
            </Button>
        </div>
    );
}
