"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ChevronRight, Menu, Send, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function TestDriveRegistrationPage() {
  const [formData, setFormData] = useState({
    carType: "",
    fullName: "",
    address: "",
    phone: "",
    hasLicense: "Không",
    notes: ""
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [carModels, setCarModels] = useState<any[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await supabase.from('cars').select('name').order('name');
      if (data) {
        setCarModels(data);
        if (data.length > 0) setFormData(prev => ({ ...prev, carType: data[0].name }));
      }
    };
    fetchCars();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Vui lòng nhập đầy đủ họ tên và số điện thoại.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('lead_registrations').insert([
        {
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          car_model: formData.carType,
          type: 'Lái thử',
          has_license: formData.hasLicense,
          notes: formData.notes,
          status: 'Mới'
        }
      ]);

      if (error) throw error;

      alert("Đăng ký lái thử thành công! Chúng tôi sẽ sớm liên hệ với bạn.");
      setFormData({
        carType: "VF 3",
        fullName: "",
        address: "",
        phone: "",
        hasLicense: "Không",
        notes: ""
      });
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-300 sticky top-0 z-50 shadow-md transition-all duration-300">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className={`flex justify-end items-center py-2 text-xs text-gray-700 gap-6 border-b border-gray-200 hidden md:flex transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0 py-0 border-none opacity-0' : 'h-10'}`}>
            <a href="https://zalo.me/0961194881" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-bold hover:opacity-80 transition-opacity">
              <Phone size={14} className="text-[#c8102e] fill-current" />
              <span className="text-[#c8102e]">0961.194.881</span>
            </a>
            <div className="flex items-center gap-1.5">
              <Mail size={14} className="text-[#c8102e]" />
              <span>vinfastnghean1@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#c8102e] text-white px-1.5 py-0.5 text-[11px] font-bold">FB</div>
              <div className="bg-[#c8102e] text-white px-1.5 py-0.5 text-[11px] font-bold">YT</div>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <Link href="/" className="flex items-center gap-4">
              <div className="relative w-12 h-12">
                <Image src="/logo/imgi_1_r3.png" fill alt="Vinfast Logo" className="object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold uppercase tracking-wide text-black">Vinfast Hoàn</h1>
              </div>
            </Link>
            <div className="md:hidden">
               <Menu size={28} className="text-black" />
            </div>
            <nav className="hidden md:flex items-center gap-8 text-[14px] font-bold text-black uppercase tracking-wider">
              <Link href="/" className="hover:text-[#c8102e] transition-colors py-2">Trang chủ</Link>
              
              <div className="group relative py-2 cursor-pointer">
                <span className="hover:text-[#c8102e] transition-colors flex items-center gap-1">Sản phẩm</span>
                <div className="absolute top-full left-0 bg-[#e08e0b] min-w-[220px] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col">
                  {['VinFast VF 3', 'VinFast VF 5', 'VinFast VF 6', 'VinFast VF 7', 'VinFast VF 8', 'VinFast VF 9', 'VinFast Minio Green', 'VinFast Herio Green', 'VinFast Nerio Green', 'VinFast Limo Green', 'VinFast EC Van', 'VinFast Wild'].map(car => (
                    <Link key={car} href="/chi-tiet-xe" className="text-white hover:bg-white/20 px-4 py-3 border-b border-white/10 text-[14px] font-normal">{car}</Link>
                  ))}
                </div>
              </div>

              <Link href="/su-kien" className="hover:text-[#c8102e] transition-colors py-2">Sự kiện</Link>
              <Link href="/dang-ky-lai-thu" className="text-[#c8102e] hover:text-[#c8102e] transition-colors py-2">Đăng ký lái thử</Link>
              <Link href="/su-kien" className="hover:text-[#c8102e] transition-colors py-2">Ưu đãi</Link>
              <Link href="/brochure" className="hover:text-[#c8102e] transition-colors py-2">Brochure</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content - Form */}
      <main className="max-w-[800px] mx-auto px-4 py-16">
         <p className="text-[#c8102e] italic font-bold text-center mb-10 text-[15px]">
            Ghi chú: Chương trình lái thử xe chỉ dành cho những khách hàng đã có bằng lái xe ô tô.
         </p>

         <form onSubmit={handleSubmit} className="space-y-6">
            {/* Loại xe */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
               <label className="sm:w-48 font-bold text-black text-[15px]">Loại xe</label>
               <div className="flex-1 flex items-center gap-2">
                 <select 
                   className="flex-1 border border-gray-400 p-2.5 text-[15px] text-black font-medium focus:outline-none focus:border-[#c8102e] appearance-none bg-white"
                   value={formData.carType}
                   onChange={(e) => setFormData({...formData, carType: e.target.value})}
                 >
                    {carModels.map((car, idx) => (
                      <option key={idx} value={car.name}>{car.name}</option>
                    ))}
                 </select>
                 <span className="text-[#c8102e] font-bold">*</span>
               </div>
            </div>

            {/* Tên khách hàng */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
               <label className="sm:w-48 font-bold text-black text-[15px]">Tên khách hàng</label>
               <div className="flex-1 flex items-center gap-2">
                 <input 
                   type="text" 
                   placeholder="Họ và tên đầy đủ"
                   className="flex-1 border border-gray-400 p-2.5 text-[15px] text-black font-medium focus:outline-none focus:border-[#c8102e] placeholder:text-gray-500"
                   value={formData.fullName}
                   onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                 />
                 <span className="text-transparent">*</span> {/* spacer */}
               </div>
            </div>

            {/* Địa chỉ */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
               <label className="sm:w-48 font-bold text-black text-[15px]">Địa chỉ</label>
               <div className="flex-1 flex items-center gap-2">
                 <input 
                   type="text" 
                   placeholder="Địa chỉ"
                   className="flex-1 border border-gray-400 p-2.5 text-[15px] text-black font-medium focus:outline-none focus:border-[#c8102e] placeholder:text-gray-500"
                   value={formData.address}
                   onChange={(e) => setFormData({...formData, address: e.target.value})}
                 />
                 <span className="text-transparent">*</span>
               </div>
            </div>

            {/* Điện thoại di động */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
               <label className="sm:w-48 font-bold text-black text-[15px]">Điện thoại di động</label>
               <div className="flex-1 flex items-center gap-2">
                 <input 
                   type="tel" 
                   placeholder="Ví dụ: 0912588888"
                   required
                   className="flex-1 border border-gray-400 p-2.5 text-[15px] text-black font-medium focus:outline-none focus:border-[#c8102e] placeholder:text-gray-500"
                   value={formData.phone}
                   onChange={(e) => setFormData({...formData, phone: e.target.value})}
                 />
                 <span className="text-[#c8102e] font-bold">*</span>
               </div>
            </div>

            {/* Bằng lái xe */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
               <label className="sm:w-48 font-bold text-black text-[15px]">Bằng lái xe</label>
               <div className="flex-1 flex items-center gap-8 pl-2">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="license" 
                      value="Có"
                      checked={formData.hasLicense === "Có"}
                      onChange={(e) => setFormData({...formData, hasLicense: e.target.value})}
                      className="accent-blue-500 w-4 h-4"
                    />
                    <span className="text-[15px]">Có</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="license" 
                      value="Không"
                      checked={formData.hasLicense === "Không"}
                      onChange={(e) => setFormData({...formData, hasLicense: e.target.value})}
                      className="accent-blue-500 w-4 h-4"
                    />
                    <span className="text-[15px]">Không</span>
                 </label>
               </div>
            </div>

            {/* Ghi chú */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-8">
               <label className="sm:w-48 font-bold text-black text-[15px] sm:mt-2">Ghi chú</label>
               <div className="flex-1 flex items-start gap-2">
                 <textarea 
                   className="flex-1 border border-gray-400 p-2.5 text-[15px] text-black font-medium min-h-[120px] focus:outline-none focus:border-[#c8102e] placeholder:text-gray-500"
                   placeholder="Ghi chú thêm (nếu có)"
                   value={formData.notes}
                   onChange={(e) => setFormData({...formData, notes: e.target.value})}
                 ></textarea>
                 <span className="text-transparent">*</span>
               </div>
            </div>

            {/* Required notice & Submit Button */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 pt-4">
               <div className="sm:w-48"></div>
               <div className="flex-1">
                  <p className="text-[#c8102e] italic font-bold text-[14px] mb-4">
                    Xin vui lòng điền đầy đủ thông tin được đánh dấu hoa thị (*).
                  </p>
                  <button type="submit" disabled={isSubmitting} className="flex items-stretch overflow-hidden group disabled:opacity-50">
                     <span className="bg-black text-white font-bold text-[13px] uppercase px-5 py-2.5 group-hover:bg-gray-800 transition-colors">
                        {isSubmitting ? "Đang gửi..." : "Gửi đăng ký"}
                     </span>
                     <span className="bg-[#c8102e] text-white px-3 flex items-center justify-center group-hover:bg-red-800 transition-colors">
                        <Send size={14} className="-ml-1" />
                     </span>
                  </button>
               </div>
            </div>
         </form>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-300 py-16 border-t-[5px] border-[#c8102e]">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1 */}
          <div>
            <h3 className="text-white font-bold text-[18px] uppercase mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-500"></span>
              LIÊN HỆ VỚI CHÚNG TÔI
            </h3>
            <p className="font-bold text-white mb-4 text-[16px]">Đại lý Ô Tô VinFast Hoàn</p>
            <ul className="space-y-4 text-[15px]">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-400 mt-1" />
                <span>Tầng 1, Chung Cư A1, Phường Quang Trung, TP. Vinh, Nghệ An</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gray-400" />
                <span>Hotline: <a href="https://zalo.me/0961194881" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#c8102e] transition-colors font-bold">0961.194.881</a></span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gray-400" />
                <span>vinfastnghean1@gmail.com</span>
              </li>
            </ul>
          </div>
          {/* Col 2 */}
          <div>
            <h3 className="text-white font-bold text-[18px] uppercase mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-500"></span>
              XE NỔI BẬT
            </h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-[15px]">
              {['VF 3', 'VF 5', 'VF 6', 'VF 7', 'VF 8', 'VF 9'].map((car) => (
                <li key={car} className="flex items-center gap-2 hover:text-[#c8102e] cursor-pointer transition-colors">
                  <ChevronRight size={14} className="text-gray-500" /> {car}
                </li>
              ))}
            </ul>
          </div>
          {/* Col 3 */}
          <div>
            <h3 className="text-white font-bold text-[18px] uppercase mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-500"></span>
              HỖ TRỢ MUA HÀNG
            </h3>
            <ul className="space-y-3 text-[15px]">
              <li className="border-b border-gray-700 pb-2">
                <Link href="/brochure" className="flex items-center gap-2 hover:text-[#c8102e] transition-colors">
                  <ChevronRight size={14} className="text-gray-500" /> Tải Brochure
                </Link>
              </li>
              {['Yêu Cầu Tư Vấn', 'Tải Bảng Giá Phụ Tùng'].map((item) => (
                <li key={item} className="flex items-center gap-2 hover:text-[#c8102e] cursor-pointer transition-colors border-b border-gray-700 pb-2">
                  <ChevronRight size={14} className="text-gray-500" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
