import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useContext } from 'react';
import { FlowsContext, FormContext } from '../contexts';
import { Button } from '@/components/ui/button';

export function PasswordFlow() {
    const form = useContext(FormContext);
    const [flows] = useContext(FlowsContext);

    const loginButtonVisible = flows.length !== 1;

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
            {loginButtonVisible && <Button className="mt-1">Sign In</Button>}
        </div>
    );
}
