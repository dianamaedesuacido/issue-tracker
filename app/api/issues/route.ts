import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";


export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = issueSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
  
    // const user = await prisma.user.findUnique({
    //   where: { email: body.email },
    // });
  
    // if (user)
    //   return NextResponse.json(
    //     {
    //       error: "User already exists",
    //     },
    //     { status: 400 }
    //   );
  
    const NewIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(NewIssue, { status: 201 });
  }