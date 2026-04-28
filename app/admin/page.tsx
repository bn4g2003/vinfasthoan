'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [carCount, setCarCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: cCount } = await supabase.from('cars').select('*', { count: 'exact', head: true });
      const { count: pCount } = await supabase.from('posts').select('*', { count: 'exact', head: true });
      setCarCount(cCount || 0);
      setPostCount(pCount || 0);
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8">Đang tải...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 uppercase">Tổng số xe</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{carCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 uppercase">Bài viết / Tin tức</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{postCount}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Tổng quan hệ thống</h1>
        <p className="text-gray-600">
          Chào mừng bạn đến với trang quản trị. Vui lòng chọn mục "Quản lý xe" bên menu trái để thêm, sửa, xóa thông tin xe.
        </p>
      </div>
    </div>
  );
}
