export type GalleryFilterImageChooserOptions<T> = Array<{
  active: any;
  inactive: any;
  label: string;
  name: keyof T;
}>;
