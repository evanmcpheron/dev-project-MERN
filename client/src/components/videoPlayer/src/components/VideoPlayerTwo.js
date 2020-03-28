import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import './reset.css';
import './defaults.css';
import './range.css';
import './App.css';

import ReactPlayer from '../ReactPlayer';
import CommentForm from '../../../tutorial/CommentForm';
import CommentItem from '../../../tutorial/CommentItem';

class VideoPlayerTwo extends Component {
    state = {
        url: this.props.videos[0].videoUrl,
        pip: false,
        playing: true,
        controls: true,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        ended: false,
        videos: this.props.videos,
        currentVideo: null,
        currentPosition: 0
    };

    load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0,
            pip: false
        });
    };

    handleProgress = state => {
        console.log('onProgress', state);
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state);
        }

        if (state.played === 1) {
            this.setState({});
        }
    };

    handleEnded = () => {
        console.log('onEnded');
        if (this.props.videos[this.state.currentPosition + 1] !== undefined) {
            this.setState({
                playing: true,
                currentPosition: this.state.currentPosition + 1,
                url: this.props.videos[this.state.currentPosition + 1].videoUrl
            });
        } else {
            console.log('playlist ended');
        }
    };

    handleDuration = duration => {
        // console.log('onDuration', duration);
        console.log('TUTORIAL PROPS', this.props.tutorial);

        this.setState({ duration });
    };

    ref = player => {
        this.player = player;
    };

    render() {
        const {
            url,
            playing,
            controls,
            light,
            volume,
            muted,
            loop,
            playbackRate,
            pip
        } = this.state;
        const SEPARATOR = ' · ';

        return (
            <div className="VideoPlayerTwo">
                <section className="section">
                    <div className="player-wrapper">
                        <ReactPlayer
                            ref={this.ref}
                            className="react-player"
                            width="100%"
                            height="100%"
                            url={url}
                            pip={pip}
                            playing={playing}
                            controls={controls}
                            light={light}
                            loop={loop}
                            playbackRate={playbackRate}
                            volume={volume}
                            muted={muted}
                            onEnded={this.handleEnded}
                            onError={e => console.log('onError', e)}
                            onProgress={this.handleProgress}
                            onDuration={this.handleDuration}
                        />
                    </div>
                </section>
                <h1>{this.props.videos[this.state.currentPosition].title}</h1>
                <CommentForm
                    tutorialId={
                        this.props.videos[this.state.currentPosition]._id
                    }
                    videoId={this.props.tutorial._id}
                />

                <section>
                    {this.props.videos.map(video => {
                        return (
                            <div key={video._id}>
                                {video.videoUrl === this.state.url
                                    ? video.comments.length > 0
                                        ? video.comments.map(comment => (
                                              <CommentItem
                                                  key={comment._id}
                                                  comment={comment}
                                                  tutorialId={
                                                      this.props.tutorial._id
                                                  }
                                                  videoId={video._id}
                                                  commentId={comment._id}
                                              ></CommentItem>
                                          ))
                                        : // <p>No Comments Yet</p>
                                          null
                                    : null}
                            </div>
                        );
                    })}
                </section>
                {this.props.videos.map(video => {
                    return (
                        <div key={video._id}>
                            <button
                                value={video.url}
                                onClick={() =>
                                    this.setState({
                                        url: video.videoUrl,
                                        currentVideo: video.videoUrl,
                                        currentPosition: video.position - 1
                                    })
                                }
                            >
                                {video.position} {video.title}
                                <img
                                    src={this.props.tutorial.thumbnailURL}
                                    alt="Thumbnail Image"
                                />
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default VideoPlayerTwo;
