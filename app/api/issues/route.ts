import { NextRequest, NextResponse } from "next/server";
import {z} from "zod"
import  prisma  from "@/prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1)
})
export async function POST(request: NextRequest) {
    const body = await request.json();

    const validation = createIssueSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
  
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