import { useContext, useMemo } from 'react';
import { FlowsContext, FormContext } from '../../contexts';
import { ISSOFlow } from 'matrix-js-sdk';
import { Button } from '@components/ui/button';
import { useSSOFlow } from './flow';

export function SSOFlow() {
    const [flows] = useContext(FlowsContext);
    const form = useContext(FormContext);

    const ssoFlow = useMemo(() => flows.find((f) => f.type === 'm.login.sso'), [flows]) as
        | ISSOFlow
        | undefined;

    const flow = useSSOFlow();

    if (!ssoFlow) return <></>;

    const providers = ssoFlow.identity_providers;
    if (!providers)
        return (
            <Button
                variant="secondary"
                onClick={async () => await flow.start(form?.values.homeserver_base_url ?? '')}
            >
                Continue with SSO
            </Button>
        );

    return (
        <div className="flex flex-col gap-3">
            {providers.map((p) => (
                <Button
                    key={p.id}
                    variant="secondary"
                    onClick={async () =>
                        await flow.start(form?.values.homeserver_base_url ?? '', p.id)
                    }
                >
                    Continue with {p.name}
                </Button>
            ))}
        </div>
    );
}
