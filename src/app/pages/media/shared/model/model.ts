export interface MediaCart {
  id?: number | null;
  name?: string | null;
  count?: number | null;
  rental_period?: string | null;
  publisher_name?: string | null;
  price?: number | null;
}

export interface Media {
  author?: string | null;
  category?: Category[] | null;
  duration?: string | null;
  encrypt_info?: string | null;
  encrypt_key?: string | null;
  file_size?: number | null;
  format_type?: string | null;
  id?: number | null;
  image?: Image[] | null;
  is_active?: boolean | null;
  isbn?: string | null;
  main_category?: string | null;
  max_preview?: number | null;
  media_type?: string | null;
  name?: string | null;
  name_backup?: string | null;
  name_encrypt?: string | null;
  number_of_download?: number | null;
  preview_url?: string | null;
  price?: number | null;
  publisher?: number | null;
  publisher_name?: string | null;
  release_date?: string | null;
  thumbnail?: string | null;
  url?: string | null;
}

export interface BorrowMedia {
  expired_date?: string | null;
  id?: number | null;
  is_active?: boolean | null;
  is_renew?: boolean | null;
  media?: Media | null;
  number_of_download?: number | null;
  quantity?: number | null;
  rental_period?: any | null;
}

export interface Category {
  id?: string;
  name?: string;
}

export interface Image {
  id?: number | null;
  image?: string | null;
  media?: number | null;
  thumbnail?: string | null;
}
