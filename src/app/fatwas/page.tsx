import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FatwasList } from "@/components/FatwasList";

export default function FatwasPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <FatwasList />
            <Footer />
        </div>
    );
}
