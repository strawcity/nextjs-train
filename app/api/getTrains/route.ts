import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const trains = await axios
    .get(
      `https://api.sl.se/api2/realtimedeparturesV4.json?key=${process.env.API_KEY}&siteid=9261&timewindow=0&bus=false
`
    )
    .then((response) => {
      return response.data.ResponseData;
    });
  return NextResponse.json(trains);
}
