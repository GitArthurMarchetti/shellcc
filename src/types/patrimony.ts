// src/types/patrimony.ts

export interface Patrimony {
     id: number;
     name: string;
     description: string;
     code: string;
     location: string;
     initial_value: number | string; // Pode vir como string do banco
     current_value: number | string; // Pode vir como string do banco
     lifespan: number;
     devaluation_rate: number;
     purchase_date: string;
     category_id: number;
     room_id: number;
     created_at: string;
     updated_at: string;
     category_name?: string;
     default_devaluation?: number;
}

export interface CreatePatrimonyData {
     name: string;
     description: string;
     code: string;
     location: string;
     initial_value: number;
     lifespan: number;
     devaluation_rate: number;
     category_id: number;
     room_id: number;
     purchase_date: string;
}

export interface PatrimonyExpense {
     id: number;
     patrimony_id: number;
     description: string;
     value: number;
     date: string;
     created_at: string;
}