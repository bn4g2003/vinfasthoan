'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function PostsManagementPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`*, post_categories(name)`)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài viết này?')) return;
    
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
      alert('Xóa thành công!');
      fetchPosts();
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
      alert('Đã có lỗi xảy ra khi xóa!');
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Danh sách bài viết</h2>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          Thêm bài viết mới
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-semibold">
              <th className="py-3 px-6">Ảnh bìa</th>
              <th className="py-3 px-6">Tiêu đề</th>
              <th className="py-3 px-6">Loại</th>
              <th className="py-3 px-6">Ngày tạo</th>
              <th className="py-3 px-6 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  Chưa có bài viết nào.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="py-3 px-6">
                    {post.cover_image ? (
                      <img src={post.cover_image} alt={post.title} className="w-16 h-10 object-cover bg-gray-100 rounded" />
                    ) : (
                      <div className="w-16 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">Trống</div>
                    )}
                  </td>
                  <td className="py-3 px-6 font-medium text-gray-900 max-w-xs truncate">{post.title}</td>
                  <td className="py-3 px-6 text-gray-600">{post.post_categories?.name || 'Chưa phân loại'}</td>
                  <td className="py-3 px-6 text-gray-600 text-sm">
                    {new Date(post.created_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex items-center justify-center gap-3">
                      <Link href={`/admin/posts/${post.id}`} className="text-blue-600 hover:text-blue-800 transition-colors" title="Sửa">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Xóa">
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
  );
}
