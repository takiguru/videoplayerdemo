class VideoPlayer {
	constructor(videoData) {
		this.checkBrowserSupport();
		this.video = document.getElementById('player');
		if (!this.video) throw 'Missing video reference in VideoPlayer class';
		this.media = new MediaSource();
		this.videoData = videoData;
		this.timeBuffer = 0;
		this.currentChunk = videoData.startIndex;
		this.video.src = window.URL.createObjectURL(this.media);
		this.bindEvents();
	}
	checkBrowserSupport() {
		if (!window.MediaSource) {
			alert('Your browser is not supporting MediaSource');
			throw 'Your browser is not supporting MediaSource';
		}
	}
	bindEvents() {
		this.media.addEventListener('sourceopen', this.eventMediaSourceOpen.bind(this));
		this.video.addEventListener('timeupdate', this.eventLoadSegment.bind(this));
	}
	eventMediaSourceOpen() {
		this.sourceBuffer = this.media.addSourceBuffer(this.videoData.codec);
		this.sourceBuffer.addEventListener('updateend', this.eventLoadSegment.bind(this));
		this.getSegment(this.videoData.startUrl, this.appendToBuffer.bind(this));
		this.nextSegment();
	}
	eventLoadSegment() {
		if (this.timeBuffer < this.video.currentTime + this.videoData.segmentDuration) {
			this.nextSegment();
		}
	}
	getSegment(url, callback) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.responseType = 'arraybuffer';
		xhr.onload = function() {
			callback(xhr.response);
		};
		xhr.send();
	}
	nextSegment() {
		if (this.currentChunk <= this.videoData.chunkCount) {
			let url = this.videoData.fileTemplate.replace('$INDEX$', this.currentChunk);
			this.getSegment(url, this.appendToBuffer.bind(this));
			this.currentChunk++;
			this.timeBuffer += this.videoData.segmentDuration;
		} else {
			if (!this.sourceBuffer.updating && this.media.readyState === 'open') {
				this.media.endOfStream();
			}
		}
	}
	appendToBuffer(videoChunk) {
		if (videoChunk) {
			this.sourceBuffer.appendBuffer(new Uint8Array(videoChunk));
		}
	}
}
