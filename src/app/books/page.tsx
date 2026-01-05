import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BooksList } from "@/components/BooksList";

export default function BooksPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <BooksList />
            <Footer />
        </div>
    );
}
