import React, { Component } from "react";
import axios from "axios";
import { FaSort, FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";

import { sortByKey } from "utils";

import "./lovedTracks.scss";

class LovedTracks extends Component {
  state = {
    loading: true,
    tracks: [],
    sort: {
      key: "time_add",
      order: "asc"
    },
    allTimeFavorites: []
  };

  clickSort = evt => {
    const sortKey = evt.target.dataset.sortkey;

    const order = this.state.sort.order === "asc" ? "desc" : "asc";

    this.setState({
      tracks: sortByKey(this.state.tracks, sortKey, order),
      sort: {
        ...this.state.sort,
        order
      }
    });
  };

  add_minutes = (dt, minutes) => {
    return new Date(dt.getTime() + minutes * 60000);
  };

  setFavoriteToSession = () => {
    sessionStorage.setItem(
      "favorites",
      JSON.stringify(this.state.allTimeFavorites)
    );
  };

  clickFavorite = evt => {
    const trackId = evt.target.parentNode.dataset.id;

    if (this.state.allTimeFavorites.includes(parseInt(trackId))) {
      axios
        .delete("http://localhost:3001/api/favoriteTracks/delete/" + trackId)
        .then(response => {
          console.log("supprimé !", trackId);
          this.getAllTimeFavorites();
          this.getTracks();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post("http://localhost:3001/api/favoriteTracks/add/" + trackId)
        .then(response => {
          console.log("ajouté !", trackId);
          this.getAllTimeFavorites();
          this.getTracks();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  getTracks = () => {
    // set "now" timestamp (ms)
    const now = new Date().getTime();

    // expiration time before fetching new (mn)
    const expiresMinutes = 60;

    // get sessionObject containing tracks
    const sessionObject = sessionStorage.getItem("tracks");

    // if tracks, use them
    if (
      sessionObject &&
      JSON.parse(sessionObject).expires > new Date().getTime()
    ) {
      console.log("pas encore expiré");
      this.setState({
        ...this.state,
        loading: false,
        tracks: sortByKey(
          JSON.parse(sessionObject).data,
          this.state.sort.key,
          this.state.sort.order
        )
      });
    } else {
      // if not, load from API
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/http://api.deezer.com/playlist/234184751/tracks/?limit=999999999"
        )
        .then(response => {
          const tracks = response.data.data;

          tracks.map(track => {
            if (this.state.allTimeFavorites.includes(track.id)) {
              track.superLiked = true;
            }
          });

          this.setState(
            {
              ...this.state,
              loading: false,
              tracks: sortByKey(
                tracks,
                this.state.sort.key,
                this.state.sort.order
              )
            },
            () => {
              sessionStorage.setItem(
                "tracks",
                JSON.stringify({
                  expires: now + expiresMinutes * 60 * 1000,
                  data: response.data.data
                })
              );
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  getAllTimeFavorites = () => {
    axios
      .get("http://localhost:3001/api/favoriteTracks")
      .then(response => {
        const tracks = response.data;
        const array = tracks.map(track => {
          return track.track_id;
        });
        this.setState({
          ...this.state,
          allTimeFavorites: array
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  async componentDidMount() {
    await this.getAllTimeFavorites();
    this.getTracks();
  }
  render() {
    if (this.state.loading) {
      return <p>Chargement...</p>;
    } else {
      if (this.state.tracks.length) {
        const tracks = this.state.tracks;
        return (
          <>
            <h2>Dernier titre ajouté</h2>
            <section className='latest d-flex my-5 mx-auto shadow'>
              <div className='latest-img-container'>
                <img src={tracks[0].album.cover_medium} />
              </div>
              <div className='latest-meta-container d-flex flex-column align-items-end pr-5 justify-content-center'>
                <h3>{tracks[0].title}</h3>
                <h4 className='text-muted'>{tracks[0].artist.name}</h4>
                <p className='text-small text-muted'>
                  Ajouté{" "}
                  {new Date(tracks[0].time_add * 1000).toLocaleDateString()}
                </p>
              </div>
            </section>
            <table id='lovedTracks'>
              <thead>
                <tr>
                  <th />
                  <th>
                    <span onClick={this.clickSort} data-sortkey='title'>
                      Titre
                      <FaSort size='10px' />
                    </span>
                  </th>
                  <th>
                    <span onClick={this.clickSort} data-sortkey='artist.name'>
                      Artiste
                      <FaSort size='10px' />
                    </span>
                  </th>
                  <th>
                    <span onClick={this.clickSort} data-sortkey='album.title'>
                      Album
                      <FaSort size='10px' />
                    </span>
                  </th>
                  <th>
                    <span onClick={this.clickSort} data-sortkey='time_add'>
                      Ajouté
                      <FaSort size='10px' />
                    </span>
                  </th>
                  <th>
                    <span></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tracks.map(track => {
                  const date = new Date(track.time_add * 1000);
                  return (
                    <tr key={track.id}>
                      <td className='track-album-cover'>
                        <img
                          src={track.album.cover_small}
                          alt={track.title_short}
                        />
                      </td>
                      <td className='track-title ellipsis'>
                        <a href={track.link} target='_blank'>
                          {track.title_short}
                        </a>
                      </td>
                      <td className='track-artist-name ellipsis'>
                        <a href={track.artist.link} target='_blank'>
                          {track.artist.name}
                        </a>
                      </td>
                      <td className='track-album-title ellipsis'>
                        <a
                          href={`https://www.deezer.com/album/${track.album.id}`}
                          target='_blank'
                        >
                          {track.album.title}
                        </a>{" "}
                        {track.liked}
                      </td>
                      <td className='track-time-add'>
                        {date.toLocaleDateString()}
                      </td>
                      <td>
                        <IconContext.Provider
                          value={{
                            style: {
                              verticalAlign: "middle",
                              color: "#D3D3D3",
                              fontSize: "1.5rem"
                            },
                            className: `all-time-fav-icon`
                          }}
                        >
                          <FaStar
                            onClick={this.clickFavorite}
                            data-id={track.id}
                            className={track.superLiked ? "liked" : ""}
                          />
                        </IconContext.Provider>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        );
      } else {
        return <p>Aucun track</p>;
      }
    }
  }
}

export default LovedTracks;
