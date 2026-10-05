import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { useTasks } from "../context/TaskContext";
function Kanban() {

  
const { tasks, setTasks } = useTasks();
  const columns = [
    "To Do",
    "In Progress",
    "Review",
    "Done",
  ];

  const [activeTask, setActiveTask] = useState(null);


  // When dragging starts
  const handleDragStart = (event) => {

    const task = tasks.find(
      (task) => task.id === event.active.id
    );

    setActiveTask(task);
  };


  // When task is dropped
  const handleDragEnd = (event) => {

    const { active, over } = event;

    setActiveTask(null);

    if (!over) {
      return;
    }

    const newStatus = over.id;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === active.id
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  };


  return (

    <div className="kanban-page">

      <div className="page-header">

        <div>
          <h1>Kanban Board</h1>

          <p>
            Manage your tasks visually
          </p>
        </div>

        <button className="primary-btn">
          + Add Task
        </button>

      </div>


      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >

        <div className="kanban-board">

          {columns.map((column) => {

            const columnTasks = tasks.filter(
              (task) => task.status === column
            );

            return (

              <KanbanColumn
                key={column}
                column={column}
                tasks={columnTasks}
              />

            );
          })}

        </div>


        <DragOverlay>

          {activeTask ? (
            <TaskCard task={activeTask} />
          ) : null}

        </DragOverlay>

      </DndContext>

    </div>
  );
}


/* =========================
   KANBAN COLUMN
========================= */

function KanbanColumn({ column, tasks }) {

  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id: column,
  });


  return (

    <div
      ref={setNodeRef}
      className="kanban-column"
      style={{
        backgroundColor: isOver
          ? "#e0f2fe"
          : "#f1f5f9",
      }}
    >

      <div className="kanban-column-header">

        <h3>
          {column}
        </h3>

        <span>
          {tasks.length}
        </span>

      </div>


      <div className="kanban-tasks">

        {tasks.map((task) => (

          <DraggableTask
            key={task.id}
            task={task}
          />

        ))}


        {tasks.length === 0 && (

          <div className="empty-column">
            Drop tasks here
          </div>

        )}

      </div>

    </div>
  );
}


/* =========================
   DRAGGABLE TASK
========================= */

function DraggableTask({ task }) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });


  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,

    opacity: isDragging ? 0.4 : 1,
  };


  return (

    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >

      <TaskCard task={task} />

    </div>
  );
}


/* =========================
   TASK CARD
========================= */

function TaskCard({ task }) {

  return (

    <div className="kanban-card">

      <div className="kanban-card-top">

        <span className="task-id">
          TASK-{task.id}
        </span>

        <span
          className={`priority-badge ${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </span>

      </div>


      <h4>
        {task.title}
      </h4>


      <p className="kanban-project">
        {task.project}
      </p>


      <div className="kanban-card-bottom">

        <div className="kanban-avatar">
          {task.assignee}
        </div>

        <span>
          {task.assignee}
        </span>

      </div>

    </div>
  );
}


export default Kanban;