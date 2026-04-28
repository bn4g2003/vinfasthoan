'use client';

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, CheckCircle, Clock, XCircle, Search, Eye, X, User, Phone, Mail, MapPin, Car, FileText } from "lucide-react";

export default function RegistrationsAdmin() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReg, setSelectedReg] = useState<any>(null);

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
             className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-black font-medium"
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
                <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-500 font-bold">Đang tải dữ liệu...</td></tr>
              ) : filteredRegistrations.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-500 font-bold">Chưa có yêu cầu nào.</td></tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                      {new Date(reg.created_at).toLocaleString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-black text-black">{reg.full_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-blue-700">{reg.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-0.5 rounded text-[11px] font-black uppercase ${reg.type === 'Lái thử' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>
                         {reg.type}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-black">
                      {reg.car_model}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(reg.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setSelectedReg(reg)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                        </button>
                        <select 
                          className="text-xs border-2 border-gray-300 rounded px-1 py-1 focus:outline-none font-black text-black bg-white"
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

      {/* Detail Modal */}
      {selectedReg && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
              <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
                 <h2 className="text-xl font-bold uppercase flex items-center gap-2">
                    <FileText size={20} /> Chi tiết yêu cầu
                 </h2>
                 <button onClick={() => setSelectedReg(null)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                    <X size={24} />
                 </button>
              </div>
              
              <div className="p-8 overflow-y-auto space-y-8">
                 {/* Khách hàng */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <div className="flex items-center gap-3 text-gray-500 font-bold uppercase text-xs tracking-wider">
                          <User size={16} /> Thông tin khách hàng
                       </div>
                       <div className="space-y-2">
                          <div className="text-2xl font-black text-black">{selectedReg.full_name}</div>
                          <div className="flex items-center gap-2 text-blue-700 font-bold">
                             <Phone size={14} /> {selectedReg.phone}
                          </div>
                          {selectedReg.email && (
                             <div className="flex items-center gap-2 text-gray-700 font-medium">
                                <Mail size={14} /> {selectedReg.email}
                             </div>
                          )}
                          {selectedReg.address && (
                             <div className="flex items-center gap-2 text-gray-700 font-medium">
                                <MapPin size={14} /> {selectedReg.address}
                             </div>
                          )}
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center gap-3 text-gray-500 font-bold uppercase text-xs tracking-wider">
                          <Car size={16} /> Thông tin xe quan tâm
                       </div>
                       <div className="space-y-2">
                          <div className="text-xl font-black text-black uppercase">{selectedReg.car_model}</div>
                          <div className="inline-block px-3 py-1 rounded bg-orange-100 text-orange-700 font-black text-xs uppercase">
                             Yêu cầu: {selectedReg.type}
                          </div>
                          {selectedReg.type === 'Lái thử' && (
                             <div className={`text-sm font-bold ${selectedReg.has_license === 'Có' ? 'text-green-600' : 'text-red-600'}`}>
                                Bằng lái ô tô: {selectedReg.has_license || 'Chưa rõ'}
                             </div>
                          )}
                       </div>
                    </div>
                 </div>

                 {/* Ghi chú */}
                 <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                       <FileText size={14} /> Nội dung / Ghi chú
                    </div>
                    <div className="text-gray-900 font-medium whitespace-pre-wrap leading-relaxed">
                       {selectedReg.notes || "Không có ghi chú thêm."}
                    </div>
                 </div>

                 <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500 font-medium italic">
                       Ngày đăng ký: {new Date(selectedReg.created_at).toLocaleString('vi-VN')}
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-sm font-bold text-gray-700">Trạng thái:</span>
                       <select 
                          className="border-2 border-gray-300 rounded-lg px-3 py-1.5 font-black text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={selectedReg.status}
                          onChange={(e) => updateStatus(selectedReg.id, e.target.value)}
                        >
                          <option value="Mới">Mới</option>
                          <option value="Đã liên hệ">Đã liên hệ</option>
                          <option value="Hủy">Hủy</option>
                        </select>
                    </div>
                 </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end">
                 <button 
                   onClick={() => setSelectedReg(null)}
                   className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                 >
                    Đóng
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
