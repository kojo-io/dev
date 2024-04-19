export type VideoType = {
  controls: boolean,
  responsive: boolean,
  enableSmoothSeeking: boolean,
  fluid: boolean,
  aspectRatio: string,
  autoplay: boolean,
  sources: VideoSources[]
}


export type VideoSources = {
  src: string,
  type: string,
}
