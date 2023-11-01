import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FileUploader from "@/components/ui/shared/FileUploader";
import Loader from "@/components/ui/shared/Loader";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "@/context/AuthContext";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queryAndMutations";
import { postFormSchema } from "@/lib/validation/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

export default function PostForm({ post, action }: PostFormProps) {
  const { mutateAsync: createPost, isPending: isUploadingPost } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      caption: post ? post.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    values;
    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageUrl: post?.imageUrl,
        imageId: post?.imageId,
      });

      if (!updatedPost) {
        toast({ title: "Please try again" });
      }
      return navigate(`/posts/${post.$id}`);
    }
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });
    if (!newPost) {
      toast({ title: "Please try again" });
    }
    navigate("/");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Tags (separated by comma " , ")</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" placeholder="Art, Expression, Learn" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4" disabled={isLoadingUpdate || isUploadingPost}>
            Cancel
          </Button>

          {isLoadingUpdate ? (
            <Button className="shad-button_primary whitespace-nowrap">
              <Loader />
            </Button>
          ) : (
            <Button type="submit" className="shad-button_primary whitespace-nowrap">
              {action === "Update" ? "Update" : "Upload"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
