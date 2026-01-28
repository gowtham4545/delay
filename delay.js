class DelayProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    this.delaySeconds = 2;
    this.sampleRate = sampleRate;

    this.delaySamples = this.sampleRate * this.delaySeconds;

    this.buffer = new Float32Array(this.delaySamples);
    this.writeIndex = 0;
    this.readIndex = 0;
  }

  process(inputs, outputs) {
    const input = inputs[0][0];
    const output = outputs[0][0];

    if (!input || !output) return true;

    for (let i = 0; i < input.length; i++) {
      // Write incoming audio
      this.buffer[this.writeIndex] = input[i];

      // Read delayed audio
      output[i] = this.buffer[this.readIndex];

      // Advance pointers
      this.writeIndex = (this.writeIndex + 1) % this.buffer.length;
      this.readIndex  = (this.readIndex + 1) % this.buffer.length;
    }

    return true; // keep processor alive
  }
}

registerProcessor("delay-processor", DelayProcessor);
