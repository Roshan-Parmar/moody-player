import { useState } from "react";

const MoodSongs = ({ songs = [] }) => {
  const [play,setPlay] = useState(null);

  const handlePlay = (index)=>{
    if(play === index){
      setPlay(null);
    }
    else{
      setPlay(index);
    }
  }

  if (!songs.length) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        <p className="text-lg text-amber-400">
          No songs found for this mood 🎧
        </p>
      </div>
    );
  }

const music = songs.map((song, index) => {
  return (
    <div
      key={index}
      className="bg-gray-800 text-white shadow-lg rounded-2xl p-5 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
    >
      
      <div className="text-lg font-semibold mb-1">{song.title}</div>
      
      <div className="text-gray-400 text-sm mb-3">{song.artist}</div>
      
      <div className="w-full justify-center">
        {
          play === index && 
          <audio src={song.url}
          className="w-full rounded-lg shadow-md hidden"
          autoPlay = {play === index}
        ></audio>
        }

        <button onClick={()=>{handlePlay(index)}}>
          {play === index ?<i class="ri-pause-circle-fill"></i> : <i class="ri-play-circle-fill"></i>
          }
        </button>

      </div>
    </div>
  );
});

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {music}
      </div>
    </div>
  );
};

export default MoodSongs;
