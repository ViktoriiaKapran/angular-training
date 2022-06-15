import { Painting } from "./painting";

export class PaintingResponse {
  painting: Painting;
  success: boolean;
  errorMessage: string;
}