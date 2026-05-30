import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { FiPlus } from 'react-icons/fi';

const KanbanColumn = ({ id, title, color, bgColor, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className={`${bgColor} dark:bg-gray-800 rounded-lg p-4`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 ${color} rounded-full`}></div>
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <span className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <FiPlus className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className="space-y-3 min-h-[400px] max-h-[600px] overflow-y-auto"
      >
        <SortableContext
          items={tasks.map(t => t.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
