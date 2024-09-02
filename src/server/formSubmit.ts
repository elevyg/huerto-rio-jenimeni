"use server";
import { formSchema as schema } from "~/schema/form";
import { db } from "~/server/db";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

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

  const application = await db.baseApplication.create({
    data: {
      groups: parsed.data.groups,
      formApplication: {
        create: {
          why: parsed.data.why,
          experience: parsed.data.experience,
          knowledge: parsed.data.knowledge,
          skills: parsed.data.skills,
        },
      },
    },
    select: {
      id: true,
    },
  });

  void fetch(`${baseUrl}/api/sendEmail/${application.id}`, {
    method: "GET",
  });

  return { message: "User registered" };
}
