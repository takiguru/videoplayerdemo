class VideoData {
	constructor(url, name, segmentDuration, startIndex, chunkCount, codec) {
		this.startUrl = url + `${name}_${segmentDuration}s_init.mp4`;
		this.fileTemplate = url + `${name}_${segmentDuration}s$INDEX$.m4s`;
		this.segmentDuration = segmentDuration;
		this.startIndex = startIndex;
		this.chunkCount = chunkCount;
		this.codec = codec;
	}
}
