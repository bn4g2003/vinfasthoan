'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function CarsManagementPage() {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select(`*, car_categories(name)`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa xe này? Tất cả dữ liệu liên quan cũng sẽ bị xóa.')) return;
    
    try {
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;
      alert('Xóa thành công!');
      fetchCars();
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
      alert('Đã có lỗi xảy ra khi xóa!');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Danh sách xe</h2>
        <Link
          href="/admin/cars/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          Thêm xe mới
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-semibold">
              <th className="py-3 px-6">Hình ảnh</th>
              <th className="py-3 px-6">Tên xe</th>
              <th className="py-3 px-6">Danh mục</th>
              <th className="py-3 px-6">Giá</th>
              <th className="py-3 px-6 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cars.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  Chưa có xe nào. Hãy thêm xe mới!
                </td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50">
                  <td className="py-3 px-6">
                    {car.main_image ? (
                      <img src={car.main_image} alt={car.name} className="w-16 h-10 object-contain bg-gray-100 rounded" />
                    ) : (
                      <div className="w-16 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">Trống</div>
                    )}
                  </td>
                  <td className="py-3 px-6 font-medium text-gray-900">{car.name}</td>
                  <td className="py-3 px-6 text-gray-600">{car.car_categories?.name || 'Chưa phân loại'}</td>
                  <td className="py-3 px-6 text-gray-600">{car.is_contact ? 'Liên Hệ' : car.price}</td>
                  <td className="py-3 px-6">
                    <div className="flex items-center justify-center gap-3">
                      <Link href={`/admin/cars/${car.id}`} className="text-blue-600 hover:text-blue-800 transition-colors" title="Sửa">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => handleDelete(car.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Xóa">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
