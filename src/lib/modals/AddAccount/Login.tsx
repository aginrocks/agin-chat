import { useContext } from 'react';
import { FlowsContext, StageContext } from './contexts';
import { Button } from '@/components/ui/button';
import { IconArrowRight } from '@tabler/icons-react';
import { PasswordFlow } from './flows';
import { SSOFlow } from './flows/SSO';
import { Separator } from '@/components/ui/separator';
import clsx from 'clsx';
import { cn } from '@/lib/utils';
import { OrSeparator } from '@/components/ui/or-separator';

export function Login() {
    const [stage, setStage] = useContext(StageContext);
    const [flows] = useContext(FlowsContext);
    const passwordFlowExists = flows.find((f) => f.type === 'm.login.password');
    const ssoFlowExists = flows.find((f) => f.type === 'm.login.sso');

    const loginButtonVisible = passwordFlowExists && flows.length === 1;

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
                    className={cn('text-muted-foreground', clsx({ 'w-full': flows.length > 1 }))}
                    onClick={() => setStage('select_homeserver')}
                >
                    Change homeserver
                </Button>
                {loginButtonVisible && (
                    <Button onClick={() => setStage('login')}>
                        Sign In
                        <IconArrowRight />
                    </Button>
                )}
            </div>
        </div>
    );
}
