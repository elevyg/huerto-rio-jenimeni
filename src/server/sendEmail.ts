"use server";
import jwt from "jsonwebtoken";
import { Constants } from "~/lib/contants";

export default function sendEmail({
  applicationId,
}: {
  applicationId: string;
}) {
  const token = jwt.sign({ applicationId }, process.env.JWT_SECRET!);

  void fetch(`${Constants.baseUrl}/api/sendEmail/${applicationId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return true;
}
