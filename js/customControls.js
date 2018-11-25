class CustomControls {
	constructor(video) {
		this.enabled = false;
		this.ref = video;
		if (!this.ref) throw 'Missing video reference in CustomControls class';
		this.enableSwitch = document.getElementById('customControlsEnabled');
		if (!this.enableSwitch) throw 'Missing enableSwitch reference in CustomControls class';
		this.volumeSlider = document.getElementById('customControlsVolumeSlider');
		if (!this.volumeSlider) throw 'Missing volumeSlider reference in CustomControls class';
		this.divElement = document.getElementById('customControlsContainer');
		if (!this.divElement) throw 'Missing divElement reference in CustomControls class';
		this.playButton = document.getElementById('customPlayButton');
		if (!this.playButton) throw 'Missing playButton reference in CustomControls class';
		this.bindEvents();
	}
	bindEvents() {
		this.volumeSlider.addEventListener('input', this.setVolume.bind(this));
		this.enableSwitch.addEventListener('change', this.switchState.bind(this));
	}
	switchVisibility() {
		if (this.enabled) {
			this.divElement.style.display = 'none';
		} else {
			this.divElement.style.display = 'block';
		}
	}
	switchState() {
		this.switchVisibility();
		this.ref.controls = !this.ref.controls;
		this.enabled = !this.enabled;
	}
	setVolume(e) {
		this.ref.volume = e.target.value;
	}
	changePlayState() {
		if (this.ref.paused) {
			this.ref.play();
			this.playButton.innerText = 'Pause';
		} else {
			this.ref.pause();
			this.playButton.innerText = 'Play';
		}
	}
	seekVideo(value) {
		if (this.ref.currentTime + value < this.ref.duration) {
			this.ref.currentTime = this.ref.currentTime + value;
		}
	}
}
