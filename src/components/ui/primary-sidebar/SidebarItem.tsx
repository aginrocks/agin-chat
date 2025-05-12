import { cn } from '@lib/utils';
import { Icon } from '@tabler/icons-react';
import { cva, VariantProps } from 'class-variance-authority';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';

type SidebarItemProps = VariantProps<typeof itemVariants> &
    React.ComponentProps<'div'> & {
        icon?: Icon;
        label: string;
    };

const itemVariants = cva(
    'flex justify-center items-center rounded-lg w-10 h-10 cursor-pointer border transition',
    {
        variants: {
            active: {
                true: 'bg-blue-600 hover:bg-blue-700 border-transparent text-white',
                // false: 'bg-black/10 hover:bg-black/15 dark:bg-white/10 hover:dark:bg-white/15',
                false: 'border hover:bg-black/5 hover:dark:bg-white/5',
            },
        },
    }
);

export function SidebarItem({ icon: Icon, label, active = false, ...props }: SidebarItemProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className={cn(itemVariants({ active }))} {...props}>
                    {Icon && <Icon size={18} />}
                </div>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    );
}
