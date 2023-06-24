import { NextResponse } from "next/server";

export async function GET() {
  const trains = await fetch(
    `https://api.sl.se/api2/realtimedeparturesV4.json?key=${process.env.API_KEY}&siteid=9261&timewindow=0&bus=false
`,
    { next: { revalidate: 60 } }
  ).then((response) => {
    return response;
  });
  const data = await trains.json();
  return NextResponse.json(data.ResponseData);
}
