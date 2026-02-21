export interface UpsertPostFormData {
  title: string;
  mapLink: string;
  price: number;
  numberOfDays: number;
  location: {
    city?: string;
    country: string;
  };
  description: string;
  photos: File[];
  photosToDelete?: string[];
}
