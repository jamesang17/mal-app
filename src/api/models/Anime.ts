/**
 * Object that holds relevant data for a specific anime.
 */
export class Anime {
  mal_id:string;
  image_url:string;
  title:string;
  recommendations:Anime[]|null;
  /**
   * 
   * @param {String} malId - the unique id for an anime
   * @param {String} imageUrl - the unique image url for an anime
   * @param {String} title - the title of the anime
   * @param {Anime[]} recommendations - the list of recommended animes 
   * Defaults to NULL if not specified
   */
  constructor(malId:string, imageUrl:string, title:string, recommendations=null) {
    this.mal_id = malId;
    this.image_url = imageUrl;
    this.title = title;
    this.recommendations = recommendations;
  }

  getMalId():string {
    return this.mal_id;
  }

  getImageUrl():string {
    return this.image_url;
  }

  getTitle():string {
    return this.title;
  }

  /**
   * Sets the parent mal id for a recommendation
   * @param {Anime[]} recommendations
   */
  setRecommendations(recommendations: Anime[]) {
    this.recommendations = recommendations;
  }

  getRecommendations():Anime[]|null {
    return this.recommendations;
  }
}