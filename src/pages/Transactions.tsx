import { useState } from "react";
import { useParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import Header from "@/components/layout/Header";
import TransactionsSidebar from "@/components/layout/TransactionsSidebar";
import TransactionList from "@/components/transactions/TransactionList";
import { Input } from "@/components/ui/input";

const mockTransactions = [
  { id: "1", sender: "المخازن", subject: "موضوع مهم", subjectPreview: "موضوع مهم", date: "2025-12-21" },
  { id: "2", sender: "المكتبة", subject: "موضوع مهم", subjectPreview: "موضوع مهم", date: "2025-12-21", isNew: true },
  { id: "3", sender: "المكتبة", subject: "موضوع مهم", subjectPreview: "موضوع مهم", date: "2025-12-20" },
  { id: "4", sender: "مكتب عميد الكلية", subject: "موضوع مهم", subjectPreview: "موضوع مهم", date: "2025-12-19" },
  { id: "5", sender: "وكيل الكلية لشئون التعليم والطلاب", subject: "موضوع مهم", subjectPreview: "موضوع مهم", date: "2025-12-18" },
];

const typeLabels: Record<string, string> = {
  outgoing: "الصادرات",
  incoming: "الواردات",
  drafts: "المعدة للإرسال",
  deleted: "المحذوفة",
};

const Transactions = () => {
  const { type = "outgoing" } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = mockTransactions.filter(
    (t) =>
      t.sender.includes(searchQuery) ||
      t.subject.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <TransactionsSidebar />
          
          <div className="flex-1 page-container animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-64">
                <Input
                  placeholder="بحث"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 pl-10"
                  dir="rtl"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <h1 className="text-2xl font-bold">{typeLabels[type] || "الصادرات"}</h1>
            </div>

            <TransactionList 
              transactions={filteredTransactions}
              basePath={`/transactions/${type}`}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
