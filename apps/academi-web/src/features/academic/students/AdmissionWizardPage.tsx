import React, { useState, useEffect } from 'react';
import { academicApi } from '../../../services/api';
import { ClassItem, CreateStudentRequest } from '../../../types/academic';
import { PageHeader, FormInput, FormSelect, FormTextarea } from '../../../components/common';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, CheckCircle2, User, Users, GraduationCap, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export const AdmissionWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CreateStudentRequest>({
    studentCode: `STU-${Math.floor(100000 + Math.random() * 900000)}`,
    firstName: '',
    lastName: '',
    gender: 1,
    dateOfBirth: '2015-01-01',
    fatherName: '',
    motherName: '',
    contactNo: '',
    address: '',
    classId: '',
    sectionId: '',
    shift: 1,
    academicYear: new Date().getFullYear(),
    rollNo: 1,
  });

  useEffect(() => {
    academicApi.getClasses().then((data) => {
      setClasses(data);
      if (data.length > 0) {
        setFormData((prev) => ({
          ...prev,
          classId: data[0].id,
          sectionId: data[0].sections[0]?.id || '',
        }));
      }
    });
  }, []);

  const currentClass = classes.find((c) => c.id === formData.classId);

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Parent & Guardian', icon: Users },
    { number: 3, title: 'Academic Enrollment', icon: GraduationCap },
    { number: 4, title: 'Review & Submit', icon: ShieldCheck },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await academicApi.createStudent(formData);
      toast.success('Student admitted successfully!');
      navigate('/academic/students');
    } catch (err) {
      console.error('Admission failed:', err);
      toast.error('Admission failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader
        title="Student Admission Wizard"
        subtitle="Complete the step-by-step registration to enroll a new student"
        breadcrumbs={[
          { label: 'Academic', path: '/academic/students' },
          { label: 'Student Directory', path: '/academic/students' },
          { label: 'New Admission' },
        ]}
        action={
          <button
            onClick={() => navigate('/academic/students')}
            className="px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </button>
        }
      />

      {/* Step Indicator */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          return (
            <div
              key={step.number}
              onClick={() => step.number < currentStep && setCurrentStep(step.number)}
              className={`flex items-center gap-3 cursor-pointer ${
                step.number < currentStep ? 'cursor-pointer' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-emerald-500 text-white'
                    : isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow-md shadow-blue-600/20'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
              </div>
              <div className="hidden sm:block text-left">
                <p className={`text-[10px] uppercase font-bold tracking-wider ${isCurrent ? 'text-blue-600' : 'text-slate-400'}`}>
                  Step {step.number}
                </p>
                <p className={`text-xs font-semibold ${isCurrent ? 'text-slate-900' : 'text-slate-500'}`}>
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Form Body */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* STEP 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Student Code / ID"
                value={formData.studentCode}
                onChange={(e) => setFormData({ ...formData, studentCode: e.target.value })}
                required
              />
              <FormInput
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="e.g. Rahul"
                required
              />
              <FormInput
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="e.g. Islam"
                required
              />
              <FormSelect
                label="Gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: parseInt(e.target.value) })}
                options={[
                  { label: 'Male', value: 1 },
                  { label: 'Female', value: 2 },
                  { label: 'Other', value: 3 },
                ]}
              />
              <FormInput
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                required
              />
            </div>
          </div>
        )}

        {/* STEP 2: Parent & Guardian */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Parent & Contact Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Father's Name"
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                required
              />
              <FormInput
                label="Mother's Name"
                value={formData.motherName}
                onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                required
              />
              <FormInput
                label="Contact Phone Number"
                type="tel"
                value={formData.contactNo}
                onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                placeholder="01700000000"
                required
              />
              <FormTextarea
                label="Permanent Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
                required
              />
            </div>
          </div>
        )}

        {/* STEP 3: Academic Enrollment */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Academic Placement</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormSelect
                label="Class"
                value={formData.classId}
                onChange={(e) => {
                  const selCls = classes.find((c) => c.id === e.target.value);
                  setFormData({
                    ...formData,
                    classId: e.target.value,
                    sectionId: selCls?.sections[0]?.id || '',
                  });
                }}
                options={classes.map((cls) => ({ label: cls.className, value: cls.id }))}
              />

              <FormSelect
                label="Section"
                value={formData.sectionId}
                onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
                options={
                  currentClass?.sections.map((sec) => ({
                    label: `Section ${sec.sectionName}`,
                    value: sec.id,
                  })) || []
                }
              />

              <FormInput
                label="Roll Number"
                type="number"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: parseInt(e.target.value) || 1 })}
                min={1}
                required
              />

              <FormSelect
                label="Shift"
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: parseInt(e.target.value) })}
                options={[
                  { label: 'Morning Shift', value: 1 },
                  { label: 'Day Shift', value: 2 },
                  { label: 'Evening Shift', value: 3 },
                ]}
              />

              <FormInput
                label="Academic Year"
                type="number"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: parseInt(e.target.value) || 2025 })}
                required
              />
            </div>
          </div>
        )}

        {/* STEP 4: Review & Confirm */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Review Admission Summary</h2>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-slate-400 font-medium">Student Code</p>
                <p className="font-mono font-bold text-blue-600 text-sm mt-0.5">{formData.studentCode}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Full Name</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{formData.firstName} {formData.lastName}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Class & Section</p>
                <p className="font-semibold text-slate-800 mt-0.5">{currentClass?.className} - Section {currentClass?.sections.find(s => s.id === formData.sectionId)?.sectionName || 'A'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Roll Number</p>
                <p className="font-bold text-slate-800 mt-0.5">#{formData.rollNo}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Father's Name</p>
                <p className="font-medium text-slate-800 mt-0.5">{formData.fatherName}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Contact</p>
                <p className="font-mono text-slate-800 mt-0.5">{formData.contactNo}</p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 transition-all"
          >
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition-all"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Submitting...' : 'Confirm & Complete Admission'}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
