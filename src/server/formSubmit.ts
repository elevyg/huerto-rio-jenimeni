import { formSchema as schema } from "~/schema/form";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data) as Record<string, string>;
  if ("groups" in formData) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    formData.groups = JSON.parse(formData.groups);
  }
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key in formData) {
      if (formData[key] !== undefined) {
        fields[key] =
          typeof formData[key] === "object"
            ? JSON.stringify(formData[key])
            : String(formData[key]);
      }
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  console.log(parsed.data);

  return { message: "User registered" };
}
