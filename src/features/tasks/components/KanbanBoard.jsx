import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTasks } from '../hooks/useTasks';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import { FiPlus } from 'react-icons/fi';

const columns = [
  { id: 'pending', title: 'To Do', color: 'bg-gray-500', bgColor: 'bg-gray-50' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-blue-500', bgColor: 'bg-blue-50' },
  { id: 'completed', title: 'Done', color: 'bg-green-500', bgColor: 'bg-green-50' },
  { id: 'cancelled', title: 'Cancelled', color: 'bg-red-500', bgColor: 'bg-red-50' },
];

const KanbanBoard = () => {
  const { tasks, loading, updateTaskStatus } = useTasks();
  const [tasksByStatus, setTasksByStatus] = useState({});
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (tasks) {
      const grouped = {
        pending: tasks.filter(t => t.status === 'pending'),
        in_progress: tasks.filter(t => t.status === 'in_progress'),
        completed: tasks.filter(t => t.status === 'completed'),
        cancelled: tasks.filter(t => t.status === 'cancelled'),
      };
      setTasksByStatus(grouped);
    }
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTask = tasks.find(t => t.id.toString() === active.id);
    const newStatus = over.id;

    if (activeTask && activeTask.status !== newStatus) {
      // Update task status
      await updateTaskStatus(activeTask.id, newStatus);
      
      // Optimistically update UI
      setTasksByStatus(prev => {
        const newTasks = { ...prev };
        // Remove from old column
        newTasks[activeTask.status] = newTasks[activeTask.status].filter(
          t => t.id !== activeTask.id
        );
        // Add to new column
        newTasks[newStatus] = [...newTasks[newStatus], { ...activeTask, status: newStatus }];
        return newTasks;
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Task Board</h2>
        <p className="text-gray-600 dark:text-gray-400">Drag and drop tasks to change status</p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              bgColor={column.bgColor}
              tasks={tasksByStatus[column.id] || []}
            />
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <TaskCard
              task={tasks.find(t => t.id.toString() === activeId)}
              isDragging={true}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
