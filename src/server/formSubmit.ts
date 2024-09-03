"use server";
import { redirect } from "next/navigation";
import { applicantSchema } from "~/schema/applicantInfo";
import { formSchema } from "~/schema/form";
import { db } from "~/server/db";
import sendEmail from "~/server/sendEmail";

const schema = formSchema.merge(applicantSchema);

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function formSubmit(data: FormData): Promise<FormState> {
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

  let user = await db.user.findUnique({
    where: {
      email: parsed.data.email,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
      },
    });
  }

  const application = await db.baseApplication.upsert({
    where: {
      id: user.baseApplicationId ?? 0,
    },
    create: {
      User: {
        connect: {
          id: user.id,
        },
      },
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
    update: {
      groups: parsed.data.groups,
      formApplication: {
        upsert: {
          where: {
            applicationId: user.baseApplicationId ?? 0,
          },
          create: {
            why: parsed.data.why,
            experience: parsed.data.experience,
            knowledge: parsed.data.knowledge,
            skills: parsed.data.skills,
          },
          update: {
            why: parsed.data.why,
            experience: parsed.data.experience,
            knowledge: parsed.data.knowledge,
            skills: parsed.data.skills,
          },
        },
      },
    },
    select: {
      id: true,
    },
  });

  sendEmail({ applicationId: application.id.toString() });

  redirect("/postulacion-enviada");
}
