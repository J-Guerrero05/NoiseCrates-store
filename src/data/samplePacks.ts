
import { SamplePack } from "../types/types";

// Using reliable audio URLs that should work without CORS issues
const workingAudioUrls = [
  "https://www.w3schools.com/html/horse.mp3",
  "https://file-examples.com/storage/fe68c42fa66da49de35cde6/2017/11/file_example_MP3_700KB.mp3",
  "https://file-examples.com/storage/fe68c42fa66da49de35cde6/2017/11/file_example_MP3_1MG.mp3",
  "https://sample-videos.com/zip/10/mp3/SampleAudio_0.4mb_mp3.mp3",
  "https://sample-videos.com/zip/10/mp3/SampleAudio_0.7mb_mp3.mp3",
  "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
  "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_.mp3",
  "https://www.w3schools.com/html/horse.mp3",
];

export const samplePacks: SamplePack[] = [
  {
    id: "1",
    title: "Deep House Essentials",
    description: "Premium deep house samples with warm analog textures",
    genre: "House",
    bpm: 124,
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    previewUrl: workingAudioUrls[0],
    createdAt: "2023-10-15",
  },
  {
    id: "2",
    title: "Tech Drum Loops",
    description: "Cutting edge techno percussion and drums",
    genre: "Techno",
    bpm: 140,
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    previewUrl: workingAudioUrls[1],
    createdAt: "2023-11-03",
  },
  {
    id: "3",
    title: "Trap Melodies",
    description: "Modern trap melodies and 808s",
    genre: "Trap",
    bpm: 140,
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    previewUrl: workingAudioUrls[2],
    createdAt: "2023-12-01",
  },
  {
    id: "4",
    title: "Lo-Fi Hip Hop",
    description: "Chill beats and dusty samples for lo-fi productions",
    genre: "Hip Hop",
    bpm: 90,
    price: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    previewUrl: workingAudioUrls[3],
    createdAt: "2024-01-15",
  },
  {
    id: "5",
    title: "Ambient Textures",
    description: "Ethereal pads and atmospheric sounds",
    genre: "Ambient",
    bpm: 80,
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    previewUrl: workingAudioUrls[4],
    createdAt: "2024-02-10",
  },
  {
    id: "6",
    title: "Pop Vocal Chops",
    description: "Radio-ready vocal samples and chops",
    genre: "Pop",
    bpm: 128,
    price: 44.99,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    previewUrl: workingAudioUrls[5],
    createdAt: "2024-03-05",
  },
  {
    id: "7",
    title: "Drum & Bass Breaks",
    description: "High-energy breaks and basslines",
    genre: "Drum & Bass",
    bpm: 174,
    price: 27.99,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    previewUrl: workingAudioUrls[6],
    createdAt: "2024-04-12",
  },
  {
    id: "8",
    title: "Future Bass",
    description: "Colorful synths and future bass elements",
    genre: "Pop",
    bpm: 150,
    price: 32.99,
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    previewUrl: workingAudioUrls[7],
    createdAt: "2024-04-28",
  },
];

export const purchasedPacks = [
  samplePacks[0],
  samplePacks[3],
];

export const genres = [
  "All",
  "House", 
  "Techno", 
  "Hip Hop", 
  "Trap", 
  "Ambient", 
  "Pop", 
  "Drum & Bass"
];
