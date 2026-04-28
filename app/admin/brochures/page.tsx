'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit, FileText, Download } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function BrochuresList() {
  const [brochures, setBrochures] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBrochures();
  }, []);

  const fetchBrochures = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('brochures')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBrochures(data || []);
    } catch (err) {
      console.error("Lỗi fetch brochure:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBrochure = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa brochure này?")) return;
    try {
      const { error } = await supabase
        .from('brochures')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchBrochures();
    } catch (err) {
      alert("Lỗi xóa brochure");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Brochure</h1>
        <Link 
          href="/admin/brochures/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={20} /> Thêm mới
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Hình ảnh</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Tên sản phẩm</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Dung lượng</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Ngày tạo</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500 font-bold">Đang tải dữ liệu...</td></tr>
              ) : brochures.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500 font-bold">Chưa có brochure nào.</td></tr>
              ) : (
                brochures.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-10 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-contain" />
                        ) : (
                          <FileText size={20} className="text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-black uppercase">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-bold">
                      {item.file_size || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <a 
                          href={item.file_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Tải về xem thử"
                        >
                          <Download size={18} />
                        </a>
                        <Link 
                          href={`/admin/brochures/${item.id}`}
                          className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => deleteBrochure(item.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
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
    </div>
  );
}
