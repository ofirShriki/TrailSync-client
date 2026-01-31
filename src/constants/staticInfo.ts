import sheepage from '../assets/photos/sheeptrip.png';
import water from '../assets/photos/waterTravel.png';
import london from '../assets/photos/london.png';
import type { Comment } from '../types/comment';
import type { Post } from '../types/post';
import type { User } from '../types/user';

const postOneComments: Comment[] = [
  {
    id: '1',
    text: 'This looks absolutely amazing! The scenery is breathtaking. Would love to join on the next trip!',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    postId: '1',
    userId: '2',
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    text: "How much hiking is involved? I'm interested but want to know the difficulty level.",
    createdAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
    postId: '1',
    userId: '3',
    updatedAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    text: 'Went on this trip last year, it was unforgettable! Highly recommend it to anyone.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    postId: '1',
    userId: '4',
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    text: 'Are there any vegan meal options available? This is beautiful but I have dietary restrictions.',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    postId: '1',
    userId: '5',
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: '5',
    text: "Just booked! Can't wait to experience this adventure. See you soon!",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    postId: '1',
    userId: '6',
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];

const postTwoComments: Comment[] = [
  {
    id: '6',
    text: "Amazing photos — London's skyline never gets old. Would love recommendations for a good walking route!",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    postId: '3',
    userId: '7',
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '7',
    text: 'If you plan to visit museums, get an early start to avoid queues. The public transport is excellent.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    postId: '3',
    userId: '8',
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '8',
    text: 'Booked this for next weekend — any tips on nearby cafes or local markets?',
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    postId: '3',
    userId: '9',
    updatedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
  },
];

export const posts: Post[] = [
  {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    sender: '69469337bda8e6485e5c88e8',
    title: 'My sheep trip',
    mapLink:
      'https://www.google.com/maps/d/embed?mid=101CRKWQbwExAnzfudZWBECB4XBGr8Qg&ehbc=2E312F&noprof=1',
    price: 800,
    numberOfDays: 5,
    location: {
      country: 'Israel',
      city: 'Ahkelon',
    },
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    photos: [sheepage],
    comments: postOneComments,
  },
  {
    id: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    sender: '69469337bda8e6485e5c88e8',
    title: 'Traveling in capri',
    mapLink:
      'https://www.google.com/maps/d/embed?mid=101CRKWQbwExAnzfudZWBECB4XBGr8Qg&ehbc=2E312F&noprof=1',
    price: 1200,
    numberOfDays: 4,
    location: {
      country: 'Italy',
      city: 'Capri',
    },
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    photos: [water, sheepage, london],
  },
  {
    id: '3',
    createdAt: new Date(),
    updatedAt: new Date(),
    sender: '69469337bda8e6485e5c88e9',
    title: 'London City Walk',
    mapLink:
      'https://www.google.com/maps/d/embed?mid=101CRKWQbwExAnzfudZWBECB4XBGr8Qg&ehbc=2E312F&noprof=1',
    price: 300,
    numberOfDays: 2,
    location: {
      country: 'United Kingdom',
      city: 'London',
    },
    description:
      'Explore the historic streets of London with guided walks, local food stops, and iconic views across the Thames.',
    photos: [london],
    comments: postTwoComments,
  },
];

export const users: User[] = [
  {
    id: 'u1',
    email: 'alex@example.com',
    password: 'hashed_password_1',
    username: 'alex_travels',
    profilePicture: '/avatars/alex.png',
    createdAt: new Date('2024-01-10T10:30:00Z'),
    updatedAt: new Date('2024-06-12T14:45:00Z'),
  },
  {
    id: 'u2',
    email: 'maria@example.com',
    password: 'hashed_password_2',
    username: 'maria.codes',
    profilePicture: '/avatars/maria.png',
    createdAt: new Date('2024-02-05T09:15:00Z'),
    updatedAt: new Date('2024-06-01T08:20:00Z'),
  },
  {
    id: 'u3',
    email: 'john@example.com',
    password: 'hashed_password_3',
    username: 'john_doe',
    createdAt: new Date('2023-11-20T18:00:00Z'),
    updatedAt: new Date('2024-05-30T12:10:00Z'),
  },
];
