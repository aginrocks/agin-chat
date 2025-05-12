import { useContext } from 'react';
import { FlowsContext, StageContext } from './contexts';
import { Button } from '@components/ui/button';
import { PasswordFlow, SSOFlow } from './flows';
import { OrSeparator } from '@components/ui/or-separator';

export function Login() {
    const [stage, setStage] = useContext(StageContext);
    const [flows] = useContext(FlowsContext);
    const passwordFlowExists = flows.find((f) => f.type === 'm.login.password');
    const ssoFlowExists = flows.find((f) => f.type === 'm.login.sso');

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                {passwordFlowExists && <PasswordFlow />}
                {passwordFlowExists && ssoFlowExists && <OrSeparator />}
                {ssoFlowExists && <SSOFlow />}
            </div>
            <div className="flex justify-end gap-2">
                <Button
                    variant="ghost"
                    className="text-muted-foreground w-full"
                    onClick={() => setStage('select_homeserver')}
                >
                    Change homeserver
                </Button>
            </div>
        </div>
    );
}
