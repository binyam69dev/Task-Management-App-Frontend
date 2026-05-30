import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const TaskBoard = ({ tasks, onTaskUpdate, onDeleteTask }) => {
  const [columns, setColumns] = useState({
    'todo': {
      id: 'todo',
      title: 'To Do',
      tasks: tasks.filter(t => t.status === 'todo')
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      tasks: tasks.filter(t => t.status === 'in-progress')
    },
    'done': {
      id: 'done',
      title: 'Done',
      tasks: tasks.filter(t => t.status === 'done')
    }
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const draggedTask = sourceColumn.tasks[source.index];

    // Update task status
    onTaskUpdate(draggedTask.id, { status: destination.droppableId });

    // Update local state
    const newSourceTasks = Array.from(sourceColumn.tasks);
    newSourceTasks.splice(source.index, 1);

    const newDestTasks = Array.from(destColumn.tasks);
    newDestTasks.splice(destination.index, 0, draggedTask);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceColumn, tasks: newSourceTasks },
      [destination.droppableId]: { ...destColumn, tasks: newDestTasks }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(columns).map((column) => (
          <div key={column.id} className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">{column.title}</h3>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                {column.tasks.length}
              </span>
            </div>
            
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3 min-h-[500px]"
                >
                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} onDelete={onDeleteTask} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;

