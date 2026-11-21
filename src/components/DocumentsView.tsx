import React, { useState } from 'react';
import { FileText, Download, Plus, Folder, File, Shield, X } from 'lucide-react';
import { GroupDocument } from '../types';

interface DocumentsViewProps {
  documents: GroupDocument[];
  onAddDocument: (doc: Omit<GroupDocument, 'id'>) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  documents,
  onAddDocument,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Constitution' | 'Meeting Minutes' | 'Financial Report' | 'Policies' | 'Forms'>('Meeting Minutes');
  const [fileSize, setFileSize] = useState('1.2 MB');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddDocument({
      title,
      category,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize,
      fileType: 'PDF',
      uploadedBy: 'Eleanor Vance (President)',
    });

    setTitle('');
    setIsAddModalOpen(false);
  };

  const handleDownload = (docTitle: string) => {
    alert(`Downloading official document: "${docTitle}". File downloaded securely from Grouptly repository.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Documents & Records Repository</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Secure access to group constitutions, meeting minutes, and financial audits.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 dark:shadow-indigo-950/50 hover:bg-indigo-700 transition-all"
        >
          <Plus className="h-4 w-4" /> Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div key={doc.id} className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                <FileText className="h-6 w-6" />
              </div>
              <span className="inline-block rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-300">
                {doc.fileType} • {doc.fileSize}
              </span>
            </div>

            <span className="inline-block rounded-md bg-indigo-50 dark:bg-indigo-500/15 px-2 py-0.5 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 mb-1 w-fit">
              {doc.category}
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{doc.title}</h3>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Uploaded by {doc.uploadedBy} on {doc.uploadDate}
            </p>

            <button
              onClick={() => handleDownload(doc.title)}
              className="mt-auto w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <Download className="h-4 w-4 text-indigo-600 dark:text-indigo-400" /> Download Secure File
            </button>
          </div>
        ))}
      </div>

      {/* Upload Document Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-slate-950/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upload Official Document</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. November 2026 Board Meeting Minutes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Meeting Minutes">Meeting Minutes</option>
                  <option value="Constitution">Constitution & Bylaws</option>
                  <option value="Financial Report">Financial Report</option>
                  <option value="Policies">Policies & Conduct</option>
                  <option value="Forms">Forms & Templates</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Select File (.pdf, .docx)</label>
                <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-6 text-center hover:border-indigo-500 cursor-pointer bg-slate-50 dark:bg-slate-800/50">
                  <div className="space-y-1">
                    <File className="mx-auto h-8 w-8 text-indigo-500 dark:text-indigo-400" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Click to browse or drop file here</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">PDF, DOCX up to 25MB</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-indigo-700"
                >
                  Upload & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
