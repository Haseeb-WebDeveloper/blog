'use client';

import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  const handleImageUpload = async (blobInfo: any) => {
    try {
      const base64 = blobInfo.base64();
      const response = await uploadToCloudinary(base64);
      return response.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const apiKey = process.env.TINYMCE_API_KEY || '0yjhs49kdhknwm2or3apawddwfxc3ptzu9y964f7cdvspjdh';

  if (!apiKey) {
    throw new Error('TINYMCE_API_KEY is not set in the environment variables');
  }

  return (
    <TinyMCEEditor
      apiKey={apiKey}
      value={value}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | image | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        images_upload_handler: handleImageUpload,
        automatic_uploads: true,
      }}
      onEditorChange={onChange}
    />
  );
} 