'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, CheckCircle, Clock, XCircle, Search } from "lucide-react";

export default function RegistrationsAdmin() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('lead_registrations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setRegistrations(data || []);
    } catch (err) {
      console.error("Lỗi fetch liên hệ:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('lead_registrations')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw error;
      fetchRegistrations();
    } catch (err) {
      alert("Lỗi cập nhật trạng thái");
    }
  };

  const deleteRegistration = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa yêu cầu này?")) return;
    try {
      const { error } = await supabase
        .from('lead_registrations')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchRegistrations();
    } catch (err) {
      alert("Lỗi xóa yêu cầu");
    }
  };

  const filteredRegistrations = registrations.filter(r => 
    r.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.phone?.includes(searchTerm) ||
    r.car_model?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Đã liên hệ':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><CheckCircle size={12}/> Đã liên hệ</span>;
      case 'Hủy':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><XCircle size={12}/> Đã hủy</span>;
      default:
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit"><Clock size={12}/> Mới</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý liên hệ & Đăng ký</h1>
        <div className="relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
           <input 
             type="text" 
             placeholder="Tìm tên, SĐT, dòng xe..." 
             className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Ngày đăng ký</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Khách hàng</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Liên hệ</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Loại yêu cầu</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Dòng xe</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600">Trạng thái</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-500">Đang tải dữ liệu...</td></tr>
              ) : filteredRegistrations.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-500">Chưa có yêu cầu nào.</td></tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(reg.created_at).toLocaleString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{reg.full_name}</div>
                      <div className="text-xs text-gray-500">{reg.address}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-blue-600">{reg.phone}</div>
                      <div className="text-xs text-gray-500">{reg.email}</div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${reg.type === 'Lái thử' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>
                         {reg.type}
                       </span>
                       {reg.has_license === 'Không' && <div className="text-[10px] text-red-500 mt-1 font-bold italic">(Chưa có bằng lái)</div>}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-700">
                      {reg.car_model}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(reg.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <select 
                          className="text-xs border rounded px-1 py-1 focus:outline-none"
                          value={reg.status}
                          onChange={(e) => updateStatus(reg.id, e.target.value)}
                        >
                          <option value="Mới">Mới</option>
                          <option value="Đã liên hệ">Đã liên hệ</option>
                          <option value="Hủy">Hủy</option>
                        </select>
                        <button 
                          onClick={() => deleteRegistration(reg.id)}
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
