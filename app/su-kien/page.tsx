"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ChevronRight, Menu, Calendar, User, ChevronDown } from "lucide-react";

export default function EventsPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const newsList = [
    {
      id: 1,
      title: "BẠN ĐÃ LÁI THỬ VF7 CHƯA?",
      date: "Tháng Mười Hai 11, 2023 at 2:15 sáng",
      excerpt: 'BẠN ĐÃ LÁI THỬ VF7 CHƯA ? Nếu chưa " ĐĂNG KÝ " ngay để trải nghiệm chương trình tại lái thử VF7 tại Tp Vinh trong tháng 12 này. Đăng ký ngay: https://s.net.vn/EMo7 Chương trình đặt cọc diễn ra từ 02/12-30/12/2023. Mức cọc là 50tr đồng. Giảm ngay 30 triệu đồng Miễn phí sạc [...]',
      img: "/news/imgi_21_1.jpg"
    },
    {
      id: 2,
      title: "Triển lãm VinFast – Vĩ Tương Lai Xanh Tại Thành phố Vinh, Nghệ An",
      date: "Tháng Chín 7, 2023 at 3:16 sáng",
      excerpt: 'Hành trình của chuỗi triển lãm “VinFast – Vì tương lai xanh” sẽ đến trạm dừng chân tiếp theo tại Tp Vinh – Nghệ An – Quê hương Bác Hồ Đăng Ký Tham Gia: https://s.net.vn/o2b1 √ Địa điểm: Trung tâm hội chợ triển lãm Thành phố Vinh. Địa chỉ : Số 01, đường Trường Thi, [...]',
      img: "/news/imgi_26_5.jpg"
    },
    {
      id: 3,
      title: "SỰ KIỆN MỞ BÁN & TƯ VẤN Ô TÔ ĐIỆN VINFAST VF e34 TẠI DIỄN CHÂU",
      date: "Tháng Tư 6, 2021 at 2:25 sáng",
      excerpt: "SỰ KIỆN MỞ BÁN & TƯ VẤN Ô TÔ ĐIỆN VINFAST VF e34 TẠI DIỄN CHÂU =========== Địa điểm: ?????? ????????? ?????? – Khối 6, TT. Diễn Châu , Nghệ An. Thời gian: 7h30 – 17h30, Thứ 7 ngày ??/??/????. ====== Kính mời Quý khách tới tham gia sự kiện để nhận những ưu đãi [...]",
      img: "/news/imgi_23_1.jpg"
    }
  ];

  const sidebarCars = [
    { name: "VF 5", price: "529.000.000 VNĐ", img: "/car/imgi_10_3-2.png" },
    { name: "VF 6", price: "689.000.000 VNĐ", img: "/car/imgi_11_4.png" },
    { name: "MIRAGE", price: "Giá: VNĐ", img: "/news/imgi_20_vf-wild-ban-tai.png" }, // fallback image
    { name: "VF 8", price: "1.019.000.000 VNĐ", img: "/car/imgi_13_6.png" },
    { name: "VF 9", price: "1.499.000.000 VNĐ", img: "/car/imgi_14_7.png" },
  ];

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

              <Link href="/su-kien" className="text-[#c8102e] hover:text-[#c8102e] transition-colors py-2">Sự kiện</Link>
              <Link href="/dang-ky-lai-thu" className="hover:text-[#c8102e] transition-colors py-2">Đăng ký lái thử</Link>
              <Link href="/su-kien" className="hover:text-[#c8102e] transition-colors py-2">Ưu đãi</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Banner Breadcrumb */}
      <div className="relative w-full h-[200px] sm:h-[300px] overflow-hidden bg-black flex flex-col justify-center items-center md:items-start text-white">
        <img src="/baner/imgi_6_1.jpg" alt="Banner" className="absolute top-0 left-0 w-full h-full object-cover opacity-50" />
        <div className="relative z-10 max-w-[1200px] w-full mx-auto px-4 flex flex-col md:flex-row justify-between items-center mt-12 md:mt-24">
           <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-2 md:mb-0">TIN TỨC</h1>
           <div className="text-sm tracking-widest uppercase">
             <Link href="/" className="hover:text-red-400">Trang chủ</Link> <span className="mx-2">»</span> SỰ KIỆN
           </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main List */}
          <div className="w-full lg:w-2/3">
             <div className="space-y-10">
                {newsList.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 border-b border-gray-200 pb-10">
                     <Link href="/chi-tiet-bai-viet" className="w-full sm:w-1/3 shrink-0 h-48 block overflow-hidden border border-gray-200">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                     </Link>
                     <div className="w-full sm:w-2/3">
                        <Link href="/chi-tiet-bai-viet" className="text-xl font-bold text-[#00529b] hover:text-[#c8102e] transition-colors block mb-2 leading-tight">
                           {item.title}
                        </Link>
                        <div className="flex items-center text-sm text-gray-500 mb-4 gap-2">
                           <Calendar size={14} /> <span>{item.date}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3">
                           {item.excerpt}
                        </p>
                        <Link href="/chi-tiet-bai-viet" className="inline-flex items-center bg-[#c8102e] text-white px-5 py-2 font-bold text-sm hover:bg-red-800 transition-colors">
                           Xem thêm <span className="ml-2 bg-black/20 p-1 flex items-center justify-center -mr-3 -my-2 ml-4 h-[36px] w-[36px]"><ChevronRight size={16} /></span>
                        </Link>
                     </div>
                  </div>
                ))}
             </div>
             
             {/* Pagination */}
             <div className="flex items-center gap-2 mt-10 text-sm">
                <span className="font-bold text-black border-b-2 border-black px-1">1</span>
                <Link href="#" className="text-gray-500 hover:text-black px-1">2</Link>
                <Link href="#" className="text-gray-500 hover:text-black px-1">3</Link>
                <Link href="#" className="text-gray-500 hover:text-black px-1 ml-2">Next</Link>
             </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
             {/* Tư vấn online */}
             <div className="mb-12">
               <h3 className="text-xl font-bold uppercase mb-4 border-b-2 border-gray-200 pb-2 relative">
                 TƯ VẤN ONLINE
                 <span className="absolute bottom-[-2px] left-0 w-16 h-[2px] bg-[#c8102e]"></span>
               </h3>
               <div className="flex items-start gap-4">
                 <div className="w-20 h-20 rounded-full border border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                    <User size={40} className="text-gray-400" />
                 </div>
                 <div className="space-y-3 mt-1">
                   <div className="flex items-center gap-2 font-bold text-lg text-[#c8102e]">
                     <Phone size={18} className="fill-current" /> <a href="https://zalo.me/0961194881">0961.194.881</a>
                   </div>
                   <div className="flex items-center gap-2 text-gray-700 text-sm">
                     <span className="bg-blue-500 text-white rounded-full p-0.5"><MessageCircle size={12} /></span> Zalo: 0961.194.881
                   </div>
                   <div className="flex items-center gap-2 text-gray-700 text-sm">
                     <span className="bg-[#3b5998] text-white p-0.5 rounded-sm"><FacebookIcon size={12} className="fill-current" /></span> Kích vào để chat
                   </div>
                   <div className="flex items-center gap-2 text-gray-700 text-sm">
                     <Mail size={14} /> dinhtoanvf@gmail.com
                   </div>
                 </div>
               </div>
             </div>

             {/* Xe Nổi Bật */}
             <div>
               <h3 className="text-xl font-bold uppercase mb-4 border-b-2 border-gray-200 pb-2 relative">
                 XE NỔI BẬT
                 <span className="absolute bottom-[-2px] left-0 w-16 h-[2px] bg-[#c8102e]"></span>
               </h3>
               <div className="space-y-4">
                 {sidebarCars.map((car, idx) => (
                   <div key={idx} className="flex items-center gap-4 border-b border-gray-100 pb-4">
                      <div className="w-24 h-16 shrink-0 flex items-center justify-center overflow-hidden">
                         <img src={car.img} alt={car.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                         <Link href="/chi-tiet-xe" className="font-bold text-black uppercase hover:text-[#c8102e] block mb-1">
                            {car.name}
                         </Link>
                         <div className="text-[13px] text-gray-700 border-l-2 border-[#c8102e] pl-2">
                           {car.price}
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-gray-300 py-16 border-t-[5px] border-[#c8102e]">
        {/* ... same footer ... */}
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
              {['Tải Brochure', 'Yêu Cầu Tư Vấn', 'Tải Bảng Giá Phụ Tùng'].map((item) => (
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

function MessageCircle({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
  );
}

function FacebookIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  );
}
