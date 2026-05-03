import React from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';
import { FiDownload, FiFileText, FiFile } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ExportTasks = ({ tasks }) => {
  const csvData = tasks.map(task => ({
    Title: task.title,
    Description: task.description,
    Priority: task.priority,
    Status: task.status,
    'Created Date': new Date(task.createdAt).toLocaleDateString(),
    'Updated Date': new Date(task.updatedAt).toLocaleDateString()
  }));

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
    const fileName = 'tasks-' + new Date().toISOString() + '.xlsx';
    XLSX.writeFile(workbook, fileName);
    toast.success('Excel file exported successfully');
  };

  const exportToPDF = () => {
    const element = document.getElementById('tasks-export-content');
    if (!element) return;
    
    const opt = {
      margin: 1,
      filename: 'tasks-' + new Date().toISOString() + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
    toast.success('PDF exported successfully');
  };

  return (
    <div className="flex space-x-2">
      <CSVLink
        data={csvData}
        filename={'tasks-' + new Date().toISOString() + '.csv'}
        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        <FiDownload className="w-4 h-4" />
        <span>Export CSV</span>
      </CSVLink>
      
      <button
        onClick={exportToExcel}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <FiFile className="w-4 h-4" />
        <span>Export Excel</span>
      </button>
      
      <button
        onClick={exportToPDF}
        className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        <FiFileText className="w-4 h-4" />
        <span>Export PDF</span>
      </button>

      <div id="tasks-export-content" style={{ display: 'none' }}>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Tasks Report</h1>
          <p className="mb-4">Generated on: {new Date().toLocaleString()}</p>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">Priority</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td className="border p-2">{task.title}</td>
                  <td className="border p-2">{task.priority}</td>
                  <td className="border p-2">{task.status}</td>
                  <td className="border p-2">{new Date(task.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExportTasks;
