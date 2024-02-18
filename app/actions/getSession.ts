import { getServerSession } from "next-auth";
import { authOptions } from "../libs/nextAuth";

export default async function getSession() {
  return await getServerSession(authOptions);
}
