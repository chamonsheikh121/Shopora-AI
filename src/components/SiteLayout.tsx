import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ChatbotPopup } from "./ChatbotPopup";
import { AutomationToasts } from "./AutomationToasts";

export function SiteLayout({ children, hideFooter = false }: { children: React.ReactNode; hideFooter?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
      <ChatbotPopup />
      <AutomationToasts />
    </div>
  );
}
