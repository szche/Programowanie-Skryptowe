function doPointlessComputationsWithRequestAnimationFrame() {
    const t0 = performance.now();
    function testCandidate(index) {
      // finishing condition
      if (index == iterations) {
        console.log(primes);
        //pointlessComputationsButton.disabled = false;
        const t1 = performance.now();
        console.log(`Call to animationFrame took ${t1 - t0} milliseconds.`);
        dane_wykres.push( ["RequestAnimationFrame", t1-t0] );
        //dane_wykres.set("RequestAnimationFrame", t1-t0);
        return;
      }
      // test this number
      var candidate = index * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
            // not prime
            isPrime = false;
            break;
         }
      }
      if (isPrime) {
        primes.push(candidate);
      }
      // schedule the next
      var testFunction = testCandidate.bind(this, index + 1);
      window.requestAnimationFrame(testFunction);
    }
  
    var primes = [];
    var testFunction = testCandidate.bind(this, 0);
    window.requestAnimationFrame(testFunction);
    return;
  }

//SET INTERVAL
function doPointlessComputationsWithSetInterval() {
  const t0 = performance.now();
  var index=0;
  function testCandidate() {
    // finishing condition
    if (index == iterations) {
      console.log(primes);
      //pointlessComputationsButton.disabled = false;
      window.clearInterval(intervaled);
      const t1 = performance.now();
      console.log(`Call to setIterval took ${t1 - t0} milliseconds.`);
      dane_wykres.push( ["SetInterval", t1-t0] );
      return;
    }
    // test this number
    var candidate = index * (multiplier * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
          // not prime
          isPrime = false;
          break;
       }
    }
    if (isPrime) {
      primes.push(candidate);
    }
    index++;
  }

  var primes = [];
  var testFunction = testCandidate.bind(this);
  var intervaled = window.setInterval(testFunction, 30);
}

//SET Timeout
function doPointlessComputationsWithSetTimeout() {
  const t0 = performance.now();
  function testCandidate(index) {
    // finishing condition
    if (index == iterations) {
      console.log(primes);
      //pointlessComputationsButton.disabled = false;
      const t1 = performance.now();
      console.log(`Call to setTimeout took ${t1 - t0} milliseconds.`);
      dane_wykres.push( ["setTimeout", t1-t0] );
      return;
    }
    // test this number
    var candidate = index * (multiplier * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
          // not prime
          isPrime = false;
          break;
       }
    }
    if (isPrime) {
      primes.push(candidate);
    }
    // schedule the next
    var testFunction = testCandidate.bind(this, index + 1);
    window.setTimeout(testFunction, base_timeout);
  }

  var primes = [];
  
  var base_timeout = 30;
  var testFunction = testCandidate.bind(this, 0);
  window.setTimeout(testFunction, base_timeout);
}