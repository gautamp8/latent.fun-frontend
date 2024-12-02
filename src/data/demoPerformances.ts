import type { Performance } from '../types';

export const demoPerformances: Performance[] = [
  {
    id: 1,
    videoUrl: 'https://res.cloudinary.com/dkrxvr5vl/video/upload/v1733089131/QecYwkTX4jI.mp4',
    creatorAddress: '0xdemo1',
    creatorName: 'Sindhu Vee',
    selfScore: 8,
    timestamp: Date.now() - 86400000,
    likes: 10
  },
  {
    id: 2,
    videoUrl: 'https://res.cloudinary.com/dkrxvr5vl/video/upload/v1733089208/puE1MFsNeqo.mp4',
    creatorAddress: '0xdemo2',
    creatorName: 'Trevor Noah',
    selfScore: 9,
    timestamp: Date.now() - 172800000,
    likes: 23
  },
  {
    id: 3,
    videoUrl: 'https://res.cloudinary.com/dkrxvr5vl/video/upload/v1733089288/Kanan_Gill_on_time_pass.mp4',
    creatorAddress: '0xdemo3',
    creatorName: 'Kanan Gill',
    selfScore: 7,
    timestamp: Date.now() - 259200000,
    likes: 7
  },
  {
    id: 4,
    videoUrl: 'https://res.cloudinary.com/dkrxvr5vl/video/upload/v1733089341/Past_tense_so_easy_standup_standupcomedy_jokes_shorts.mp4',
    creatorAddress: '0xdemo4',
    creatorName: 'Kanan Gill',
    selfScore: 5,
    timestamp: Date.now() - 259200000,
    likes: 14
  },
  {
    id: 5,
    videoUrl: 'https://res.cloudinary.com/dkrxvr5vl/video/upload/v1733089406/xCG0O5fdTvc.mp4',
    creatorAddress: '0xdemo5',
    creatorName: 'Russel Peters',
    selfScore: 4,
    timestamp: Date.now() - 259200000,
    likes: 3
  }
];