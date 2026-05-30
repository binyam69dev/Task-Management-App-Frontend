import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiCalendar, FiFlag, FiMove } from 'react-icons/fi';
import { format } from 'date-fns';

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

const statusColors = {
  pending: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const TaskCard = ({ task, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  };

  if (!task) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing ${
        isDragging ? 'shadow-lg' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
          {task.title}
        </h4>
        <FiMove className="w-4 h-4 text-gray-400 cursor-move" />
      </div>
      
      {task.description && (
        <p className="text-gray-600 dark:text-gray-300 text-xs mb-3 line-clamp-2">
          {task.description}
        </p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
            {task.status.replace('_', ' ')}
          </span>
        </div>
        
        {task.due_date && (
          <div className="flex items-center text-xs text-gray-500">
            <FiCalendar className="w-3 h-3 mr-1" />
            {format(new Date(task.due_date), 'MMM d')}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
