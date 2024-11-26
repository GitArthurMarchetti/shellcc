import React, { useState, useEffect } from 'react';
import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import {
     LineChart,
     Line,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     ResponsiveContainer
} from 'recharts';

interface AddPatrimonioProps {
     isOpen: boolean;
     onClose: () => void;
     categoria?: string;
     depreciacaoPadrao?: number;
     onSubmit?: (data: {
          name: string;
          description: string;
          code: string;
          location: string;
          initial_value: number;
          lifespan: number;
          devaluation_rate: number;
          purchase_date: string;
     }) => void;
}

export default function AddPatrimonio({
     isOpen,
     onClose,
     categoria = "",
     depreciacaoPadrao = 0,
     onSubmit
}: AddPatrimonioProps) {
     const [formData, setFormData] = useState({
          name: '',
          description: '',
          code: '',
          location: '',
          initial_value: '',
          lifespan: '',
          devaluation_rate: depreciacaoPadrao.toString(),
          purchase_date: new Date().toISOString().split('T')[0]
     });

     const [chartData, setChartData] = useState<Array<{ name: string; value: number }>>([]);

     useEffect(() => {
          if (depreciacaoPadrao) {
               setFormData(prev => ({
                    ...prev,
                    devaluation_rate: depreciacaoPadrao.toString()
               }));
          }
     }, [depreciacaoPadrao]);

     const updateChartData = () => {
          const devalRate = Number(formData.devaluation_rate) / 100;
          const initialValue = Number(formData.initial_value);

          if (isNaN(devalRate) || isNaN(initialValue)) return;

          const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
               'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

          const newData = months.map((month, index) => ({
               name: month,
               value: initialValue * Math.pow(1 - devalRate, index / 12)
          }));

          setChartData(newData);
     };

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setFormData(prev => ({ ...prev, [name]: value }));

          if (name === 'initial_value' || name === 'devaluation_rate') {
               updateChartData();
          }
     };

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          if (onSubmit) {
               onSubmit({
                    name: formData.name,
                    description: formData.description,
                    code: formData.code,
                    location: formData.location,
                    initial_value: Number(formData.initial_value),
                    lifespan: Number(formData.lifespan),
                    devaluation_rate: Number(formData.devaluation_rate),
                    purchase_date: formData.purchase_date
               });
          }
          // Log dos dados sendo enviados
          console.log("Dados do patrimônio sendo enviados:", formData);
     };

     return (
          <Dialog open={isOpen} onOpenChange={onClose}>
               <DialogContent className="bg-[#171B34] text-white max-w-2xl">
                    <DialogHeader>
                         <DialogTitle className="text-2xl flex justify-between items-center">
                              <span>Adicionar à categoria: {categoria || 'Patrimônio'}</span>
                              <X className="cursor-pointer hover:text-gray-400" onClick={onClose} />
                         </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="mt-4">
                         <div className="space-y-4">
                              <div>
                                   <label className="block mb-1">Nome do Patrimônio</label>
                                   <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-transparent border border-white border-dashed rounded"
                                        required
                                   />
                              </div>

                              <div>
                                   <label className="block mb-1">Descrição</label>
                                   <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-transparent border border-white border-dashed rounded h-24 resize-none"
                                   />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                   <div>
                                        <label className="block mb-1">Código</label>
                                        <input
                                             type="text"
                                             name="code"
                                             value={formData.code}
                                             onChange={handleInputChange}
                                             className="w-full p-2 bg-transparent border border-white border-dashed rounded"
                                             required
                                        />
                                   </div>
                                   <div>
                                        <label className="block mb-1">Localização</label>
                                        <input
                                             type="text"
                                             name="location"
                                             value={formData.location}
                                             onChange={handleInputChange}
                                             className="w-full p-2 bg-transparent border border-white border-dashed rounded"
                                             required
                                        />
                                   </div>
                              </div>

                              <div className="grid grid-cols-3 gap-4">
                                   <div>
                                        <label className="block mb-1">Valor inicial</label>
                                        <input
                                             type="number"
                                             name="initial_value"
                                             value={formData.initial_value}
                                             onChange={handleInputChange}
                                             className="w-full p-2 bg-transparent border border-white border-dashed rounded"
                                             required
                                             min="0"
                                             step="0.01"
                                        />
                                   </div>
                                   <div>
                                        <label className="block mb-1">Vida útil (anos)</label>
                                        <input
                                             type="number"
                                             name="lifespan"
                                             value={formData.lifespan}
                                             onChange={handleInputChange}
                                             className="w-full p-2 bg-transparent border border-white border-dashed rounded"
                                             required
                                             min="1"
                                             max="50"
                                        />
                                   </div>
                                   <div>
                                        <label className="block mb-1">% Desvalorização</label>
                                        <input
                                             type="number"
                                             name="devaluation_rate"
                                             value={formData.devaluation_rate}
                                             onChange={handleInputChange}
                                             className="w-full p-2 bg-transparent border border-white border-dashed rounded"
                                             required
                                             min="0"
                                             max="100"
                                        />
                                   </div>
                              </div>

                              <div>
                                   <label className="block mb-1">Data de Aquisição</label>
                                   <input
                                        type="date"
                                        name="purchase_date"
                                        value={formData.purchase_date}
                                        onChange={handleInputChange}
                                        className="w-full p-2 bg-transparent border border-white border-dashed rounded"
                                        required
                                   />
                              </div>

                              {(formData.initial_value && formData.devaluation_rate) && (
                                   <div className="h-64 mt-4">
                                        <p className="text-lg mb-2">Previsão de Desvalorização</p>
                                        <ResponsiveContainer width="100%" height="100%">
                                             <LineChart data={chartData}>
                                                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                                  <XAxis dataKey="name" stroke="#fff" />
                                                  <YAxis stroke="#fff" />
                                                  <Tooltip
                                                       contentStyle={{ backgroundColor: '#171B34', border: '1px solid white' }}
                                                       labelStyle={{ color: 'white' }}
                                                       formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Valor']}
                                                  />
                                                  <Line
                                                       type="monotone"
                                                       dataKey="value"
                                                       stroke="#0CC17A"
                                                       strokeWidth={2}
                                                  />
                                             </LineChart>
                                        </ResponsiveContainer>
                                   </div>
                              )}

                              <div className="flex justify-end gap-4 mt-6">
                                   <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-6 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors"
                                   >
                                        Cancelar
                                   </button>
                                   <button
                                        type="submit"
                                        className="px-6 py-2 bg-green-500 rounded hover:bg-green-600 transition-colors"
                                   >
                                        Criar
                                   </button>
                              </div>
                         </div>
                    </form>
               </DialogContent>
          </Dialog>
     );
}