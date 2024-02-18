import getSession from "./getSession";

const getUsers = async () => {
  const session = await getSession();
  console.log(session);
  if (!session?.user?.email) {
    return [];
  }

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

    if (!users?.length) {
      return [];
    }
    return users;
  } catch (error: any) {
    return [];
  }
};

export default getUsers;
