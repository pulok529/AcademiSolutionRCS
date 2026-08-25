import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PageHeader, FormSelect, Modal, FormInput } from '../../../components/common';
import { Calendar, Plus } from 'lucide-react';
import { toast } from 'sonner';

export const ClassRoutinePage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Class 1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('General Mathematics');
  const [teacher, setTeacher] = useState('Mr. Kamal Hossain');

  const events = [
    { title: 'Math (Class 1-A) - Room 101', start: '2025-09-01T08:00:00', end: '2025-09-01T09:00:00', backgroundColor: '#2563eb' },
    { title: 'English (Class 1-A) - Room 101', start: '2025-09-01T09:00:00', end: '2025-09-01T10:00:00', backgroundColor: '#10b981' },
    { title: 'Science (Class 1-A) - Room 102', start: '2025-09-01T10:30:00', end: '2025-09-01T11:30:00', backgroundColor: '#f59e0b' },
    { title: 'Bangla (Class 1-A) - Room 101', start: '2025-09-02T08:00:00', end: '2025-09-02T09:00:00', backgroundColor: '#8b5cf6' },
  ];

  const handleAddSlot = () => {
    toast.success(`Class period for ${subject} assigned to timetable!`);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Class Routine & Timetable"
        subtitle="Weekly period allocation, subject timetable grid, and teacher schedules"
        breadcrumbs={[{ label: 'Academic' }, { label: 'Class Routine' }]}
        action={
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Period Slot</span>
          </button>
        }
      />

      {/* Selector */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm w-72">
        <FormSelect
          label="Select Class Section"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          options={[
            { label: 'Class 1 - Section A', value: 'Class 1' },
            { label: 'Class 2 - Section A', value: 'Class 2' },
          ]}
        />
      </div>

      {/* Timetable Grid */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm font-sans text-xs">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin] as any}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay',
          }}
          slotMinTime="08:00:00"
          slotMaxTime="15:00:00"
          events={events}
          height={550}
        />
      </div>

      {/* Add Slot Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Assign Class Period"
        subtitle="Map teacher, subject, and time slot to timetable"
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs text-slate-600 bg-slate-100 rounded-lg">
              Cancel
            </button>
            <button onClick={handleAddSlot} className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg">
              Save Period Slot
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <FormInput label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          <FormInput label="Assigned Teacher" value={teacher} onChange={(e) => setTeacher(e.target.value)} required />
          <FormInput label="Room Number" defaultValue="Room 101" required />
        </div>
      </Modal>
    </div>
  );
};
