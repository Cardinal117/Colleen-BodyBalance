export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: 'admin' | 'author' | 'editor';
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          color: string;
          bg_color: string;
          icon: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
      };
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          featured_image_url: string | null;
          author_id: string | null;
          category_id: string | null;
          status: 'draft' | 'published' | 'archived';
          published_at: string | null;
          read_time: string | null;
          views: number;
          likes: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['posts']['Row'], 'id' | 'created_at' | 'updated_at' | 'views' | 'likes'>;
        Update: Partial<Database['public']['Tables']['posts']['Insert']>;
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_name: string;
          author_email: string;
          content: string;
          status: 'pending' | 'approved' | 'rejected';
          likes: number;
          parent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['comments']['Row'], 'id' | 'created_at' | 'updated_at' | 'likes'>;
        Update: Partial<Database['public']['Tables']['comments']['Insert']>;
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          color: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tags']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['tags']['Insert']>;
      };
      post_tags: {
        Row: {
          post_id: string;
          tag_id: string;
        };
        Insert: Database['public']['Tables']['post_tags']['Row'];
        Update: Partial<Database['public']['Tables']['post_tags']['Row']>;
      };
      media: {
        Row: {
          id: string;
          filename: string;
          original_name: string;
          mime_type: string;
          size: number;
          url: string;
          alt_text: string | null;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['media']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['media']['Insert']>;
      };
      seo_metadata: {
        Row: {
          id: string;
          post_id: string;
          meta_title: string | null;
          meta_description: string | null;
          meta_keywords: string | null;
          og_image_url: string | null;
          canonical_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['seo_metadata']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['seo_metadata']['Insert']>;
      };
      post_analytics: {
        Row: {
          id: string;
          post_id: string;
          date: string;
          views: number;
          unique_views: number;
          read_time_average: number | null;
          bounce_rate: number | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['post_analytics']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['post_analytics']['Insert']>;
      };
      user_sessions: {
        Row: {
          id: string;
          user_id: string;
          token: string;
          expires_at: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_sessions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['user_sessions']['Insert']>;
      };
    };
  };
};