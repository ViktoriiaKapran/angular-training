import { Painting } from "./painting";

export class PaintingsResponse {
  paintings: Painting[];
  count: number;
  totalPages: number;
  currentPage: number;
  success: boolean;
  errorMessage: string;
}