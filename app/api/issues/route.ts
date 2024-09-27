import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";
import { authOptions } from "../auth/authOptions";


export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
    return NextResponse.json({}, { status: 401 });
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    // in case of addtional checking
    // const issue = await prisma.issue.findUnique({
    //   where: { id: body.id },
    // });
  
    // if (issue)
    //   return NextResponse.json(
    //     {
    //       error: "Issue already exists",
    //     },
    //     { status: 404 }
    //   );
  
    const NewIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(NewIssue, { status: 201 });
  }