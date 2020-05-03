export function sleep() {
  console.log("Sleeping for 4 secs");
  return new Promise(resolve => setTimeout(resolve, 4000));
}