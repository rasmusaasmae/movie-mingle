import AuthProvider from "./auth";
import QueryProvider from "./query";
import ThemeProvider from "./theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
