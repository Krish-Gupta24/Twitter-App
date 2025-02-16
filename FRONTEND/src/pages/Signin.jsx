import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { SigninForm } from "@/components/signin-form";

export default function SigninPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <h1 className="flex items-center gap-2 font-medium decoration-clone">
            <FontAwesomeIcon icon={faXTwitter} size="2x" />
            Twitter
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SigninForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://imgs.search.brave.com/-EFBoirAPDHkomSXuZtubJ_U4Bn27MGd7udMd7CTo_U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d29ybGR2ZWN0b3Js/b2dvLmNvbS9sb2dv/cy90d2l0dGVyLWxv/Z28tMi5zdmc"
          alt="Image"
          className="absolute h-full w-full object-cover "
        />
      </div>
    </div>
  );
}
