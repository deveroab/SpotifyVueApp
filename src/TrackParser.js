import axios from 'axios';
import TrackCountService from './TrackCountService';

const listUrl = 'http://spotifyvueapp-env.vje2dbrd7v.us-east-2.elasticbeanstalk.com/api/trackList';

let tracks = [];

async function getCount(id, name) {
  try {
    return await TrackCountService.getTrack(id, name);
  }catch(err) {
    console.log(err);
  }
}


class TrackParser {
  //get tracks
  static getTracks() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(listUrl);
        console.log(res.data.items);
        res.data.items.map(item => tracks.push({
          id: item.track.id,
          name: item.track.name || item.track.album.name,
          artist: item.track.album.artists[0].name,
          img: item.track.album.images[1].url,
          url: '',
          playcount: getCount(item.track.album.id, item.track.name)
        }));
       
        resolve(
            tracks
          )
      
      } catch(err) {
        reject(err);
      }
    });
  }
}

export default TrackParser;