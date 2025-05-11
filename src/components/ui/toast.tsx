import { Icon } from '@tabler/icons-react';
import { Action, ExternalToast } from 'sonner';
import { Card } from './card';
import { ThemedIcon } from './themed-icon';
import { Button } from './button';
import { toast as sonnerToast } from 'sonner';

export type ToastProps = {
    id: string | number;
    title: string;
    description?: string;
    icon?: Icon;
    options?: ExternalToast;
    action?: Action;
    cancel?: Action;
};

export function Toast({ id, title, description, action, cancel, icon: Icon }: ToastProps) {
    return (
        <Card className="p-4 w-110">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    {Icon && <ThemedIcon icon={Icon} color="blue" />}
                    <div>
                        <div className="text-base font-semibold">{title}</div>
                        {description && (
                            <div className="text-sm text-muted-foreground font-normal">
                                {description}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    {cancel && (
                        <Button
                            variant="secondary"
                            onClick={(e) => {
                                sonnerToast.dismiss(id);
                                cancel.onClick?.(e);
                            }}
                        >
                            {cancel.label}
                        </Button>
                    )}
                    {action && (
                        <Button
                            onClick={(e) => {
                                sonnerToast.dismiss(id);
                                action.onClick?.(e);
                            }}
                        >
                            {action.label}
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}
