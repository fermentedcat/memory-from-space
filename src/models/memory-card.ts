import { Image } from "./image";

export class MemoryCard implements Image {
  isFlipped: boolean = false;
  isMatched: boolean = false;
  url: string = 'https://static01.nyt.com/images/2022/02/21/opinion/sunday/18shesol/18shesol-superJumbo.jpg'
  title: string = 'Moon landing'
  explanation: string = 'Placeholder image'
  date: string = '1969-07-20'
  media_type: string = 'image'

  constructor(card: Image) {
    const isValidImageUrl = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(card.url)
    const isValidMediaType = card.url && card.media_type === 'image'
    if (isValidImageUrl || isValidMediaType) {
      this.url = isValidImageUrl ? card.url : 'https://static01.nyt.com/images/2022/02/21/opinion/sunday/18shesol/18shesol-superJumbo.jpg'
      this.title = card.title
      this.explanation = card.explanation
      this.date = card.date
      this.media_type = card.media_type
    }
  }
}