import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { message, image, conversationId, parentId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let newMessage;
    if (parentId) {
      newMessage = await prisma.message.create({
        data: {
          body: message,
          image: image,
          conversation: {
            connect: {
              id: conversationId,
            },
          },
          sender: {
            connect: {
              id: currentUser.id,
              name: currentUser.name,
            },
          },
          seen: {
            connect: {
              id: currentUser.id,
            },
          },
          parent: {
            connect: {
              id: parentId,
            },
          },
        },
        include: {
          seen: true,
          sender: true,
          parent: {
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
    } else {
      newMessage = await prisma.message.create({
        data: {
          body: message,
          image: image,
          conversation: {
            connect: {
              id: conversationId,
            },
          },
          sender: {
            connect: {
              id: currentUser.id,
              name: currentUser.name,
            },
          },
          seen: {
            connect: {
              id: currentUser.id,
            },
          },
        },
        include: {
          seen: true,
          sender: true,
          parent: {
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
    }

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
            parent: {
              include: {
                sender: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    updatedConversation.users.map((user) => {
      if (user.email !== currentUser.email) {
        pusherServer.trigger(user.email!, "notification:new", {
          id: conversationId,
          messages: [lastMessage],
        });
      }
    });

    return NextResponse.json(newMessage);
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("InternalError", { status: 500 });
  }
}
