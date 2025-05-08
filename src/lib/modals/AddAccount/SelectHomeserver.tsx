import { useContext } from 'react';
import { AddAccountContext, StageContext } from './contexts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { IconArrowRight } from '@tabler/icons-react';

export function SelectHomeserver() {
    const form = useContext(AddAccountContext);
    const [stage, setStage] = useContext(StageContext);

    return (
        <>
            <div className="flex flex-col gap-1.5">
                <Label className="text-sm">Homeserver</Label>
                <Input placeholder="matrix.org" {...form?.getInputProps('homeserver')} />
            </div>
            <div className="flex justify-end">
                <Button className="w-20" onClick={() => setStage('m.login.password')}>
                    Next
                    <IconArrowRight />
                </Button>
            </div>
        </>
    );
}
