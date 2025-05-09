import { useContext } from 'react';
import { AddAccountContext, StageContext } from './contexts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { IconArrowRight } from '@tabler/icons-react';

export function PasswordLogin() {
    const form = useContext(AddAccountContext);
    const [stage, setStage] = useContext(StageContext);

    return (
        <>
            <div className="flex flex-col gap-1.5">
                <Label className="text-sm">Username</Label>
                <Input {...form?.getInputProps('username')} />
            </div>
            <div className="flex flex-col gap-1.5">
                <Label className="text-sm">Password</Label>
                <Input type="password" {...form?.getInputProps('password')} />
            </div>
            <div className="flex justify-end gap-2">
                <Button
                    variant="ghost"
                    className="text-muted-foreground"
                    onClick={() => setStage('select_homeserver')}
                >
                    Change homeserver
                </Button>
                <Button className="w-20" onClick={() => setStage('login')}>
                    Next
                    <IconArrowRight />
                </Button>
            </div>
        </>
    );
}
