let videoFile = new VideoData(
	'http://www-itec.uni-klu.ac.at/ftp/datasets/DASHDataset2014/BigBuckBunny/10sec/bunny_317328bps/',
	'BigBuckBunny',
	10,
	1,
	60,
	'video/mp4; codecs="avc1.4d401f"'
);
let Player = new VideoPlayer(videoFile);
let CustomController;
if (Player.video) {
	CustomController = new CustomControls(Player.video);
}
