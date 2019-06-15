<template>
  <div>
    <ol class="track-list">
      <li class="track"
        v-for="(track, index) in tracks"
        v-bind:item="track"
        v-bind:index="index"
        v-bind:key="track.id">
        <a v-bind:href="track.id" target="_blank">
          <div class="track-content">
              <img v-bind:src="track.img" alt="Spotify Album image" width="150" height="100%">
              <div class="track-content__info">
                <h2>{{ track.name }}</h2>
                <p>{{ track.artist }}</p>
                <p>{{ track.playcount }}</p>
              </div>
          </div>
        </a>
      </li>
    </ol>
  </div>
</template>

<script>
import TrackParser from '../TrackParser';

export default {
  name: 'Track',
  data() {
    return {
      tracks: [],
      error: '',
    }
  },
  async created() {
    try {
      //this.tracks = await TrackService.getTracks();
      this.tracks = await TrackParser.getTracks();
      this.tracks.map(item => {
        item.playcount.then(count => {
          item.playcount = count;
        });
       
      });
    } catch(err) {
      this.error = err.message;
    }
  }, 
  methods: {

  },
}
</script>

<style scoped>
  .track-list {
    display: block;
  }

  .track {
    width: 50%;
    background-color: rgb(245, 245, 245);
    color: white;
    margin: auto;
    text-align: left;
    margin-bottom: 20px;
    text-decoration:  none;
    position: relative;
  }

  .track-content:before {
    background-color: #34495e;;
    content: "asd";
    height: 0;
    color: transparent;
    transition: 0.5s;
    position: absolute;
    left: 0;
    height: 100%;
    opacity: 1;
    width: 0%;
  }
    
  .track-content:hover:before {
    background: #34495e;;
    content: "asd";
    color: transparent;
    height: 30px;
    position: absolute;
    transition: 0.5s;
    left: 0;
    opacity: 0.4;
    height: 100%;
    width: 100%;
  }

  .track-content--right {
    flex: 0 1 15%;
    padding: 10px;
  }

  .track-content--right button {
    border: none;
    width: 20;
    height: 20px;
    padding: 15px;
    margin-left: 30px;
    background-color: gray;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  a {
    text-decoration: none;
  }

  .track-content {
    display: flex;
  }

  .track-content__info {
    display: block;
    margin-left: 50px;
    flex: 0 1 90%;
  }

  h2 {
    color: #34495e;
    text-decoration: none;
    padding-right: 10px;
    font-size: 1.875em;
    margin-bottom: 0;
  }
  p {
    color: #34495e;
    text-decoration: none;
    padding-right: 10px;
    font-size: 1.375em;
    margin: 0;
  }
</style>
