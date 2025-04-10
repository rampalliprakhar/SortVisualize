export default class AudioManager {
    constructor() {
        if (typeof window !== 'undefined') {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.setupAudioInput();
        }
    }

    async setupAudioInput() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const source = this.audioContext.createMediaStreamSource(stream);
            this.analyzer = this.audioContext.createAnalyser();
            source.connect(analyzer);
            this.analyzer = analyzer;
        } catch (error) {
            console.log("Defult synthesized audio in use!!")
        }
    }

    playSound(value, operation) {
        if (!this.audioContext) return;
        
        // Create rich musical tones using multiple oscillators
        const baseFreq = 220; // A3 note
        const oscillators = [];

        const normalizedValue = typeof value === 'string' 
            ? value.charCodeAt(0) - 65  // A=0, B=1, etc.
            : value;
        
        // Create a chord based on the value
        [1, 1.25, 1.5].forEach(multiplier => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            
            // Map array values to musical scale
            const freq = baseFreq * multiplier * (1 + (normalizedValue % 26) / 26);
            osc.frequency.value = freq;
            // osc.frequency.value = baseFreq * multiplier * (1 + value/100);
            osc.type = operation === 'compare' ? 'sine' : 'triangle';
            
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            oscillators.push({ osc, gain });
        });

        // Play the chord
        oscillators.forEach(({ osc, gain }) => {
            osc.start();
            gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
            osc.stop(this.audioContext.currentTime + 0.3);
        });
    }
}