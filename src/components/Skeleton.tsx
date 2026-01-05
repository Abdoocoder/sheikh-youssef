import { cn } from "@/lib/utils";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted/50", className)}
            {...props}
        />
    );
}

export { Skeleton };

export function LessonSkeleton() {
    return (
        <div className="bg-card/40 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] overflow-hidden flex flex-col h-[544px]">
            <Skeleton className="h-64 w-full" />
            <div className="p-8 space-y-4">
                <div className="flex justify-end">
                    <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-3/4 mr-auto" />
                <div className="mt-8 pt-6 border-t border-primary/5 flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
        </div>
    );
}

export function FatwaSkeleton() {
    return (
        <div className="glass p-6 rounded-2xl flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-6 w-64 md:w-96" />
                </div>
            </div>
            <div className="flex flex-col items-end gap-3">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-5 w-5" />
            </div>
        </div>
    );
}

export function BookSkeleton() {
    return (
        <div className="flex flex-col items-center">
            <Skeleton className="w-64 h-96 mb-8 rounded-r-lg rounded-l-[4px]" />
            <Skeleton className="h-8 w-48 mb-3" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-6" />
            <div className="flex gap-4">
                <Skeleton className="h-10 w-28 rounded-lg" />
                <Skeleton className="h-10 w-28 rounded-lg" />
            </div>
        </div>
    );
}
