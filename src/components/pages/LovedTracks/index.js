import React, { Component } from "react";
import axios from "axios";
import { FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";

import { sortByKey } from "utils";

import "./lovedTracks.scss";

class LovedTracks extends Component {
  state = {
    loading: true,
    tracks: [],
    sort: {
      key: "time_add",
      order: "asc"
    }
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

  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://api.deezer.com/playlist/234184751/tracks/?limit=999999999"
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          loading: false,
          tracks: sortByKey(
            response.data.data,
            this.state.sort.key,
            this.state.sort.order
          )
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    if (this.state.loading) {
      return <p>Chargement...</p>;
    } else {
      if (this.state.tracks.length) {
        const tracks = this.state.tracks;
        return (
          <table id="lovedTracks">
            <thead>
              <tr>
                <th />
                <th>
                  <span onClick={this.clickSort} data-sortkey="title">
                    Titre
                    <FaSort size="10px" />
                  </span>
                </th>
                <th>
                  <span onClick={this.clickSort} data-sortkey="artist.name">
                    Artiste
                    <FaSort size="10px" />
                  </span>
                </th>
                <th>
                  <span onClick={this.clickSort} data-sortkey="album.title">
                    Album
                    <FaSort size="10px" />
                  </span>
                </th>
                <th>
                  <span onClick={this.clickSort} data-sortkey="time_add">
                    Ajouté
                    <FaSort size="10px" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {tracks.map(track => {
                const date = new Date(track.time_add * 1000);
                return (
                  <tr key={track.id}>
                    <td className="track-album-cover">
                      <img
                        src={track.album.cover_small}
                        alt={track.title_short}
                      />
                    </td>
                    <td className="track-title ellipsis">
                      <a href={track.link} target="_blank">
                        {track.title_short}
                      </a>
                    </td>
                    <td className="track-artist-name ellipsis">
                      <a href={track.artist.link} target="_blank">
                        {track.artist.name}
                      </a>
                    </td>
                    <td className="track-album-title ellipsis">
                      <a
                        href={`https://www.deezer.com/album/${track.album.id}`}
                        target="_blank"
                      >
                        {track.album.title}
                      </a>
                    </td>
                    <td className="track-time-add">
                      {date.toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      } else {
        return <p>Aucun track</p>;
      }
    }
  }
}

export default LovedTracks;
