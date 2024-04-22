import { ImageUpload } from "./ImageUpload";
import { Department } from "./department";

export class Doctor {
  doctorId!: number;
  name!: string;
  specialization!: string;
  contactNo!: number;
  email!: string;
  schedule?: string;
  image?: string;
  shift!: string;
  departmentID?: number;
  department!: Department;
  imagePath: string = '';

  imageUpload: ImageUpload = new ImageUpload();
}
export enum ShiftType {
  Morning = 0,
  Evening = 1,
  Night = 2
}
