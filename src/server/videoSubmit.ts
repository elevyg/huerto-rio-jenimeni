import { videoFormSchema } from "~/schema/videoForm";

export async function videoSubmit(data: FormData) {
  const formData = Object.fromEntries(data) as Record<string, string>;
  if ("groups" in formData) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    formData.groups = JSON.parse(formData.groups);
  }
  const parsed = videoFormSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      message: "Invalid form data",
      issues: parsed.error.issues,
    };
  }
  console.log(parsed.data);
}
