import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export const CurrentProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  return db.profile.findUnique({
    where: {
      userId,
    },
  });
};
