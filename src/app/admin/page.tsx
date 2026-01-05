import { BarChart3, Users, BookMarked, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { name: "إجمالي الدروس", value: "155", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
        { name: "الفتاوى المجابة", value: "482", icon: MessageSquare, color: "text-green-600", bg: "bg-green-50" },
        { name: "عدد المؤلفات", value: "12", icon: BookMarked, color: "text-purple-600", bg: "bg-purple-50" },
        { name: "زوار الشهر", value: "2.4k", icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    return (
        <div>
            <h1 className="text-3xl font-serif font-bold text-primary mb-8">مرحباً يا شيخ يوسف</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat) => (
                    <div key={stat.name} className={`${stat.bg} p-6 rounded-2xl border border-transparent hover:border-border transition-all`}>
                        <div className="flex items-center justify-between mb-4">
                            <stat.icon className={`h-8 w-8 ${stat.color}`} />
                            <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                        </div>
                        <p className="text-muted-foreground font-medium">{stat.name}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="border border-border rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">آخر الفتاوى الواردة</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl">
                                <p className="text-sm font-medium line-clamp-1">سؤال حول زكاة الفطر في بلاد المهجر...</p>
                                <button className="text-xs font-bold text-secondary hover:underline">رد الآن</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border border-border rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">آخر الدروس المرفوعة</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl">
                                <p className="text-sm font-medium">شرح الأوراد الشاذلية - الدرس {155 - i}</p>
                                <span className="text-xs text-muted-foreground">منذ {i} أيام</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
