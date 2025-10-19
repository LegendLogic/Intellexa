import React from 'react';
import Notes from '../components/Notes';
import Video from '../components/Video';
import Article from '../components/Article';
import DailyStreak from '../components/DailyStrike';

const Reading = () => {
  return (
    <div className="min-h-screen  px-6 py-12 flex flex-col items-center"
    style={{
    background:
      "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
  }}
    >
      
      <Video/>
      <Article/>
      <Notes />
      
    </div>

  );
};

export default Reading;
