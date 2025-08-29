let ops1Data;
let ops2Data;
let ops3Data;
let ops1 = document.querySelectorAll(".radio_container")[0];
ops1.querySelectorAll(".color_radio").forEach(function (c) {
  let op = c.dataset.variant;
  //   console.log(op);
  ops1Data = allVarData.filter(function (v) {
    return v.option1 == op;
  });
  let ava = ops1Data.filter(function (av) {
    return av.available == true;
  });
  let isAvailable = ava.length;
  //   console.log(isAvailable);
  if (!isAvailable) {
    c.classList.add("variant-disabled");
  } else {
    c.classList.remove("variant-disabled");
  }
});

let ops2 = document.querySelectorAll(".radio_container")[1];
let selectedOps1 = ops1.querySelector('input[checked="checked"]').value;
let selectedData1 = allVarData.filter(function (d) {
  return d.option1 == selectedOps1;
});
ops2.querySelectorAll(".color_radio").forEach(function (c) {
  let op = c.dataset.variant;
  console.log(op);
  ops2Data = selectedData1.filter(function (v) {
    return v.option2 == op;
  });
  let ava = ops2Data.filter(function (av) {
    return av.available == true;
  });
  let isAvailable = ava.length;
  if (!isAvailable) {
    c.classList.add("variant-disabled");
  } else {
    c.classList.remove("variant-disabled");
  }
  console.log(ops2Data);
});

let ops3 = document.querySelectorAll(".radio_container")[2];
let selectedOps2 = ops2.querySelector('input[checked="checked"]').value;
let selectedData2 = selectedData1.filter(function (d) {
  return d.option2 == selectedOps2;
});
ops3.querySelectorAll(".color_radio").forEach(function (c) {
  let op = c.dataset.variant;
  console.log(op);
  ops3Data = selectedData2.filter(function (v) {
    return v.option3 == op;
  });
  let ava = ops3Data.filter(function (av) {
    return av.available == true;
  });
  let isAvailable = ava.length;
  if (!isAvailable) {
    c.classList.add("variant-disabled");
  } else {
    c.classList.remove("variant-disabled");
  }
  console.log(ops3Data);
});

// applies

function variantAvailabilityCheck(wrap, allVarJson) {
  let ops1Data;
  let ops2Data;
  let ops3Data;
  let ops1 = wrap.querySelectorAll(".radio_container")[0];
  ops1.querySelectorAll(".color_radio").forEach(function (c) {
    let op = c.dataset.variant;
    //   console.log(op);
    ops1Data = allVarJson.filter(function (v) {
      return v.option1 == op;
    });
    let ava = ops1Data.filter(function (av) {
      return av.available == true;
    });
    let isAvailable = ava.length;
    //   console.log(isAvailable);
    if (!isAvailable) {
      c.classList.add("variant-disabled");
    } else {
      c.classList.remove("variant-disabled");
    }
  });

  let ops2 = wrap.querySelectorAll(".radio_container")[1];
  let selectedOps1 = ops1.querySelector('input[checked="checked"]').value;
  let selectedData1 = allVarJson.filter(function (d) {
    return d.option1 == selectedOps1;
  });
  ops2.querySelectorAll(".color_radio").forEach(function (c) {
    let op = c.dataset.variant;
    console.log(op);
    ops2Data = selectedData1.filter(function (v) {
      return v.option2 == op;
    });
    let ava = ops2Data.filter(function (av) {
      return av.available == true;
    });
    let isAvailable = ava.length;
    if (!isAvailable) {
      c.classList.add("variant-disabled");
    } else {
      c.classList.remove("variant-disabled");
    }
    console.log(ops2Data);
  });

  let ops3 = wrap.querySelectorAll(".radio_container")[2];
  let selectedOps2 = ops2.querySelector('input[checked="checked"]').value;
  let selectedData2 = selectedData1.filter(function (d) {
    return d.option2 == selectedOps2;
  });
  ops3.querySelectorAll(".color_radio").forEach(function (c) {
    let op = c.dataset.variant;
    console.log(op);
    ops3Data = selectedData2.filter(function (v) {
      return v.option3 == op;
    });
    let ava = ops3Data.filter(function (av) {
      return av.available == true;
    });
    let isAvailable = ava.length;
    if (!isAvailable) {
      c.classList.add("variant-disabled");
    } else {
      c.classList.remove("variant-disabled");
    }
    console.log(ops3Data);
  });
}

ariantAvailabilityCheck(wrap, allVarJson);
