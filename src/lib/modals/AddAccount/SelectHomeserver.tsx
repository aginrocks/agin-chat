import { useCallback, useContext } from 'react';
import { FormContext, ErrorContext, FlowsContext, StageContext } from './contexts';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@radix-ui/react-label';
import { IconArrowRight } from '@tabler/icons-react';
import { discoverHomeserver } from './discoverHomeserver';
import { AutoDiscoveryAction } from 'matrix-js-sdk';
import { APP_NAME } from '@lib/constants/names';
import { getHotkeyHandler } from '@mantine/hooks';

export function SelectHomeserver() {
    const form = useContext(FormContext);
    const [, setStage] = useContext(StageContext);
    const [, setError] = useContext(ErrorContext);
    const [, setFlows] = useContext(FlowsContext);

    const discoverServer = useCallback(async () => {
        if (!form?.values.homeserver) return;
        setStage('loading');

        const { result, loginFlows } = await discoverHomeserver(form?.values.homeserver);
        console.log(result);
        console.log(loginFlows);

        if (loginFlows?.flows.length === 0) {
            setStage('error');
            setError(
                `${APP_NAME} does not support this homeserver. Please open an issue on GitHub or ask the homeserver owner to enable password or SSO authentication.`
            );
            return;
        }

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
                <Input
                    placeholder="matrix.org"
                    onKeyDown={getHotkeyHandler([['Enter', discoverServer]])}
                    {...form?.getInputProps('homeserver')}
                />
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
