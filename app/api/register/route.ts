// import bcrypt from "bcrypt";

// import prisma from "@/app/libs/prismadb";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   console.log("BUM");
//   console.log(request);

//   try {
//     const body = await request.json();

//     const { email, name, password } = body;

//     if (!email) {
//       return new NextResponse("Missing email field", { status: 400 });
//     }

//     if (!name) {
//       return new NextResponse("Missing name field", { status: 400 });
//     }

//     if (!password) {
//       return new NextResponse("Missing email password", { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     console.log("CREATING");

//     const user = await prisma.user.create({
//       data: {
//         email,
//         name,
//         hashedPassword,
//       },
//     });
//     console.log("CREATING", user);

//     return NextResponse.json(user);
//   } catch (error) {
//     console.log(error, "REGISTRATION_ERROR");
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  console.log(user);
  return NextResponse.json(user);
}
