import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LessonsList } from "@/components/LessonsList";

export default function LessonsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <LessonsList />
            <Footer />
        </div>
    );
}
