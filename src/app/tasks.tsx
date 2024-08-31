import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Card, CardContent } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { schedule } from "~/data/program-data";

const tasks = [
  { id: 1, name: "Compost", color: "bg-amber-600", emoji: "🍂" },
  { id: 2, name: "Almacigos", color: "bg-green-800", emoji: "🌱" },
  { id: 3, name: "Siembra directa", color: "bg-blue-500", emoji: "🌾" },
  { id: 4, name: "Transplante", color: "bg-purple-500", emoji: "🪴" },
  { id: 5, name: "Cosecha", color: "bg-yellow-500", emoji: "🍎" },
  { id: 6, name: "Preparación de suelo", color: "bg-orange-500", emoji: "🚜" },
  { id: 7, name: "Manejo de Manzanos", color: "bg-red-500", emoji: "🌳" },
  { id: 8, name: "Cultivo de Hongos Ostra", color: "bg-teal-500", emoji: "🍄" },
];

type Tasks = typeof tasks;
type Task = Tasks[number];

const TaskBox = ({ task, isActive }: { task: Task; isActive: boolean }) => (
  <TooltipProvider>
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div
          className={`h-20 w-full ${
            isActive ? task.color : "bg-gray-200"
          } relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md`}
        >
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center ${isActive ? "text-white" : "text-gray-800"} p-1 text-center text-xs`}
          >
            <span className="mb-1 text-2xl lg:hidden">{task.emoji}</span>
            <p className="lg:hidden">{task.name}</p>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{task.name}</p>
        <p className="text-xs text-gray-500">
          {isActive ? "Tarea disponible" : "Tarea no disponible"}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default function Component() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">
        Tareas de Voluntarios - Huerto Rio Jeinimeni
      </h1>

      {/* Desktop view */}
      <div className="hidden overflow-x-auto lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-32">Grupo</TableHead>
              <TableHead className="w-40">Fechas</TableHead>
              {tasks.map((task) => (
                <TableHead key={task.id} className="w-24 text-center">
                  <div className="flex h-24 w-24 origin-left translate-y-6 -rotate-45 transform items-center">
                    <span className="mr-1">{task.emoji}</span> {task.name}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((row, index) => (
              <TableRow key={`${row.group}-${index}`}>
                <TableCell className="font-medium">{row.group}</TableCell>
                <TableCell>{row.dateRange}</TableCell>
                {tasks.map((task) => (
                  <TableCell key={task.id} className="p-0">
                    <TaskBox
                      task={task}
                      isActive={row.tasks.includes(task.id)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="space-y-4 lg:hidden">
        {schedule.map((row, index) => (
          <Card key={`${row.group}-${index}`}>
            <CardContent className="p-4">
              <h2 className="mb-2 text-lg font-semibold">{row.group}</h2>
              <p className="mb-4 text-sm text-gray-500">{row.dateRange}</p>
              <div className="grid grid-cols-2 gap-2">
                {tasks.map((task) => (
                  <TaskBox
                    key={task.id}
                    task={task}
                    isActive={row.tasks.includes(task.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-2 text-lg font-semibold">Leyenda</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center">
              <div
                className={`h-8 w-8 ${task.color} mr-2 flex flex-shrink-0 items-center justify-center rounded`}
              >
                <span className="text-xl">{task.emoji}</span>
              </div>
              <span className="text-sm">{task.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
