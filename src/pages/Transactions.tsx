import { useState } from "react";
import { useParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import Header from "@/components/layout/Header";
import TransactionsSidebar from "@/components/layout/TransactionsSidebar";
import TransactionList from "@/components/transactions/TransactionList";
import { Input } from "@/components/ui/input";
import { useInbox } from "@/hooks/useInbox";
import { Skeleton } from "@/components/ui/skeleton";

const typeLabels: Record<string, string> = {
  outgoing: "الصادرات",
  incoming: "الواردات",
  drafts: "المعدة للإرسال",
  deleted: "المحذوفة",
};

const Transactions = () => {
  const { type = "incoming" } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: inboxData, isLoading, error } = useInbox();

  const transactions = inboxData?.map((t) => ({
    id: t.transaction_id.toString(),
    sender: t.sender_name,
    subject: t.subject,
    subjectPreview: t.code,
    date: new Date(t.date).toLocaleDateString("ar-EG"),
  })) || [];

  const filteredTransactions = transactions.filter(
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
              
              <h1 className="text-2xl font-bold">{typeLabels[type] || "الواردات"}</h1>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : error ? (
              <div className="py-12 text-center text-destructive">
                حدث خطأ في تحميل البيانات
              </div>
            ) : (
              <TransactionList 
                transactions={filteredTransactions}
                basePath={`/transactions/${type}`}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
