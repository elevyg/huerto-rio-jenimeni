import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";

const getApplication = ({ applicationId }: { applicationId: number }) =>
  db.baseApplication.findUniqueOrThrow({
    where: { id: applicationId },
    include: { formApplication: true, videoApplication: true, User: true },
  });

export type Application = Prisma.PromiseReturnType<typeof getApplication>;

export default getApplication;
