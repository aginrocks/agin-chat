import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@components/ui/select';
import { Switch } from '@components/ui/switch';
import { cn } from '@lib/utils';
import { cva } from 'class-variance-authority';

export type SettingPosition = 'start' | 'middle' | 'end';

export type SettingOption = {
    label: string;
    value: string;
};

export type SettingProps = {
    title: string;
    description?: string;
    position?: SettingPosition;
    options?: SettingOption[];
} & ({ type: 'select'; options: SettingOption[] } | { type: 'switch' | 'custom'; options?: never });

const settingVariants = cva('rounded-md', {
    variants: {
        position: {
            start: 'rounded-b-none',
            middle: 'rounded-none',
            end: 'rounded-t-none',
        },
    },
});

export function Setting({ title, description, type, position, options }: SettingProps) {
    return (
        <div
            className={cn(
                'flex justify-between items-center p-3 pl-3.5 rounded-md bg-secondary',
                settingVariants({ position })
            )}
        >
            <div>
                <div className="font-semibold text-sm">{title}</div>
                {description && <div className="text-xs text-muted-foreground">{description}</div>}
            </div>
            <div>
                {type === 'select' && (
                    <Select>
                        <SelectTrigger className="w-[180px] rounded-sm">
                            <SelectValue placeholder={title} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((o) => (
                                <SelectItem key={o.value} value={o.value}>
                                    {o.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
                {type === 'switch' && <Switch />}
            </div>
        </div>
    );
}
