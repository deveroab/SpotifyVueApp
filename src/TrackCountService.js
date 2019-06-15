import axios from 'axios';

const url = 'http://spotifyvueapp-env.vje2dbrd7v.us-east-2.elasticbeanstalk.com/api/track';

class TrackCountService {
  //get tracks
  static getTrack(id, name) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url, 
          {
            params: {
              albumid: id,
              name: name
            }
          }  
        );
        /*
        const data = res.data.data.filter(track => {
          track.name === name;
        });
        */
       const data = res.data.data.filter(track => {
          if(track.name === name) {
          
            return track;
          }
       });
       console.log(data);
        resolve(
            data[0].playcount
          )
      
      } catch(err) {
        reject(err);
      }
    });
  }
}

export default TrackCountService;