import axios from 'axios';
import { Student, ClassItem, PagedResponse, CreateStudentRequest } from '../types/academic';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const academicApi = {
  getStudents: async (params?: { search?: string; classId?: string; sectionId?: string; page?: number; pageSize?: number }) => {
    const response = await api.get<PagedResponse<Student>>('/students', { params });
    return response.data;
  },

  createStudent: async (student: CreateStudentRequest) => {
    const response = await api.post<Student>('/students', student);
    return response.data;
  },

  getClasses: async () => {
    const response = await api.get<ClassItem[]>('/classes');
    return response.data;
  },
};
