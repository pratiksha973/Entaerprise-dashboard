import { createContext, useContext, useEffect, useState } from "react";
import { initialTasks } from "../data/dummyData";

const TaskContext = createContext();

export function TaskProvider({ children }) {

  // Get tasks from localStorage
  // If nothing is saved, use initialTasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("projectflow_tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return initialTasks;
  });

  // Save tasks whenever tasks change
  useEffect(() => {
    localStorage.setItem(
      "projectflow_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}