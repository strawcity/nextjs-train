export function willYouMakeIt(trainExpectedTime: string, walkingTime: number) {
  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + walkingTime);

  const trainTime = new Date(trainExpectedTime);

  const hour = trainTime.getHours();
  const minute = trainTime.getMinutes();
  const second = trainTime.getSeconds();

  const nextTrain = new Date();
  nextTrain.setHours(hour, minute, second);

  return currentTime < nextTrain;
}
