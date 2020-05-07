/**
 * Object that holds relevant data for a specific anime.
 */
export class Anime {
  /**
   * 
   * @param {String} malId - the unique id for an anime
   * @param {String} imageUrl - the unique image url for an anime
   * @param {String} title - the title of the anime
   * @param {Anime[]} recommendations - the list of recommended animes 
   * Defaults to NULL if not specified
   */
  constructor(malId, imageUrl, title, recommendations=null) {
    this.malId = malId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.recommendations = recommendations;
  }

  getMalId() {
    return this.malId;
  }

  getImageUrl() {
    return this.imageUrl;
  }

  getTitle() {
    return this.title;
  }

  /**
   * Sets the parent mal id for a recommendation
   * @param {Anime[]} recommendations
   */
  setRecommendations(recommendations) {
    this.recommendations = recommendations;
  }

  getRecommendations() {
    return this.recommendations;
  }
}