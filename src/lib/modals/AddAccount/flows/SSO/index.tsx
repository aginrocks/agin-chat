import { useContext, useMemo } from 'react';
import { FlowsContext } from '../../contexts';
import { ISSOFlow } from 'matrix-js-sdk';
import { Button } from '@/components/ui/button';

export function SSOFlow() {
    const [flows] = useContext(FlowsContext);
    const ssoFlow = useMemo(() => flows.find((f) => f.type === 'm.login.sso'), [flows]) as
        | ISSOFlow
        | undefined;

    if (!ssoFlow) return <></>;

    const providers = ssoFlow.identity_providers;
    if (!providers) return <Button variant="secondary">Continue with SSO</Button>;

    return (
        <div className="flex flex-col gap-3">
            {providers.map((p) => (
                <Button key={p.id} variant="secondary">
                    Continue with {p.name}
                </Button>
            ))}
        </div>
    );
}
