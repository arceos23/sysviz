'use client'

import { useState, useEffect } from "react";

interface Process {
  PID: number,
  CPU: number,
  MEM: number
}

interface ProcessList extends Array<Process> { }

const mockProcesses: ProcessList = [
  { 'PID': 1, 'CPU': 0.0, "MEM": 2.2 },
  { 'PID': 2, 'CPU': 2.7, "MEM": 0.5 },
  { 'PID': 0, 'CPU': 1.0, "MEM": 3.5 },
]

const getProcessInfo = async (processId: number) => {
  const response = await fetch(`http://localhost:3000/api/${processId}`)
  if (response.ok) {
    const json = await response.json()
    console.log(json)
  }
}

export default function Home() {
  const [processId, setProcessId] = useState(-1)
  const [processes, setProcesses] = useState<ProcessList>([])

  useEffect(() => {
    mockProcesses.sort((a, b) => a.PID - b.PID)
    setProcesses(mockProcesses)
  }, [])

  return (
    <>
      <h1 className="text-center text-4xl bg-red-400 p-10">Sysviz</h1>
      <br></br>
      <h2>Running processes:</h2>
      {processes.map((process) => <p onClick={() => setProcessId(process.PID)}>PID: {process.PID}, CPU%: {process.PID}, MEM%: {process.PID}</p>)}
      <br></br>
      <h2>Selected process:</h2>
      {processId !== -1 ? processes.filter(process => process.PID === processId).map((process) => <p>PID: {process.PID}, CPU%: {process.PID}, MEM%: {process.PID}</p>) : null}
      <br></br>
      <h2>Test fetch</h2>
      {processes.map((process) => <p onClick={() => getProcessInfo(process.PID)}>PID: {process.PID}, CPU%: {process.PID}, MEM%: {process.PID}</p>)}
    </>
  );
}
