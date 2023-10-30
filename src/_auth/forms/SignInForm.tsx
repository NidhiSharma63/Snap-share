import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/shared/Loader";
import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import { useSignInAccount } from "@/lib/react-query/queryAndMutations";
import { signInFormSchema } from "@/lib/validation/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

export default function SignInForm() {
  const { toast } = useToast();
  const { checkAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const { mutateAsync: signInAccount, isPending: isUserLoading } = useSignInAccount();
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    // const newAccount = await createUserAccount(values);
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      toast({ title: "Sign in failed. Please try again" });
    }

    const isLoggedIn = await checkAuthUser();
    console.log({ isLoggedIn });
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return;
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" />
        <h2 className="h3-bold md:h2-bold pt-3 sm:pt-8">Login to your Account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back, Please enter your account details
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-fill mt-4 ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" placeholder="Your Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-small-regualr text-ligh-2 text-center mt-2">
            Don't have Account ?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}
