"use strict";

// Generated by CoffeeScript 2.2.4
(function () {
  var BottleneckError, States;

  BottleneckError = require("./BottleneckError");

  States = class States {
    constructor(status) {
      this.status = status;
      this.jobs = {};
      this.counts = this.status.map(function () {
        return 0;
      });
    }

    next(id) {
      var current, next;
      current = this.jobs[id];
      next = current + 1;
      if (current != null && next < this.status.length) {
        this.counts[current]--;
        this.counts[next]++;
        return this.jobs[id]++;
      } else if (current != null) {
        this.counts[current]--;
        return delete this.jobs[id];
      }
    }

    start(id, initial = 0) {
      this.jobs[id] = initial;
      return this.counts[initial]++;
    }

    remove(id) {
      var current;
      current = this.jobs[id];
      if (current != null) {
        this.counts[current]--;
        return delete this.jobs[id];
      }
    }

    jobStatus(id) {
      var ref;
      return (ref = this.status[this.jobs[id]]) != null ? ref : null;
    }

    statusCounts() {
      return this.counts.reduce((acc, v, i) => {
        acc[this.status[i]] = v;
        return acc;
      }, {});
    }

  };

  module.exports = States;
}).call(undefined);