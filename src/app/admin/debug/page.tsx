import { auth } from "@clerk/nextjs/server";
import { Navbar } from "@/components/Navbar";

export default async function AdminDebugPage() {
    const session = await auth();
    const metadata = session.sessionClaims?.metadata;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-2xl mx-auto glass p-8 rounded-3xl">
                    <h1 className="text-2xl font-bold text-primary mb-4">تشخيص صلاحيات الوصول</h1>
                    <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-xl">
                            <span className="block text-sm font-bold text-muted-foreground mb-1">User ID:</span>
                            <code className="text-sm">{session.userId || "Not signed in"}</code>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-xl">
                            <span className="block text-sm font-bold text-muted-foreground mb-1">Role detected from metadata:</span>
                            <code className="text-sm font-bold text-secondary">{(metadata as any)?.role || "No role found"}</code>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-xl overflow-hidden">
                            <span className="block text-sm font-bold text-muted-foreground mb-1">Full Session Metadata:</span>
                            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(metadata, null, 2)}</pre>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-secondary/10 border border-secondary/20 rounded-2xl">
                        <h2 className="font-bold text-secondary mb-2">تعليمات هامة:</h2>
                        <ul className="text-sm list-disc list-inside space-y-2 text-foreground/80">
                            <li>يجب أن يحتوي `Full Session Metadata` على <code>{"{ \"role\": \"admin\" }"}</code>.</li>
                            <li>إذا كان فارغاً أو لا يحتوي على الدور، تأكد من تحديث **Custom session claims** في لوحة تحكم Clerk.</li>
                            <li>بعد تحديث الإعدادات في Clerk، يجب **تسجيل الخروج** ثم **تسجيل الدخول** مرة أخرى لتحديث البيانات.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
