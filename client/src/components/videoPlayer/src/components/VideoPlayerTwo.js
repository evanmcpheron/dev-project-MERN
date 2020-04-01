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
    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.handleHideComments = this.handleHideComments.bind(this);
    }
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
        currentPosition: 0,
        height: window.innerHeight,
        width: window.innerWidth,
        visibility: false
    };

    load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0,
            pip: false
        });
    };

    componentDidMount() {
        console.log(this.state.height);
        // Additionally I could have just used an arrow function for the binding `this` to the component...
        window.addEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth
        });
    }

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

    handleHideComments() {
        this.setState(prevState => ({
            visibility: !prevState.visibility
        }));
    }

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

    windowResize = () => {
        window.addEventListener('resize');
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
            <div className="VideoPlayerTwo ">
                {this.state.width >= 1200 ? (
                    <div>
                        <section className="section player-section">
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

                            <section className="side-playlist">
                                {this.props.videos.map(video => {
                                    return (
                                        <div
                                            key={video._id}
                                            className={`playlist-wrapper`}
                                        >
                                            {video.position - 1 ==
                                            this.state.currentPosition ? (
                                                <button
                                                    className="playlist-btn"
                                                    style={{
                                                        background: '#a9c54f',
                                                        border:
                                                            '1px solid #f1f1f1'
                                                    }}
                                                    value={video.url}
                                                    onClick={() =>
                                                        this.setState({
                                                            url: video.videoUrl,
                                                            currentVideo:
                                                                video.videoUrl,
                                                            currentPosition:
                                                                video.position -
                                                                1
                                                        })
                                                    }
                                                >
                                                    <h6>
                                                        {video.position}{' '}
                                                        {video.title}
                                                    </h6>
                                                </button>
                                            ) : (
                                                <button
                                                    className={`playlist-btn`}
                                                    value={video.url}
                                                    onClick={() =>
                                                        this.setState({
                                                            url: video.videoUrl,
                                                            currentVideo:
                                                                video.videoUrl,
                                                            currentPosition:
                                                                video.position -
                                                                1
                                                        })
                                                    }
                                                >
                                                    <h6>
                                                        {video.position}{' '}
                                                        {video.title}
                                                    </h6>
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </section>
                        </section>
                        <h6 className="mt2">
                            {
                                this.props.videos[this.state.currentPosition]
                                    .title
                            }
                        </h6>
                        <a
                            href={
                                this.props.videos[this.state.currentPosition]
                                    .githubUrl
                            }
                            target="_blank"
                        >
                            Github Repo
                        </a>
                        <div className="playlist playlist-bottom">
                            <section>
                                <CommentForm
                                    tutorialId={
                                        this.props.videos[
                                            this.state.currentPosition
                                        ]._id
                                    }
                                    videoId={this.props.tutorial._id}
                                />

                                {this.props.videos.map(video => {
                                    return (
                                        <div
                                            className="comments-wrapper mb2"
                                            key={video._id}
                                        >
                                            {video.videoUrl === this.state.url
                                                ? video.comments.length > 0
                                                    ? video.comments.map(
                                                          comment => (
                                                              <CommentItem
                                                                  key={
                                                                      comment._id
                                                                  }
                                                                  comment={
                                                                      comment
                                                                  }
                                                                  tutorialId={
                                                                      this.props
                                                                          .tutorial
                                                                          ._id
                                                                  }
                                                                  videoId={
                                                                      video._id
                                                                  }
                                                                  commentId={
                                                                      comment._id
                                                                  }
                                                              ></CommentItem>
                                                          )
                                                      )
                                                    : // <p>No Comments Yet</p>
                                                      null
                                                : null}
                                        </div>
                                    );
                                })}
                                <div></div>
                            </section>
                        </div>
                    </div>
                ) : (
                    <p>
                        <section className="section player-section">
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
                        <h6 className="mt2">
                            {
                                this.props.videos[this.state.currentPosition]
                                    .title
                            }
                        </h6>
                        <a
                            href={
                                this.props.videos[this.state.currentPosition]
                                    .githubUrl
                            }
                            target="_blank"
                        >
                            Github Repo
                        </a>
                        <div className="playlist playlist-bottom">
                            <section>
                                {this.state.visibility ? (
                                    <button
                                        className="btn"
                                        style={{
                                            marginBottom: '2rem',
                                            width: '100%',
                                            background: '#eeaa22',
                                            marginBottom: '3rem'
                                        }}
                                        onClick={this.handleHideComments}
                                    >
                                        Hide Comments
                                    </button>
                                ) : (
                                    <button
                                        className="btn"
                                        style={{
                                            marginBottom: '2rem',
                                            width: '100%',
                                            background: '#eeaa22',
                                            marginBottom: '8rem'
                                        }}
                                        onClick={this.handleHideComments}
                                    >
                                        Show Comments
                                    </button>
                                )}
                                {this.state.visibility ? (
                                    <div>
                                        <CommentForm
                                            tutorialId={
                                                this.props.videos[
                                                    this.state.currentPosition
                                                ]._id
                                            }
                                            videoId={this.props.tutorial._id}
                                        />

                                        {this.props.videos.map(video => {
                                            return (
                                                <div
                                                    className="comments-wrapper mb2"
                                                    key={video._id}
                                                >
                                                    {video.videoUrl ===
                                                    this.state.url
                                                        ? video.comments
                                                              .length > 0
                                                            ? video.comments.map(
                                                                  comment => (
                                                                      <CommentItem
                                                                          key={
                                                                              comment._id
                                                                          }
                                                                          comment={
                                                                              comment
                                                                          }
                                                                          tutorialId={
                                                                              this
                                                                                  .props
                                                                                  .tutorial
                                                                                  ._id
                                                                          }
                                                                          videoId={
                                                                              video._id
                                                                          }
                                                                          commentId={
                                                                              comment._id
                                                                          }
                                                                      ></CommentItem>
                                                                  )
                                                              )
                                                            : // <p>No Comments Yet</p>
                                                              null
                                                        : null}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : null}

                                <div>
                                    <section>
                                        {this.props.videos.map(video => {
                                            return (
                                                <div
                                                    key={video._id}
                                                    className="playlist-wrapper"
                                                >
                                                    {video.position - 1 ==
                                                    this.state
                                                        .currentPosition ? (
                                                        <button
                                                            className="playlist-btn"
                                                            style={{
                                                                background:
                                                                    '#a9c54f',
                                                                border:
                                                                    '1px solid #f1f1f1'
                                                            }}
                                                            value={video.url}
                                                            onClick={() =>
                                                                this.setState({
                                                                    url:
                                                                        video.videoUrl,
                                                                    currentVideo:
                                                                        video.videoUrl,
                                                                    currentPosition:
                                                                        video.position -
                                                                        1
                                                                })
                                                            }
                                                        >
                                                            <h6>
                                                                {video.position}{' '}
                                                                {video.title}
                                                            </h6>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className={`playlist-btn`}
                                                            value={video.url}
                                                            onClick={() =>
                                                                this.setState({
                                                                    url:
                                                                        video.videoUrl,
                                                                    currentVideo:
                                                                        video.videoUrl,
                                                                    currentPosition:
                                                                        video.position -
                                                                        1
                                                                })
                                                            }
                                                        >
                                                            <h6>
                                                                {video.position}{' '}
                                                                {video.title}
                                                            </h6>
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </section>
                                </div>
                            </section>
                        </div>
                    </p>
                )}
            </div>
        );
    }
}

export default VideoPlayerTwo;
