/**
 * This is required because of Jikan's time limit between each request
 * https://jikan.docs.apiary.io/#introduction/information/bulk-requests
 */
export function sleep() {
  console.log("Sleeping for 4 secs");
  return new Promise(resolve => setTimeout(resolve, 4000));
}