export const urlToFile = async (
  url: string,
  filename: string
): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new File([blob], filename, { type: blob.type });
};

export const urlsToFiles = async (urls: string[]): Promise<File[]> => {
  const files = await Promise.all(urls.map(url => urlToFile(url, url)));

  return files;
};

export const generatePhotoPreview = (
  source: File | string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (typeof source === 'string') {
      resolve(source);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(source);
  });
};

export const generatePhotosPreviews = async (
  sources: (File | string)[]
): Promise<string[]> => {
  return Promise.all(sources.map(generatePhotoPreview));
};
