import { useTitle } from '@lib/hooks';

export function Titlebar() {
    const [title] = useTitle();
    return (
        <div
            data-tauri-drag-region
            className="flex w-full justify-center items-center h-8 select-none gap-2"
        >
            {title.icon &&
                (typeof title.icon === 'string' ? (
                    <></>
                ) : (
                    <title.icon size={14} className="text-muted-foreground" />
                ))}
            <div className="text-xs font-semibold">{title.title}</div>
        </div>
    );
}
