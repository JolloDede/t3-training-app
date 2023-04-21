import { SignIn, SignInButton, useUser } from "@clerk/nextjs";

function LoginPage() {
    return (
        <div className="flex justify-center">
            <SignIn />
        </div>
    );
}

export default LoginPage;