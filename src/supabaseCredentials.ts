import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aofldsfgcmqlvwqwvazq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvZmxkc2ZnY21xbHZ3cXd2YXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNDM2NjUsImV4cCI6MjA1NzgxOTY2NX0.CNtVdA533dvCE2bjWLBwc0V7FtbbyiP-sUyELpRWKFs';
const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImage = async (
  file: File, 
  bucket: string, 
  folder: string
): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

    if (error) {
      console.error('Error al subir la imagen:', error.message);
      return null;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
    
  } catch (err) {
    console.error('Error al subir la imagen:', err);
    return null;
  }
};