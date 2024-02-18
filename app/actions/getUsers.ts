import getSession from "./getSession";
import prisma from "@/app/libs/prismadb";

const getUsers = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }
  console.log("SESSION", session);

  try {
    const users = await prisma?.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    console.log("GET_USERS", users);

    if (!users?.length) {
      return [];
    }
    return users;
  } catch (error: any) {
    console.log("INTERNAL_ERROR_GET_USERS", error);
    return [];
  }
};

export default getUsers;
