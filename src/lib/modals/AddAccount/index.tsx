import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@mantine/form';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { SelectHomeserver } from './SelectHomeserver';
import { Login } from './Login';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import {
    FormContext,
    ErrorContext,
    FlowsContext,
    LoginDetails,
    LoginStage,
    StageContext,
} from './contexts';
import { ModalProps } from '../ModalsManager';
import { ErrorMessage } from '@/components/ui/error';
import { SpinnerSection } from '@/components/ui/spinner-section';
import { Button } from '@/components/ui/button';
import { ILoginFlow } from 'matrix-js-sdk';

export function AddAccount({
    payload,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & ModalProps<'AddAccount'>) {
    const form = useForm<LoginDetails>({
        initialValues: {
            homeserver: 'matrix.org',
            username: '',
            password: '',
        },
    });

    const [stage, setStage] = useState<LoginStage>('select_homeserver');
    const [error, setError] = useState('');
    const [flows, setFlows] = useState<ILoginFlow[]>([]);

    return (
        <Dialog {...props}>
            <DialogContent className="w-md">
                <FormContext.Provider value={form}>
                    <StageContext.Provider value={[stage, setStage]}>
                        <FlowsContext.Provider value={[flows, setFlows]}>
                            <ErrorContext.Provider value={[error, setError]}>
                                <DialogHeader className="mb-1.5">
                                    <DialogTitle>Sign In</DialogTitle>
                                </DialogHeader>
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        className="flex flex-col gap-4"
                                        key={stage}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                    >
                                        {stage === 'select_homeserver' && <SelectHomeserver />}
                                        {stage === 'loading' && (
                                            <SpinnerSection>
                                                <Button
                                                    variant="ghost"
                                                    className="text-muted-foreground"
                                                    size="sm"
                                                >
                                                    Cancel
                                                </Button>
                                            </SpinnerSection>
                                        )}
                                        {stage === 'error' && (
                                            <ErrorMessage
                                                title="An error occurred"
                                                description={error}
                                            >
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => setStage('select_homeserver')}
                                                >
                                                    Change homeserver
                                                </Button>
                                            </ErrorMessage>
                                        )}
                                        {stage === 'login' && <Login />}
                                    </motion.div>
                                </AnimatePresence>
                            </ErrorContext.Provider>
                        </FlowsContext.Provider>
                    </StageContext.Provider>
                </FormContext.Provider>
            </DialogContent>
        </Dialog>
    );
}
