import { AppRoutes } from "@/routes/AppRoutes";
import { ToastProvider } from "@/app/ToastProvider";

export default function App() {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
}
