import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenWraper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <SafeAreaView className={`flex-1 bg-primary py-4 px-8 ${className}`}>
      {children}
    </SafeAreaView>
  );
}
