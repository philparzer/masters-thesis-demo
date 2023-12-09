import getCompletion from "@/defer/getCompletion";
import {auth} from "@/auth";
import { NextResponse } from "next/server";

export async function GET( //TODO: make post and use body to populate model and text

  ) {

    const session = await auth()
    if (!session) {
        console.log("no session")
        return new NextResponse("ERROR 403: not logged in", {status: 403})
    }

    const model = "gpt-4-0613"
    const text = "В самом начале третьего семестра, на одной из лекций по эмэл философии, Никита Сонечкин сделал одно удивительное открытие. Дело было в том, что с некоторых пор с ним творилось непонятное: стоило маленькому ушастому доценту, похожему из одолеваемого кощунственными мыслями попика, войти в аудиторию, как Никиту начинало смертельно клонить в сон. А когда доцент принимался говорить и показывать пальцем в люстру, Никита уже ничего не мог с собой поделать — он засыпал. Ему чудилось, что лектор говорит не о философии, а о чем-то из детства: о каких-то чердаках, песочницах и горящих помойках, потом ручка в Никитиных пальцах забиралась по диагонали в самый верх листа, оставив за собой неразборчивую фразу, наконец он клевал носом и проваливался в черноту, откуда через секунду-другую выныривал, чтобы вскоре все повторилось в той же самой последовательности. Его конспекты выглядели странно и были непригодны для занятий: короткие абзацы текста пересекались длинными косыми предложениями, где речь шла то о космонавтах-невозвращенцах, то о рабочем визите монгольского хана, а почерк становился мелким и прыгающим."

    // calling a background function triggers an execution on Defer Platform
    const deferExecutionID = await getCompletion({model, text});

    console.log("deferExecutionID", deferExecutionID)
    
  
    return Response.json(deferExecutionID.id);
  }