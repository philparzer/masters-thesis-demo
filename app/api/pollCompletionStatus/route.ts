import { auth } from "@/auth"
import { getExecution } from "@defer/client"
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
  ) {
    
    const body = await req.json()

    const session = await auth()
    if (!session) {
        console.log("no session")
        return new NextResponse("ERROR 403: not logged in", {status: 403})
    }

    console.log("body", body)

    if (!body.executionId) {
        return Response.json({ error: "no executionId" })
        }
    console.log(body)
    console.log("req", JSON.stringify(body))

    const executionId = body.executionId || "2"
    const ret = await getExecution(executionId as string)
    console.log("ret", ret)
    return Response.json({ res: ret })
  }