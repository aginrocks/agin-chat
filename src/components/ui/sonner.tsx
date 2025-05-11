import { useTheme } from 'next-themes';
import { ExternalToast, Toaster as Sonner, ToasterProps, toast as sonnerToast } from 'sonner';
import { Toast, ToastProps } from './toast';

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = 'system' } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                } as React.CSSProperties
            }
            {...props}
        />
    );
};

function toast(toast: Omit<ToastProps, 'id'>) {
    return sonnerToast.custom((id) => <Toast id={id} {...toast} />, toast.options);
}

export { Toaster, toast };
