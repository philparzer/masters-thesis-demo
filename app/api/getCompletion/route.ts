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
    const text = "So braucht sie denn die schönen Kräfte Und treibt die dicht’rischen Geschäfte, Wie man ein Liebesabenteuer treibt. Zufällig naht man sich, man fühlt, man bleibt Und nach und nach wird man verflochten; Es wächst das Glück, dann wird es angefochten, Man ist entzückt, nun kommt der Schmerz heran, Und eh man sich’s versieht ist’s eben ein Roman. Laßt uns auch so ein Schauspiel geben! Greift nur hinein ins volle Menschenleben! Ein jeder lebt’s, nicht vielen ist’s bekannt, [16]Und wo ihr’s packt, da ist’s interessant. In bunten Bildern wenig Klarheit, Viel Irrthum und ein Fünkchen Wahrheit, So wird der beste Trank gebraut, Der alle Welt erquickt und auferbaut. Dann sammelt sich der Jugend schönste Blüte Vor eurem Spiel und lauscht der Offenbarung, Dann sauget jedes zärtliche Gemüthe Aus eurem Werk sich melanchol’sche Nahrung; Dann wird bald dies bald jenes aufgeregt, Ein jeder sieht was er im Herzen trägt. Noch sind sie gleich bereit zu weinen und zu lachen, Sie ehren noch den Schwung, erfreuen sich am Schein; Wer fertig ist, dem ist nichts recht zu machen, Ein Werdender wird immer dankbar seyn."

    // calling a background function triggers an execution on Defer Platform
    const deferExecutionID = await getCompletion({model, text});

    console.log("deferExecutionID", deferExecutionID)
    
  
    return Response.json(deferExecutionID.id);
  }