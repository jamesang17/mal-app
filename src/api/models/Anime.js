/**
 * Object that holds relevant data for a specific anime.
 */
export class Anime {
  /**
   * 
   * @param {String} malId - the unique id for an anime
   * @param {String} imageUrl - the unique image url for an anime
   * @param {String} title - the title of the anime
   * @param {String} parentMalId - the id of the parent anime that a recommendation is tied to
   */
  constructor(malId,imageUrl,title,parentMalId=null) {
    this.malId = malId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.parentRec = parentMalId;
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
   * @param {String} parentMalId 
   */
  setParentRec(parentMalId) {
    this.parentRec = parentMalId;
  }

  getParentRec() {
    return this.parentRec;
  }
}