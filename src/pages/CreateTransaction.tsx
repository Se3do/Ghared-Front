import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Save, Plus, Trash2, Upload } from "lucide-react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface Attachment {
  id: string;
  name: string;
  description: string;
  date: string;
}

interface Recipient {
  id: string;
  name: string;
  department: string;
  selected: boolean;
}

const CreateTransaction = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("main");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [transactionNature, setTransactionNature] = useState("new");
  const [transactionType, setTransactionType] = useState("transaction");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [attachmentDescription, setAttachmentDescription] = useState("");
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: "1", name: "مكتب عميد الكلية", department: "baina magdy3", selected: false },
    { id: "2", name: "المخازن", department: "VSTV", selected: false },
    { id: "3", name: "وكيل الكلية لشئون التعليم والطلاب", department: "hanatesting", selected: false },
  ]);

  const handleAddAttachment = () => {
    if (!attachmentDescription.trim()) {
      toast.error("يرجى إدخال وصف الملف");
      return;
    }
    
    const newAttachment: Attachment = {
      id: Date.now().toString(),
      name: "ملف مرفق",
      description: attachmentDescription,
      date: new Date().toLocaleDateString('ar-EG'),
    };
    
    setAttachments([...attachments, newAttachment]);
    setAttachmentDescription("");
    toast.success("تم إضافة المرفق بنجاح");
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter(a => a.id !== id));
    toast.success("تم حذف المرفق");
  };

  const toggleRecipient = (id: string) => {
    setRecipients(recipients.map(r => 
      r.id === id ? { ...r, selected: !r.selected } : r
    ));
  };

  const handleSaveDraft = () => {
    toast.success("تم حفظ المعاملة كمسودة");
    navigate("/transactions/drafts");
  };

  const handleSubmit = () => {
    const selectedRecipients = recipients.filter(r => r.selected);
    if (selectedRecipients.length === 0) {
      toast.error("يرجى اختيار جهة واحدة على الأقل");
      return;
    }
    if (!subject.trim()) {
      toast.error("يرجى إدخال موضوع المعاملة");
      return;
    }
    toast.success("تم إرسال المعاملة بنجاح");
    navigate("/transactions/outgoing");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto page-container animate-fade-in">
          <h1 className="text-2xl font-bold text-right mb-6">إنشاء معاملة</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="main">الرئيسية</TabsTrigger>
              <TabsTrigger value="attachments">إدراج المرفقات</TabsTrigger>
              <TabsTrigger value="send">الإرسال</TabsTrigger>
            </TabsList>

            <TabsContent value="main" className="space-y-6">
              <div className="space-y-2">
                <Label className="text-right block">الموضوع</Label>
                <Input
                  placeholder="ادخل موضوع المعاملة"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="text-right"
                  dir="rtl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-right block">مضمون الخطاب</Label>
                <Textarea
                  placeholder="ادخل محتوى الخطاب"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] text-right"
                  dir="rtl"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-right block">طبيعة المعاملة</Label>
                <RadioGroup value={transactionNature} onValueChange={setTransactionNature} className="flex gap-8 justify-end">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="reply">رد أو إستدراك لمعاملة سابقة</Label>
                    <RadioGroupItem value="reply" id="reply" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="new">معاملة جديدة</Label>
                    <RadioGroupItem value="new" id="new" />
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label className="text-right block">نوع المعاملة</Label>
                <RadioGroup value={transactionType} onValueChange={setTransactionType} className="flex gap-8 justify-end">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="decision">إقرار</Label>
                    <RadioGroupItem value="decision" id="decision" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="transaction">معاملة</Label>
                    <RadioGroupItem value="transaction" id="transaction" />
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-start pt-4">
                <Button onClick={() => setActiveTab("attachments")}>
                  التالي: إدراج المرفقات
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="attachments" className="space-y-6">
              <div className="border border-border rounded-xl p-6">
                <h3 className="font-bold text-right mb-4">المرفقات</h3>
                
                <div className="flex gap-4 items-end mb-6">
                  <Button onClick={handleAddAttachment} className="gap-2">
                    <Plus className="w-4 h-4" />
                    إضافة
                  </Button>
                  <div className="flex-1">
                    <Label className="text-right block mb-2">وصف الملف</Label>
                    <Input
                      placeholder="مثال: صورة البطاقة الشخصية"
                      value={attachmentDescription}
                      onChange={(e) => setAttachmentDescription(e.target.value)}
                      className="text-right"
                      dir="rtl"
                    />
                  </div>
                  <div className="w-48">
                    <Label className="text-right block mb-2">اختر الملف</Label>
                    <Button variant="outline" className="w-full gap-2">
                      <Upload className="w-4 h-4" />
                      Choose File
                    </Button>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">حذف الملف</TableHead>
                      <TableHead className="text-right">عرض الملف</TableHead>
                      <TableHead className="text-right">وصف الملف</TableHead>
                      <TableHead className="text-right">التاريخ</TableHead>
                      <TableHead className="text-right">الرقم</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attachments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          لا توجد مرفقات حتى الآن
                        </TableCell>
                      </TableRow>
                    ) : (
                      attachments.map((attachment, index) => (
                        <TableRow key={attachment.id}>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveAttachment(attachment.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="link" size="sm">عرض</Button>
                          </TableCell>
                          <TableCell className="text-right">{attachment.description}</TableCell>
                          <TableCell className="text-right">{attachment.date}</TableCell>
                          <TableCell className="text-right">{index + 1}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between pt-4">
                <Button onClick={() => setActiveTab("send")}>
                  التالي: الإرسال
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("main")}>
                  السابق
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="send" className="space-y-6">
              <h3 className="font-bold text-right text-lg">تحديد الجهات المرسل إليها</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recipients.map((recipient) => (
                  <div
                    key={recipient.id}
                    className={`border rounded-xl p-4 text-right cursor-pointer transition-all duration-200 ${
                      recipient.selected 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleRecipient(recipient.id)}
                  >
                    <div className="flex items-start justify-end gap-3">
                      <div>
                        <p className="font-medium">{recipient.name}</p>
                        <p className="text-sm text-primary">{recipient.department}</p>
                      </div>
                      <Checkbox
                        checked={recipient.selected}
                        onCheckedChange={() => toggleRecipient(recipient.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-start pt-8">
                <Button onClick={handleSubmit} className="gap-2">
                  <Send className="w-4 h-4" />
                  إرسال المعاملة
                </Button>
                <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
                  <Save className="w-4 h-4" />
                  حفظ كمسودة
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default CreateTransaction;
