import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createUserSchema } from "../../validatationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newUser = await prisma.userInformation.create({
    data: {
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      country: body.country,
      gender: body.gender,
      qualification: body.qualification,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
