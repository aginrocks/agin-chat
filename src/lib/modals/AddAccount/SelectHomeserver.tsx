import { useCallback, useContext } from 'react';
import { FormContext, ErrorContext, FlowsContext, StageContext } from './contexts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { IconArrowRight } from '@tabler/icons-react';
import { discoverHomeserver } from './discoverHomeserver';
import { AutoDiscoveryAction } from 'matrix-js-sdk';

export function SelectHomeserver() {
    const form = useContext(FormContext);
    const [stage, setStage] = useContext(StageContext);
    const [error, setError] = useContext(ErrorContext);
    const [flows, setFlows] = useContext(FlowsContext);

    const discoverServer = useCallback(async () => {
        if (!form?.values.homeserver) return;
        setStage('loading');

        const { result, loginFlows } = await discoverHomeserver(form?.values.homeserver);
        console.log(result);
        console.log(loginFlows);
        if (result['m.homeserver'].state === AutoDiscoveryAction.SUCCESS) {
            setStage('login');
            setFlows(loginFlows?.flows ?? []);
            form.setFieldValue('homeserver_base_url', result['m.homeserver'].base_url ?? '');
        } else {
            const message = result['m.homeserver'].error?.toString();
            setStage('error');
            setError(message ?? 'Unknown error');
        }
    }, [form?.values.homeserver]);

    return (
        <>
            <div className="flex flex-col gap-1.5">
                <Label className="text-sm">Homeserver</Label>
                <Input placeholder="matrix.org" {...form?.getInputProps('homeserver')} />
            </div>
            <div className="flex justify-end">
                <Button className="w-20" onClick={discoverServer}>
                    Next
                    <IconArrowRight />
                </Button>
            </div>
        </>
    );
}
