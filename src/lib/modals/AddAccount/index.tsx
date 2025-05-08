import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@mantine/form';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { SelectHomeserver } from './SelectHomeserver';
import { PasswordLogin } from './PasswordLogin';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import {
    AddAccountContext,
    ErrorContext,
    LoginDetails,
    LoginStage,
    StageContext,
} from './contexts';
import { ModalProps } from '../ModalsManager';
import { ErrorMessage } from '@/components/ui/error';

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

    const [stage, setStage] = useState<LoginStage>('rocks.agin.chat.select_homeserver');
    const [error, setError] = useState('');

    return (
        <Dialog {...props}>
            <DialogContent className="w-md">
                <AddAccountContext.Provider value={form}>
                    <StageContext.Provider value={[stage, setStage]}>
                        <ErrorContext.Provider value={[error, setError]}>
                            <DialogHeader className="mb-1.5">
                                <DialogTitle>Log In</DialogTitle>
                            </DialogHeader>
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    className="flex flex-col gap-4"
                                    key={stage}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                >
                                    {stage === 'rocks.agin.chat.select_homeserver' && (
                                        <SelectHomeserver />
                                    )}
                                    {stage === 'error' && (
                                        <ErrorMessage
                                            title="An error occurred"
                                            description={error}
                                        />
                                    )}
                                    {stage === 'm.login.password' && <PasswordLogin />}
                                </motion.div>
                            </AnimatePresence>
                        </ErrorContext.Provider>
                    </StageContext.Provider>
                </AddAccountContext.Provider>
            </DialogContent>
        </Dialog>
    );
}
