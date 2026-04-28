'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewCarPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageMode, setImageMode] = useState<'upload' | 'link'>('upload');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_id: '',
    price: '',
    is_contact: false,
    short_description: '',
    main_image_link: '',
    general_description: '',
  });

  const fetchCategories = async () => {
    let { data } = await supabase.from('car_categories').select('*');
    
    // Tự động tạo 2 danh mục mặc định nếu chưa có gì trong Database
    if (!data || data.length === 0) {
      const defaultCategories = [
        { name: 'Các Dòng Xe VinFast Hiện Nay', slug: 'xe-hien-dai' },
        { name: 'Các Dòng Xe Dịch Vụ', slug: 'xe-dich-vu' }
      ];
      
      const { data: insertedData, error } = await supabase
        .from('car_categories')
        .insert(defaultCategories)
        .select();
        
      if (!error && insertedData) {
        data = insertedData;
      }
    }
    
    if (data) {
      setCategories(data);
      // Tự động chọn danh mục đầu tiên
      if (data.length > 0 && !formData.category_id) {
        setFormData(prev => ({ ...prev, category_id: data[0].id }));
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, main_image_link: '' })); // Clear link if file selected
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `cars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('anh')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Lỗi upload ảnh: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from('anh').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.main_image_link;

      if (imageMode === 'upload' && imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      const finalSlug = formData.slug || formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

      const { error } = await supabase.from('cars').insert([
        {
          name: formData.name,
          slug: finalSlug,
          category_id: formData.category_id || null,
          price: formData.price,
          is_contact: formData.is_contact,
          short_description: formData.short_description,
          main_image: finalImageUrl,
          general_description: formData.general_description,
        }
      ]);

      if (error) throw error;
      
      alert('Thêm xe thành công!');
      router.push('/admin/cars');
    } catch (error: any) {
      console.error('Error adding car:', error);
      alert('Có lỗi xảy ra: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Thêm xe mới</h2>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Tên xe *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="VD: VF 3"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Slug (Đường dẫn)</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="VD: vf-3 (Để trống sẽ tự tạo)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Danh mục hiển thị *</label>
              <select
                name="category_id"
                required
                value={formData.category_id}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">-- Chọn danh mục hiển thị --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Giá xe *</label>
              <input
                type="text"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="VD: 235.000.000 VNĐ"
                disabled={formData.is_contact}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <input
              type="checkbox"
              id="is_contact"
              name="is_contact"
              checked={formData.is_contact}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 border-gray-400 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_contact" className="text-sm font-bold text-gray-800 cursor-pointer">
              Chỉ hiển thị nút "Liên Hệ" (Không hiện giá tiền)
            </label>
          </div>

          <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-bold text-gray-800">Ảnh đại diện (Card trang chủ)</label>
              <div className="flex bg-white rounded-lg border border-gray-300 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`px-4 py-1.5 text-sm font-bold ${imageMode === 'upload' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Tải từ máy
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('link')}
                  className={`px-4 py-1.5 text-sm font-bold border-l border-gray-300 ${imageMode === 'link' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Dán link web
                </button>
              </div>
            </div>

            {imageMode === 'upload' ? (
              <div className="mt-1">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-700"><span className="font-bold">Nhấn để tải ảnh lên</span> hoặc kéo thả</p>
                    <p className="text-xs text-gray-500 font-medium">PNG, JPG, JPEG, WEBP</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {imagePreview && (
                  <div className="mt-4 relative inline-block">
                    <img src={imagePreview} alt="Preview" className="h-32 object-contain rounded-lg border border-gray-300 shadow-md bg-white p-1" />
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(''); }}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-700 shadow-lg font-bold"
                    >
                      &times;
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-1">
                <input
                  type="text"
                  name="main_image_link"
                  value={formData.main_image_link}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Dán đường dẫn ảnh (VD: https://domain.com/anh.jpg)..."
                />
                {formData.main_image_link && (
                  <div className="mt-4">
                    <img src={formData.main_image_link} alt="Preview Link" className="h-32 object-contain rounded-lg border border-gray-300 shadow-md bg-white p-1" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Mô tả ngắn (Card trang chủ)</label>
            <textarea
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nhập mô tả ngắn..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Mô tả tổng quan (Trang chi tiết)</label>
            <textarea
              name="general_description"
              value={formData.general_description}
              onChange={handleChange}
              rows={5}
              className="w-full border border-gray-400 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nhập mô tả chi tiết..."
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-300">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-bold transition-colors disabled:opacity-50 text-lg shadow-md"
            >
              {loading ? 'Đang xử lý...' : 'Lưu thông tin'}
            </button>
            <Link
              href="/admin/cars"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-bold transition-colors text-lg"
            >
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
