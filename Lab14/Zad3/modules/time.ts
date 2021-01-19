export let time: (meeting: Date) => number = function (meet) {
    return meet.getHours() * 60 + meet.getMinutes();
};
  