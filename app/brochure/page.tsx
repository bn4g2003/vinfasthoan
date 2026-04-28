"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ChevronRight, Menu, Download, FileText, ArrowRight, User, MessageCircle } from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function BrochurePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [brochures, setBrochures] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from('brochures')
          .select('*')
          .order('created_at', { ascending: false });
        if (data) setBrochures(data);
      } catch (error) {
        console.error("Lỗi fetch brochure:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
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
              <Link href="/dang-ky-lai-thu" className="hover:text-[#c8102e] transition-colors py-2">Đăng ký lái thử</Link>
              <Link href="/su-kien" className="hover:text-[#c8102e] transition-colors py-2">Ưu đãi</Link>
              <Link href="/brochure" className="text-[#c8102e] hover:text-[#c8102e] transition-colors py-2">Brochure</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Banner Breadcrumb */}
      <div className="relative w-full h-[250px] sm:h-[350px] overflow-hidden bg-[#0F172A] flex flex-col justify-center items-center text-white">
        <img src="/baner/imgi_5_2.jpg" alt="Banner" className="absolute top-0 left-0 w-full h-full object-cover opacity-40 scale-105" />
        <div className="relative z-10 max-w-[1200px] w-full mx-auto px-4 text-center">
           <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 animate-fade-in-up">TẢI BROCHURE</h1>
           <div className="flex items-center justify-center gap-3 text-sm tracking-widest uppercase font-bold text-slate-300">
             <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link> 
             <ChevronRight size={14} className="text-slate-500" /> 
             <span className="text-[#E11D48]">Brochure</span>
           </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-[1200px] mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#0F172A] uppercase mb-4 tracking-tight">
            Tài Liệu Sản Phẩm
          </h2>
          <div className="w-20 h-[3px] bg-[#E11D48] mx-auto rounded-full mb-6"></div>
          <p className="text-[#334155] text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">
            Tải về brochure chi tiết để khám phá thông số kỹ thuật, tính năng thông minh và các tùy chọn màu sắc của các dòng xe VinFast.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {brochures.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col group border border-slate-100">
              <div className="relative h-56 bg-slate-50 flex items-center justify-center p-6 overflow-hidden">
                <img 
                  src={item.image_url || "/logo/imgi_1_r3.png"} 
                  alt={item.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-xl" 
                />
                <div className="absolute inset-0 bg-[#0F172A]/0 group-hover:bg-[#0F172A]/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <div className="bg-white text-[#0F172A] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <FileText size={24} />
                   </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[#0F172A] mb-2 uppercase tracking-wide group-hover:text-[#E11D48] transition-colors">{item.name}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                  <FileText size={14} /> <span>PDF Document • {item.file_size || 'N/A'}</span>
                </div>
                <a 
                  href={item.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto w-full flex items-center justify-center gap-2 bg-[#0F172A] group-hover:bg-[#E11D48] text-white py-3.5 rounded-xl font-bold transition-all shadow-md active:scale-95"
                >
                  <Download size={18} /> Tải Brochure
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mt-32 bg-[#0F172A] rounded-[32px] p-8 md:p-16 relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-600/20 to-transparent pointer-events-none"></div>
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center lg:text-left">
                 <h2 className="text-3xl md:text-4xl font-bold mb-6">Bạn cần thêm thông tin?</h2>
                 <p className="text-slate-400 text-lg leading-relaxed mb-8">
                   Đội ngũ chuyên viên của VinFast Hoàn luôn sẵn sàng hỗ trợ giải đáp mọi thắc mắc của bạn về sản phẩm và chính sách ưu đãi.
                 </p>
                 <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <a href="https://zalo.me/0961194881" className="bg-[#E11D48] hover:bg-rose-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg flex items-center gap-2">
                       <Phone size={20} /> Gọi ngay: 0961.194.881
                    </a>
                    <Link href="/dang-ky-lai-thu" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2">
                       Đăng ký lái thử <ArrowRight size={20} />
                    </Link>
                 </div>
              </div>
              <div className="w-full lg:w-1/3 aspect-square max-w-[300px] relative">
                 <div className="absolute inset-0 bg-[#E11D48] rounded-full blur-[80px] opacity-20 animate-pulse"></div>
                 <img src="/logo/imgi_1_r3.png" alt="VinFast Logo" className="w-full h-full object-contain relative z-10 animate-bounce-slow" />
              </div>
           </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-slate-300 py-16 md:py-24 border-t-4 border-[#E11D48]">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Col 1: Company */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-[20px] uppercase tracking-wide">VINFAST VINH</h3>
            <div className="w-12 h-1 bg-[#E11D48]"></div>
            <p className="text-[15px] leading-relaxed text-slate-400">
              Đại lý ủy quyền chính thức của VinFast tại Nghệ An. Chúng tôi cam kết mang đến những sản phẩm chất lượng và dịch vụ hậu mãi vượt trội.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#E11D48] transition-colors text-white">
                <FacebookIcon size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#E11D48] transition-colors text-white">
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-[18px] uppercase tracking-wide">SẢN PHẨM MỚI</h3>
            <div className="w-12 h-1 bg-[#E11D48]"></div>
            <ul className="space-y-3 text-[15px]">
              {['VinFast VF 3', 'VinFast VF 5', 'VinFast VF 6', 'VinFast VF 7', 'VinFast VF 8', 'VinFast VF 9'].map((car) => (
                <li key={car}>
                  <Link href="/chi-tiet-xe" className="flex items-center gap-2 hover:text-[#E11D48] transition-colors group">
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-[#E11D48] transition-colors" /> {car}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Support & CTA */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-[18px] uppercase tracking-wide">HỖ TRỢ KHÁCH HÀNG</h3>
            <div className="w-12 h-1 bg-[#E11D48]"></div>
            <ul className="space-y-3 text-[15px] mb-6">
              {[
                { name: 'Bảng giá lắp đặt', href: '#' },
                { name: 'Chính sách bảo hành', href: '#' },
                { name: 'Câu hỏi thường gặp', href: '#' },
                { name: 'Tải Brochure', href: '/brochure' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="flex items-center gap-2 hover:text-[#E11D48] transition-colors group">
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-[#E11D48] transition-colors" /> {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/dang-ky-lai-thu" className="inline-flex items-center justify-center w-full bg-[#E11D48] hover:bg-rose-700 text-white py-3.5 rounded-lg text-[15px] font-bold transition-all shadow-md uppercase tracking-wide">
              Đăng ký lái thử
            </Link>
          </div>

          {/* Col 4: Contact & Map */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-[18px] uppercase tracking-wide">LIÊN HỆ</h3>
            <div className="w-12 h-1 bg-[#E11D48]"></div>
            <ul className="space-y-4 text-[15px]">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin size={20} className="text-[#E11D48] shrink-0 mt-0.5" />
                <span>Tầng 1, Chung Cư A1, Phường Quang Trung, TP. Vinh, Nghệ An</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Phone size={20} className="text-[#E11D48] shrink-0" />
                <span>Hotline: <a href="https://zalo.me/0961194881" className="text-white hover:text-[#E11D48] transition-colors font-bold text-[16px]">0961.194.881</a></span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail size={20} className="text-[#E11D48] shrink-0" />
                <span>vinfastnghean1@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="max-w-[1200px] mx-auto px-4 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[14px] text-slate-500">© 2023 VinFast Hoàn. All rights reserved.</p>
          <div className="flex gap-4 text-[14px] text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</Link>
            <Link href="#" className="hover:text-white transition-colors">Chính sách bảo mật</Link>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <a href="https://zalo.me/0961194881" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 z-50 flex items-center group cursor-pointer">
        <div className="bg-[#E11D48] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl z-10 hover:bg-rose-700 transition-colors">
          <Phone size={24} className="fill-current" />
        </div>
        <div className="bg-[#E11D48] text-white font-bold px-5 py-2.5 rounded-r-full -ml-6 pr-8 shadow-xl transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out z-0">
          0961.194.881
        </div>
      </a>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(-5%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
      `}</style>
    </div>
  );
}

function FacebookIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  );
}

function YoutubeIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
  );
}
