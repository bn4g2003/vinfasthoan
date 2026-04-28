"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ChevronRight, Menu, ChevronLeft, Calendar, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const banners = [
    "/baner/imgi_4_4.jpg",
    "/baner/imgi_5_2.jpg",
    "/baner/imgi_6_1.jpg",
    "/baner/imgi_7_3.jpg",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentCars, setCurrentCars] = useState<any[]>([]);
  const [serviceCars, setServiceCars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const { data: carsData, error } = await supabase
        .from('cars')
        .select(`
          *,
          car_categories (
            name,
            slug
          )
        `);

      if (error) throw error;

      if (carsData && carsData.length > 0) {
        // Có dữ liệu từ DB
        const hienDai = carsData.filter(c => c.car_categories?.slug === 'xe-hien-dai');
        const dichVu = carsData.filter(c => c.car_categories?.slug === 'xe-dich-vu');

        setCurrentCars(hienDai.map(c => ({
          name: c.name,
          price: c.price,
          img: c.main_image,
          desc: c.short_description,
          isContact: c.is_contact,
          slug: c.slug
        })));

        setServiceCars(dichVu.map(c => ({
          name: c.name,
          price: c.price,
          img: c.main_image,
          desc: c.short_description,
          isContact: c.is_contact,
          slug: c.slug
        })));
      } else {
        // Fallback tĩnh nếu chưa có DB
        loadStaticData();
      }
    } catch (error) {
      console.error("Lỗi khi fetch data từ Supabase:", error);
      loadStaticData(); // Fallback nếu có lỗi
    } finally {
      setIsLoading(false);
    }
  };

  const loadStaticData = () => {
    setCurrentCars([
      { name: "VF 3", price: "235.000.000 VNĐ", img: "/car/imgi_9_1.png", desc: "Mẫu SUV điện cỡ nhỏ đầu tiên, thiết kế cá tính, nhỏ gọn và tiện dụng cho đô thị.", slug: "vf-3" },
      { name: "VF 5", price: "468.000.000 VNĐ", img: "/car/imgi_10_3-2.png", desc: "Trải nghiệm lái phấn khích cùng thiết kế thời thượng hướng tới tương lai.", slug: "vf-5" },
      { name: "VF 6", price: "675.000.000 VNĐ", img: "/car/imgi_11_4.png", desc: "Kiệt tác nghệ thuật với thiết kế hiện đại, tinh tế cùng công nghệ tiên tiến.", slug: "vf-6" },
      { name: "VF 7", price: "850.000.000 VNĐ", img: "/car/imgi_12_5.png", desc: "Đỉnh cao thiết kế mang cảm hứng vũ trụ phi đối xứng, uy dũng và sang trọng.", slug: "vf-7" },
      { name: "VF 8", price: "1.079.000.000 VNĐ", img: "/car/imgi_13_6.png", desc: "SUV cỡ trung mạnh mẽ, thông minh, mang lại trải nghiệm đẳng cấp toàn cầu.", slug: "vf-8" },
      { name: "VF 9", price: "1.499.000.000 VNĐ", img: "/car/imgi_14_7.png", desc: "Tuyệt tác SUV Full-size cao cấp nhất, khẳng định vị thế và quyền uy người dùng.", slug: "vf-9" },
    ]);

    setServiceCars([
      { name: "VinFast Minio Green", price: "250.000.000 VNĐ", img: "/car/imgi_15_Minio-green-mau-bac-540x282.png", desc: "Dòng xe dịch vụ xanh, tiết kiệm năng lượng tối đa.", slug: "vinfast-minio-green" },
      { name: "VinFast Herio Green", price: "499.000.000 VNĐ", img: "/car/imgi_16_Herio-Green-mau-vang-540x282.png", desc: "Giải pháp vận tải thông minh cho môi trường đô thị hiện đại.", slug: "vinfast-herio-green" },
      { name: "VinFast Nerio Green", price: "508.000.000 VNĐ", img: "/car/imgi_17_Nerio-Green-mau-do-540x282-1.png", desc: "Không gian rộng rãi, vận hành êm ái, thân thiện với môi trường.", slug: "vinfast-nerio-green" },
      { name: "VinFast Limo Green", price: "749.000.000 VNĐ", img: "/car/imgi_18_Limo-Green-mau-vang-540x282.png", desc: "Dịch vụ vận tải cao cấp chuẩn Limousine không phát thải.", slug: "vinfast-limo-green" },
      { name: "VinFast EC Van", price: "289.000.000 VNĐ", img: "/car/imgi_19_3-9-e1749183878376-2.jpg", desc: "Tối ưu hóa không gian chở hàng, giải pháp logistics xanh.", slug: "vinfast-ec-van" },
      { name: "VinFast Wild", price: "Liên Hệ", img: "/news/imgi_20_vf-wild-ban-tai.png", desc: "Sức mạnh vượt trội, chinh phục mọi địa hình với công nghệ thuần điện.", isContact: true, slug: "vinfast-wild" },
    ]);
  };

  useEffect(() => {
    fetchCars();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length);
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);

  const news = [
    { img: "/news/imgi_21_1.jpg", title: "VINFAST CHÍNH THỨC NHẬN ĐẶT CỌC DÒNG XE VF 5 PLUS TẠI THỊ TRƯỜNG VIỆT NAM" },
    { img: "/news/imgi_23_1.jpg", title: "VINFAST VF 7 CHÍNH THỨC NHẬN ĐẶT HÀNG TỪ NGÀY 02/12" },
    { img: "/news/imgi_24_z6030656124576_21079383d4ca1577cab231771bdd1f0d.jpg", title: "THU CŨ ĐỔI MỚI CÙNG FGF - TỰ HÀO THƯƠNG HIỆU VIỆT" },
    { img: "/news/imgi_26_5.jpg", title: "VINFAST ƯU ĐÃI LỚN CHO KHÁCH HÀNG TẠI VIỆT NAM NHÂN DỊP CUỐI NĂM" }
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
                  {currentCars.map(car => (
                    <Link key={car.slug || car.name} href={`/chi-tiet-xe/${car.slug || ''}`} className="text-white hover:bg-white/20 px-4 py-3 border-b border-white/10 text-[14px] font-normal">{car.name}</Link>
                  ))}
                  {serviceCars.map(car => (
                    <Link key={car.slug || car.name} href={`/chi-tiet-xe/${car.slug || ''}`} className="text-white hover:bg-white/20 px-4 py-3 border-b border-white/10 text-[14px] font-normal">{car.name}</Link>
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

      {/* Banner */}
      <div className="relative w-full overflow-hidden bg-[#0F172A] h-[300px] sm:h-[400px] md:h-[550px] lg:h-[650px] group">
        {banners.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Banner ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out ${
              index === currentBanner ? "opacity-100 z-10 scale-105" : "opacity-0 z-0 scale-100"
            }`}
          />
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-[#E11D48] text-white w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-[#E11D48] text-white w-12 h-12 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${index === currentBanner ? "w-8 bg-[#E11D48]" : "w-2.5 bg-white/50 hover:bg-white"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Section 1: CÁC DÒNG XE VINFAST HIỆN NAY */}
      <section className="bg-[#F8FAFC] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#0F172A] uppercase mb-4 tracking-tight">
              Các Dòng Xe VinFast Hiện Nay
            </h2>
            <div className="w-20 h-[3px] bg-[#E11D48] mx-auto rounded-full mb-6"></div>
            <p className="text-[#334155] text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">
              Khám phá bộ sưu tập xe điện thông minh đẳng cấp từ VinFast, mang đến trải nghiệm lái vượt trội và hướng tới tương lai di chuyển xanh.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E11D48]"></div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentCars.map((car, index) => (
                <div key={index} className="bg-white rounded-[16px] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100">
                  <Link href={`/chi-tiet-xe/${car.slug || ''}`} className="w-full h-72 bg-white flex items-center justify-center p-2 relative overflow-hidden group-hover:bg-gray-50 transition-colors cursor-pointer">
                    <img src={car.img} alt={car.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-md" />
                  </Link>
                  <div className="p-8 flex flex-col flex-1 border-t border-gray-50">
                    <h3 className="text-[22px] font-bold text-[#0F172A] mb-3 uppercase tracking-wide">{car.name}</h3>
                    <p className="text-[#334155] text-[15px] mb-6 line-clamp-2 leading-relaxed">{car.desc}</p>
                    <div className="mt-auto">
                      <p className="text-[#334155] text-[14px] mb-1 font-medium uppercase tracking-wider text-gray-500">Giá bán từ</p>
                      <p className="text-[20px] font-bold text-[#E11D48] mb-8">{car.price}</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href={`/chi-tiet-xe/${car.slug || ''}`} className="w-full text-center bg-[#E11D48] hover:bg-rose-700 text-white py-3 rounded-lg text-[15px] font-bold transition-all shadow-md hover:shadow-lg">
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 2: CÁC DÒNG XE DỊCH VỤ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#0F172A] uppercase mb-4 tracking-tight">
              Các Dòng Xe Dịch Vụ
            </h2>
            <div className="w-20 h-[3px] bg-[#E11D48] mx-auto rounded-full mb-6"></div>
            <p className="text-[#334155] text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed">
              Giải pháp vận tải thông minh, tiết kiệm và thân thiện với môi trường dành riêng cho doanh nghiệp.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E11D48]"></div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCars.map((car, index) => (
                <div key={index} className="bg-white rounded-[16px] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-200">
                  <Link href={`/chi-tiet-xe/${car.slug || ''}`} className="w-full h-72 bg-gray-50 flex items-center justify-center p-2 relative overflow-hidden">
                    <img src={car.img} alt={car.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-sm" />
                  </Link>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-[20px] font-bold text-[#0F172A] mb-3 uppercase tracking-wide">{car.name}</h3>
                    <p className="text-[#334155] text-[15px] mb-6 line-clamp-2 leading-relaxed">{car.desc}</p>
                    <div className="mt-auto">
                      <p className="text-[#334155] text-[14px] mb-1 font-medium uppercase tracking-wider text-gray-500">Giá bán từ</p>
                      <p className="text-[20px] font-bold text-[#E11D48] mb-8">{car.price}</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href={`/chi-tiet-xe/${car.slug || ''}`} className="w-full text-center bg-[#0F172A] hover:bg-slate-800 text-white py-3 rounded-lg text-[15px] font-bold transition-all shadow-md">
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section 3: TIN TỨC VÀ SỰ KIỆN */}
      <section className="bg-[#F8FAFC] py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#0F172A] uppercase mb-4 tracking-tight">
                Tin Tức & Sự Kiện
              </h2>
              <div className="w-20 h-[3px] bg-[#E11D48] rounded-full"></div>
            </div>
            <Link href="/su-kien" className="inline-flex items-center gap-2 text-[#E11D48] font-bold text-[16px] hover:text-rose-800 transition-colors">
              Xem tất cả <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {news.map((item, index) => (
              <Link href="/chi-tiet-bai-viet" key={index} className="bg-white rounded-[16px] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group block border border-gray-100">
                <div className="h-48 overflow-hidden relative">
                  <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-[#E11D48] text-white text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    Tin tức
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-3 font-medium">
                    <Calendar size={14} /> <span>11 Th12, 2023</span>
                  </div>
                  <h4 className="text-[16px] font-bold text-[#0F172A] mb-4 group-hover:text-[#E11D48] transition-colors line-clamp-3 leading-snug">
                    {item.title}
                  </h4>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <span className="text-[#E11D48] font-bold text-[14px] flex items-center gap-1 group-hover:gap-3 transition-all uppercase tracking-wide">
                      Đọc tiếp <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
              {currentCars.map((car) => (
                <li key={car.slug || car.name}>
                  <Link href={`/chi-tiet-xe/${car.slug || ''}`} className="flex items-center gap-2 hover:text-[#E11D48] transition-colors group">
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-[#E11D48] transition-colors" /> {car.name}
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
              {['Bảng giá lắp đặt', 'Chính sách bảo hành', 'Câu hỏi thường gặp'].map((item) => (
                <li key={item}>
                  <Link href="#" className="flex items-center gap-2 hover:text-[#E11D48] transition-colors group">
                    <ChevronRight size={14} className="text-slate-500 group-hover:text-[#E11D48] transition-colors" /> {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/brochure" className="flex items-center gap-2 hover:text-[#E11D48] transition-colors group">
                  <ChevronRight size={14} className="text-slate-500 group-hover:text-[#E11D48] transition-colors" /> Tải Brochure
                </Link>
              </li>
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
            <div className="w-full h-32 bg-slate-800 rounded-lg overflow-hidden mt-4 relative group cursor-pointer border border-slate-700">
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <span className="bg-white text-[#0F172A] px-4 py-2 rounded-full font-bold text-sm">Xem bản đồ</span>
              </div>
              <img src="/baner/imgi_4_4.jpg" className="w-full h-full object-cover opacity-50" alt="Map Placeholder" />
            </div>
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
