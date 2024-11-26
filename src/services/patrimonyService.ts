// src/services/patrimonyService.ts

import axios from 'axios';
import { Category, CreatePatrimonyData, Patrimony, PatrimonyExpense } from '../types/patrimony';

const API_URL = 'http://localhost:3000/api';

export class PatrimonyService {
     constructor(private token: string) { }

     private getHeaders() {
          return {
               headers: { Authorization: `Bearer ${this.token}` }
          };
     }

     // Categorias
     async createCategory(data: { name: string; default_devaluation: number; room_id: number }): Promise<Category> {
          const response = await axios.post(`${API_URL}/patrimonies/categories`, data, this.getHeaders());
          return response.data;
     }

     async updateCategory(id: number, data: { name: string; default_devaluation: number }): Promise<Category> {
          const response = await axios.put(`${API_URL}/patrimonies/categories/${id}`, data, this.getHeaders());
          return response.data;
     }

     async deleteCategory(id: number): Promise<void> {
          await axios.delete(`${API_URL}/patrimonies/categories/${id}`, this.getHeaders());
     }

     async getCategories(roomId: number): Promise<Category[]> {
          const response = await axios.get(
               `http://localhost:3000/api/patrimonies/categories/${roomId}`,
               this.getHeaders()
          );
          return response.data;
     }
     // Patrimônios
     async createPatrimony(data: CreatePatrimonyData): Promise<Patrimony> {
          const response = await axios.post(`${API_URL}/patrimonies`, data, this.getHeaders());
          return response.data;
     }

     async updatePatrimony(id: number, data: Partial<CreatePatrimonyData>): Promise<Patrimony> {
          const response = await axios.put(`${API_URL}/patrimonies/${id}`, data, this.getHeaders());
          return response.data;
     }

     async deletePatrimony(id: number): Promise<void> {
          await axios.delete(`${API_URL}/patrimonies/${id}`, this.getHeaders());
     }

     async getPatrimoniesByCategory(categoryId: number): Promise<Patrimony[]> {
          const response = await axios.get(`${API_URL}/patrimonies/category/${categoryId}`, this.getHeaders());
          return response.data;
     }

     // Gastos
     async addExpense(patrimonyId: number, data: { description: string; value: number; date: string }): Promise<PatrimonyExpense> {
          const response = await axios.post(`${API_URL}/patrimonies/${patrimonyId}/expenses`, data, this.getHeaders());
          return response.data;
     }

     async getExpenses(patrimonyId: number): Promise<PatrimonyExpense[]> {
          const response = await axios.get(`${API_URL}/patrimonies/${patrimonyId}/expenses`, this.getHeaders());
          return response.data;
     }
}