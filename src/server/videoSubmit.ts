"use server";
import { redirect } from "next/navigation";
import { applicantSchema } from "~/schema/applicantInfo";
import { videoFormSchema } from "~/schema/videoForm";
import { db } from "~/server/db";
import sendEmail from "~/server/sendEmail";

const schema = videoFormSchema.merge(applicantSchema);

export async function videoSubmit(data: FormData) {
  const formData = Object.fromEntries(data) as Record<string, string>;
  if ("groups" in formData) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    formData.groups = JSON.parse(formData.groups);
  }

  const parsed = schema.safeParse(formData);
  if (!parsed.success) {
    console.log(JSON.stringify(parsed.error.issues));
    return {
      message: "Invalid form data",
      issues: parsed.error.issues,
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
      videoApplication: {
        create: {
          videoURL: parsed.data.videoURL,
        },
      },
    },
    update: {
      groups: parsed.data.groups,
      videoApplication: {
        upsert: {
          where: {
            applicationId: user.baseApplicationId ?? 0,
          },
          create: {
            videoURL: parsed.data.videoURL,
          },
          update: {
            videoURL: parsed.data.videoURL,
          },
        },
      },
    },
    include: {
      User: true,
      formApplication: true,
      videoApplication: true,
    },
  });

  await sendEmail({ application });

  redirect("/postulacion-enviada");
}
