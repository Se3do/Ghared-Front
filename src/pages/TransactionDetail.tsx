import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowRight, Reply } from "lucide-react";
import Header from "@/components/layout/Header";
import TransactionsSidebar from "@/components/layout/TransactionsSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TransactionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from API
  const transaction = {
    id: "TR-1766312765645",
    sender: "Se3do",
    subject: "موضوع مهم",
    content: "dfsdgfsf",
    date: "2025/12/21",
    isNew: true,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <TransactionsSidebar />
          
          <div className="flex-1 page-container animate-fade-in">
            {/* Back button */}
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(-1)}
                className="gap-2"
              >
                رجوع للقائمة
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              <h1 className="text-2xl font-bold">الصادرات</h1>
            </div>

            {/* Transaction details card */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">تاريخ المعاملة: {transaction.date}</p>
                {transaction.isNew && (
                  <Badge className="bg-primary text-primary-foreground">معاملة جديدة</Badge>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold text-right mb-4">تفاصيل المعاملة</h2>
                
                <div className="space-y-3 text-right">
                  <div className="flex justify-end gap-2">
                    <span className="text-muted-foreground">{transaction.id}</span>
                    <span className="font-medium">:رقم المعاملة</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <span className="text-muted-foreground">{transaction.sender}</span>
                    <span className="font-medium">:المرسل</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-bold text-right mb-2">موضوع المعاملة</h3>
                <p className="text-muted-foreground text-right">{transaction.subject}</p>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-bold text-right mb-2">نص الرسالة</h3>
                <div className="bg-muted/30 rounded-xl p-4 text-right">
                  <p className="text-foreground">{transaction.content}</p>
                </div>
              </div>

              <div className="border-t border-border pt-6 flex gap-4 justify-start">
                <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
                  <ArrowRight className="w-4 h-4" />
                  رجوع
                </Button>
                <Button variant="outline" className="gap-2 text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                  <Reply className="w-4 h-4" />
                  رد على المعاملة
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionDetail;
