import { exec } from "child_process";
// const { exec } = require("node:child_process");

export async function GET(
  request: Request,
  { params }: { params: { pid: string } }
) {
  const processId = params.pid;
  console.log(processId);
  // console.log(exec("echo test"));

  return new Response(processId, {
    status: 200,
  });
}
