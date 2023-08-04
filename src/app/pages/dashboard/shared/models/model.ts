export interface DashBoardInput {
  year: number;
}
export interface DashBoard {
  data: {
    number_of_audio: number;
    number_of_books: number;
    number_of_videos: number;
    number_of_teachers: number;
    number_of_libraries: number;
    number_of_publishers: number;
    number_of_subscribers: number;
  };
  status: boolean;
}
