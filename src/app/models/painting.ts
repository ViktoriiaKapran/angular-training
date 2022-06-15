export class Painting {
  id: string;
  image: Image;
  name: string;
  author: string;
  userId: string;
  genres: string[];
  height: number;
  width: number;
  price: number;
  description: string;
}

export class Image {
  name: string;
  contentType: string;
  data: string;
}