export default function Skeleton() {
    return (
        <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_rgba(44,30,18,0.10)]">
            <div className="h-48 bg-sand" />
            <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded bg-sand" />
                <div className="h-3 w-1/2 rounded bg-sand" />
                <div className="flex gap-2"><div className="h-5 w-16 rounded-full bg-sand" /><div className="h-5 w-16 rounded-full bg-sand" /></div>
                <div className="flex justify-between pt-2">
                    <div className="h-6 w-20 rounded bg-sand" />
                    <div className="h-7 w-16 rounded-full bg-sand" />
                </div>
            </div>
        </div>
    );
}