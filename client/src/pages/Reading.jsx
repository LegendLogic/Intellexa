import React from 'react';
import Notes from '../components/Notes';
import Video from '../components/Video';
import Article from '../components/Article';
import DailyStreak from '../components/DailyStrike';

const Reading = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center">
      
      <Video/>
      <Article/>
      <Notes />
      
    </div>

  );
};

export default Reading;
