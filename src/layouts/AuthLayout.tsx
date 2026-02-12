import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-muted/40">
      {/* Left Side - Branding */}
      <div className="hidden md:flex flex-col justify-center items-center bg-primary/5 p-12">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to ByteCare
          </h1>
          <p className="text-muted-foreground">
            Secure healthcare management platform for patients, caregivers and
            administrators.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-background shadow-xl rounded-2xl p-8 border">
          {children}
        </div>
      </div>
    </div>
  );
}
