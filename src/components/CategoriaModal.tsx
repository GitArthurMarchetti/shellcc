import React, { useState, useEffect } from 'react';
import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog";
import { Category } from '../types/patrimony';

interface CategoriaModalProps {
     isOpen: boolean;
     onClose: () => void;
     onSubmit: (data: { name: string; default_devaluation: number }) => void;
     category?: Category;
     roomId: number;
}

export default function CategoriaModal({ isOpen, onClose, onSubmit, category, roomId }: CategoriaModalProps) {
     const [formData, setFormData] = useState({
          name: '',
          default_devaluation: '',
     });

     useEffect(() => {
          if (category) {
               setFormData({
                    name: category.name,
                    default_devaluation: category.default_devaluation.toString(),
               });
          } else {
               setFormData({
                    name: '',
                    default_devaluation: '',
               });
          }
     }, [category]);

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          onSubmit({
               name: formData.name,
               default_devaluation: Number(formData.default_devaluation),
          });
     };

     return (
          <Dialog open={isOpen} key={roomId} onOpenChange={onClose}>
               <DialogContent className="bg-[#171B34] text-white">
                    <DialogHeader>
                         <DialogTitle className="text-2xl flex justify-between items-center">
                              <span>{category ? 'Editar' : 'Nova'} Categoria</span>
                         </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="mt-4">
                         <div className="space-y-4">
                              <div>
                                   <label className="block mb-1">Nome da Categoria</label>
                                   <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full p-2 bg-transparent border border-dashed border-white rounded"
                                        required
                                   />
                              </div>

                              <div>
                                   <label className="block mb-1">Taxa de Depreciação Padrão (%)</label>
                                   <input
                                        type="number"
                                        value={formData.default_devaluation}
                                        onChange={(e) => setFormData(prev => ({ ...prev, default_devaluation: e.target.value }))}
                                        className="w-full p-2 bg-transparent border border-dashed border-white rounded"
                                        required
                                        min="0"
                                        max="100"
                                   />
                              </div>

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
                                        {category ? 'Salvar' : 'Criar'}
                                   </button>
                              </div>
                         </div>
                    </form>
               </DialogContent>
          </Dialog>
     );
}