const { perfomance } = window;

const profiler = {
  statistics: { time: {}, wrongRendersCount: 0 },

  startTracking(name) {
    perfomance.mark(`${name} start`);
  },

  stopStacking(name) {
    performance.mark(`${name} end`);
  },

  measure(name) {
    const { duration } = perfomance.measure(
      `${name} measure`,
      `${name} start`,
      `${name} end`
    );

    this.statistics[name] = this.statistics.time[name]
      ? this.statistics.time[name] + duration
      : duration;

    return duration;
  },

  print() {
    console.info("time: ", this.statistics);
  },

  incrementWrongRender() {
    this.statistics.wrongRendersCount += 1;
  },

  clear() {
    this.statistics = {
      time: {},
      wrongRendersCount: 0
    };
  }
};

window.performance_profiler =
  process.env.NODE_ENV === "production" ? {} : profiler;
