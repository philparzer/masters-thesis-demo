import getCompletion from "@/defer/getCompletion";
import {auth} from "@/auth";
import { NextResponse } from "next/server";

export async function POST(
req: Request,
  ) {
    const session = await auth()
    if (!session) {
        console.log("no session")
        return new NextResponse("ERROR 403: not logged in", {status: 403})
    }

    const body = await req.json()
  
    if (!body.model) {
      return new NextResponse("ERROR 500: no model specified", {status: 500})
    }

    if (!body.text) {
      return new NextResponse("ERROR 500: no text specified", {status: 500})
    }

    if (!body.functionCallDescription) {
      return new NextResponse("ERROR 500: no functionCallDescription specified", {status: 500})
    }

    if (!body.systemPrompt) {
      return new NextResponse("ERROR 500: no systemPrompt specified", {status: 500})
    }

    if (!body.temperature) {
      return new NextResponse("ERROR 500: no temperature specified", {status: 500})
    }

    const temperature = body.temperature;
    const systemPrompt = body.systemPrompt;
    const functionCallDescription = body.functionCallDescription;
    const model = body.model;
    const text = body.text;

    // calling a background function triggers an execution on Defer Platform
    const deferExecutionID = await getCompletion({model, text});

    console.log("deferExecutionID", deferExecutionID)
    
  
    return Response.json(deferExecutionID.id);
  }