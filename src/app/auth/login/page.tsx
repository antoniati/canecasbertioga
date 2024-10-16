import { UserLoginForm } from "@/components/UserLoginForm";


export default function LoginPage() {
      return (
            <main className="w-full h-auto flex justify-center items-center py-[80px] sm:py-[100px] bg-gradient-to-br from-gray-50 to-gray-100">
                  <UserLoginForm />
            </main>
      );
}