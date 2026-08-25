import React, { useState, useEffect } from 'react';
import { academicApi } from '../../../services/api';
import { ClassItem } from '../../../types/academic';
import { PageHeader, Modal, FormInput, confirmDialog } from '../../../components/common';
import { School, Plus, Edit, Trash2, Users, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

export const ClassSectionSetupPage: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);

  const [className, setClassName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [sectionsStr, setSectionsStr] = useState('A, B');

  const loadClasses = async () => {
    try {
      setLoading(true);
      const data = await academicApi.getClasses();
      setClasses(data);
    } catch (err) {
      console.error('Failed to load classes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const handleOpenAddModal = () => {
    setEditingClass(null);
    setClassName('');
    setClassCode('');
    setSectionsStr('A, B');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!className || !classCode) {
      toast.error('Please fill in class name and code');
      return;
    }
    toast.success(editingClass ? 'Class updated successfully!' : 'New Class added successfully!');
    setIsModalOpen(false);
    loadClasses();
  };

  const handleDelete = async (cls: ClassItem) => {
    const confirmed = await confirmDialog({
      title: `Delete ${cls.className}?`,
      text: 'All sections and subject allocations for this class will be removed.',
      icon: 'warning',
    });
    if (confirmed) {
      toast.success(`${cls.className} deleted.`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Class & Section Setup"
        subtitle="Manage academic classes, section divisions, and capacity settings"
        breadcrumbs={[{ label: 'Academic' }, { label: 'Class & Section Setup' }]}
        action={
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-sm shadow-blue-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Class</span>
          </button>
        }
      />

      {/* Class Cards Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading academic classes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold">
                      <School className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{cls.className}</h3>
                      <p className="text-xs font-mono text-slate-400">Code: {cls.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingClass(cls);
                        setClassName(cls.className);
                        setClassCode(cls.code);
                        setSectionsStr(cls.sections.map((s) => s.sectionName).join(', '));
                        setIsModalOpen(true);
                      }}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cls)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sections Pill List */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sections</p>
                  <div className="flex flex-wrap gap-2">
                    {cls.sections.map((sec) => (
                      <span
                        key={sec.id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200"
                      >
                        Section {sec.sectionName}
                        <span className="text-[10px] text-slate-400 font-normal">({sec.capacity} seats)</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-500" />
                  ~40 Students
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                  8 Subjects
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Class Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingClass ? `Edit ${editingClass.className}` : 'Create New Class'}
        subtitle="Specify class title, unique code, and section names"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
            >
              Save Class
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <FormInput
            label="Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            placeholder="e.g. Class 5"
            required
          />
          <FormInput
            label="Class Code"
            value={classCode}
            onChange={(e) => setClassCode(e.target.value)}
            placeholder="e.g. C5"
            required
          />
          <FormInput
            label="Sections (Comma Separated)"
            value={sectionsStr}
            onChange={(e) => setSectionsStr(e.target.value)}
            placeholder="e.g. A, B, C"
            helperText="Creates sections automatically"
          />
        </div>
      </Modal>
    </div>
  );
};
