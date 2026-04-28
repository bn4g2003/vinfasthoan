"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, ChevronRight, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CarDetail() {
  const { slug } = useParams();
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Data states
  const [carData, setCarData] = useState<any>(null);
  const [colors, setColors] = useState<any[]>([]);
  const [detailBlocks, setDetailBlocks] = useState<any[]>([]);
  const [specs, setSpecs] = useState<any[]>([]);
  const [allCars, setAllCars] = useState<any[]>([]); // Cho menu "XE NỔI BẬT"

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        if (!slug) return;

        // Fetch thông tin xe
        const { data: car, error: carError } = await supabase
          .from('cars')
          .select('*')
          .eq('slug', slug)
          .single();

        if (carError || !car) {
          // Fallback tĩnh nếu không tìm thấy (để UI không chết)
          loadStaticData();
          return;
        }

        setCarData(car);

        // Fetch colors
        const { data: colorData } = await supabase
          .from('car_colors')
          .select('*')
          .eq('car_id', car.id)
          .order('sort_order', { ascending: true });
        
        if (colorData && colorData.length > 0) {
          setColors(colorData);
        } else {
          // Fallback màu
          setColors([
             { color_name: "Mặc định", hex_code: "#d1d5db", image_url: car.main_image || "/chi tiết xe/xe theo mau/imgi_4_z5423562096141_871c1d73895398d6b5d4d60c867d9a0b.jpg" }
          ]);
        }

        // Fetch chi tiết đan xen
        const { data: blocks } = await supabase
          .from('car_detail_blocks')
          .select('*')
          .eq('car_id', car.id)
          .order('sort_order', { ascending: true });
        
        if (blocks && blocks.length > 0) {
          setDetailBlocks(blocks);
        }

        // Fetch thông số
        const { data: specData } = await supabase
          .from('car_specifications')
          .select('*')
          .eq('car_id', car.id)
          .order('sort_order', { ascending: true });
        
        if (specData && specData.length > 0) {
          setSpecs(specData);
        }

        // Fetch all cars cho menu
        const { data: all } = await supabase.from('cars').select('name, slug');
        if (all) setAllCars(all);

      } catch (error) {
        console.error("Lỗi fetch chi tiết xe:", error);
        loadStaticData();
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetail();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const loadStaticData = () => {
    // Tạm thời nếu DB trống thì hiện data cũ
    setCarData({
      name: "VINFAST VF 3",
      price: "235.000.000 VNĐ",
      general_description: "Mẫu xe điện cỡ nhỏ tiên phong của VinFast mang đậm cá tính, thiết kế năng động và cực kỳ tiện dụng. Với ngoại hình mạnh mẽ cùng khả năng di chuyển linh hoạt trong đô thị, VF 3 hứa hẹn sẽ trở thành mẫu xe quốc dân mới của người Việt."
    });
    setColors([
      { color_name: "Màu 1", hex_code: "#d1d5db", image_url: "/chi tiết xe/xe theo mau/imgi_4_z5423562096141_871c1d73895398d6b5d4d60c867d9a0b.jpg" },
      { color_name: "Màu 2", hex_code: "#fbbf24", image_url: "/chi tiết xe/xe theo mau/imgi_5_z5423562165419_948c075aa982cd110626688de87c9f68.jpg" },
      { color_name: "Màu 3", hex_code: "#3b82f6", image_url: "/chi tiết xe/xe theo mau/imgi_6_z5423562243183_bc4148cc0bb9acb826d7abe1fa74db35.jpg" },
    ]);
    setDetailBlocks([
      { block_type: 'image', content: '/chi tiết xe/chi tiết xe/imgi_12_vf3-1.jpg' },
      { block_type: 'image', content: '/chi tiết xe/chi tiết xe/imgi_13_vf3-2.jpg' },
      { block_type: 'image', content: '/chi tiết xe/chi tiết xe/imgi_14_vf3-3.jpg' }
    ]);
    setSpecs([
      { image_url: '/chi tiết xe/thông số xe/imgi_19_TSKT-VF-3-3-scaled.jpg' }
    ]);
    setAllCars([
      { name: 'VF 3', slug: 'vf-3' }, { name: 'VF 5', slug: 'vf-5' }, { name: 'VF 6', slug: 'vf-6' }
    ]);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c8102e]"></div></div>;
  }

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
                  {allCars.map(c => (
                    <Link key={c.slug} href={`/chi-tiet-xe/${c.slug}`} className="text-white hover:bg-white/20 px-4 py-3 border-b border-white/10 text-[14px] font-normal">{c.name}</Link>
                  ))}
                </div>
              </div>

              <Link href="/su-kien" className="hover:text-[#c8102e] transition-colors py-2">Sự kiện</Link>
              <Link href="/dang-ky-lai-thu" className="hover:text-[#c8102e] transition-colors py-2">Đăng ký lái thử</Link>
              <Link href="/su-kien" className="hover:text-[#c8102e] transition-colors py-2">Ưu đãi</Link>
              <Link href="/brochure" className="hover:text-[#c8102e] transition-colors py-2">Brochure</Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Content */}
      <main className="max-w-[1200px] mx-auto px-4 py-16">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8 uppercase tracking-widest font-bold">
            <Link href="/" className="hover:text-[#c8102e]">Trang chủ</Link> <span className="mx-2">/</span>
            <span className="text-black">{carData?.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="border border-gray-200 p-4">
            <img src={colors[selectedColor]?.image_url} alt={`Xe ${carData?.name}`} className="w-full h-auto object-contain" />
            <div className="flex justify-center gap-4 mt-6 pb-4 flex-wrap">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  title={color.color_name}
                  className={`w-10 h-10 rounded-full border-[3px] transition-transform ${selectedColor === index ? 'border-[#c8102e] scale-110 shadow-md' : 'border-gray-200 hover:scale-105'}`}
                  style={{ backgroundColor: color.hex_code }}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold uppercase mb-4 text-black">{carData?.name}</h1>
            <div className="w-16 h-[2px] bg-[#c8102e] mb-6"></div>
            <p className="text-2xl font-bold text-[#c8102e] mb-6">
              {carData?.is_contact ? 'Liên Hệ' : `Giá từ: ${carData?.price}`}
            </p>
            <div className="text-gray-800 mb-8 text-lg leading-relaxed whitespace-pre-wrap">
              {carData?.general_description}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <button onClick={() => setShowModal(true)} className="bg-[#c8102e] border-2 border-[#c8102e] text-white px-8 py-3.5 font-bold uppercase text-[15px] hover:bg-red-800 hover:border-red-800 transition">
                Nhận thông tin tư vấn
              </button>
              <a href="https://zalo.me/0961194881" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-black text-black px-8 py-3.5 font-bold uppercase text-[15px] hover:bg-black hover:text-white transition flex items-center justify-center gap-2">
                <Phone size={18} /> Liên hệ Zalo
              </a>
            </div>
          </div>
        </div>

        {/* Scroll down description and details */}
        {detailBlocks.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold uppercase mb-3">CHI TIẾT XE</h2>
              <div className="w-16 h-[2px] bg-[#c8102e] mx-auto"></div>
            </div>
            <div className="space-y-8 flex flex-col items-center">
               {detailBlocks.map((block, idx) => {
                 if (block.block_type === 'image') {
                   return <img key={idx} src={block.content} className="w-full max-w-5xl mx-auto border border-gray-200 shadow-sm" />;
                 } else if (block.block_type === 'text') {
                   return <div key={idx} className="w-full max-w-5xl mx-auto text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{block.content}</div>;
                 }
                 return null;
               })}
            </div>
          </div>
        )}
        
        {specs.length > 0 && (
          <div className="mt-24 mb-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold uppercase mb-3">THÔNG SỐ KỸ THUẬT</h2>
              <div className="w-16 h-[2px] bg-[#c8102e] mx-auto"></div>
            </div>
            <div className="space-y-8">
               {specs.map((spec, idx) => (
                 <img key={idx} src={spec.image_url} className="w-full max-w-5xl mx-auto border border-gray-200 shadow-sm" />
               ))}
            </div>
          </div>
        )}
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
              {allCars.map((car) => (
                <li key={car.slug} className="flex items-center gap-2 hover:text-[#c8102e] cursor-pointer transition-colors">
                  <Link href={`/chi-tiet-xe/${car.slug}`} className="flex items-center gap-2 w-full">
                    <ChevronRight size={14} className="text-gray-500" /> {car.name}
                  </Link>
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
              {['Trả góp ưu đãi', 'Đăng ký lái thử', 'Chính sách bảo hành'].map((item) => (
                <li key={item} className="flex items-center gap-2 hover:text-[#c8102e] cursor-pointer transition-colors border-b border-gray-700 pb-2">
                  <ChevronRight size={14} className="text-gray-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </footer>

      {/* Floating Action Button */}
      <a href="https://zalo.me/0961194881" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 left-6 z-50 flex items-center group cursor-pointer">
        <div className="bg-[#c8102e] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10">
          <Phone size={24} className="fill-current" />
        </div>
        <div className="bg-[#c8102e] text-white font-bold px-4 py-2 rounded-r-full -ml-4 pr-6 shadow-lg transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          0961.194.881
        </div>
      </a>
      
      {/* Bottom right support button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-black text-white px-5 py-2.5 shadow-lg font-bold flex items-center gap-2 hover:bg-[#333] transition-colors border border-gray-700 uppercase text-sm">
          Hỗ trợ <Menu size={16} />
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white p-8 max-w-md w-full relative shadow-2xl border-t-4 border-[#c8102e]">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors">
              <X size={28} />
            </button>
            <h3 className="text-2xl font-bold uppercase mb-2 text-center text-black">Nhận thông tin</h3>
            <div className="w-12 h-1 bg-[#c8102e] mx-auto mb-6"></div>
            <form className="space-y-4 text-left">
              <div>
                <label className="block text-[15px] font-bold text-gray-800 mb-1">Họ và tên *</label>
                <input type="text" className="w-full border border-gray-300 p-2.5 text-[15px] focus:border-[#c8102e] focus:outline-none" placeholder="Nhập họ và tên của bạn" />
              </div>
              <div>
                <label className="block text-[15px] font-bold text-gray-800 mb-1">Số điện thoại *</label>
                <input type="text" className="w-full border border-gray-300 p-2.5 text-[15px] focus:border-[#c8102e] focus:outline-none" placeholder="Nhập số điện thoại" />
              </div>
              <div>
                <label className="block text-[15px] font-bold text-gray-800 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 p-2.5 text-[15px] focus:border-[#c8102e] focus:outline-none" placeholder="Nhập email" />
              </div>
              <div>
                <label className="block text-[15px] font-bold text-gray-800 mb-1">Nội dung tư vấn</label>
                <textarea className="w-full border border-gray-300 p-2.5 text-[15px] h-24 focus:border-[#c8102e] focus:outline-none" placeholder="Dòng xe bạn đang quan tâm..." defaultValue={carData?.name}></textarea>
              </div>
              <button type="button" onClick={() => {alert("Gửi thông tin thành công! Chúng tôi sẽ sớm liên hệ lại."); setShowModal(false)}} className="w-full bg-[#c8102e] text-white py-3 font-bold uppercase text-[15px] mt-2 hover:bg-red-800 transition">
                Gửi thông tin
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
