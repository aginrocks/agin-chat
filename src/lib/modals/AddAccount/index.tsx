import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useForm } from '@mantine/form';
import { AnimatePresence, motion } from 'motion/react';
import { createContext, Dispatch, useState } from 'react';
import { SelectHomeserver } from './SelectHomeserver';
import { SetStateAction } from 'jotai';
import { PasswordLogin } from './PasswordLogin';

export type LoginStage = 'rocks.agin.chat.select_homeserver' | 'm.login.password';

export type LoginDetails = {
    homeserver: string;
    username: string;
    password: string;
};

export type AddAccountContextType = ReturnType<typeof useForm<LoginDetails>>;
export const AddAccountContext = createContext<AddAccountContextType | null>(null);

export type StageContextType = [LoginStage, Dispatch<SetStateAction<LoginStage>>];
export const StageContext = createContext<StageContextType>([
    'rocks.agin.chat.select_homeserver',
    () => {},
]);

export function AddAccount() {
    const form = useForm<LoginDetails>({
        initialValues: {
            homeserver: 'matrix.org',
            username: '',
            password: '',
        },
    });

    const [stage, setStage] = useState<LoginStage>('rocks.agin.chat.select_homeserver');

    return (
        <Dialog>
            <DialogContent className="w-md">
                <AddAccountContext.Provider value={form}>
                    <StageContext.Provider value={[stage, setStage]}>
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
                                {stage === 'm.login.password' && <PasswordLogin />}
                            </motion.div>
                        </AnimatePresence>
                    </StageContext.Provider>
                </AddAccountContext.Provider>
            </DialogContent>
        </Dialog>
    );
}
