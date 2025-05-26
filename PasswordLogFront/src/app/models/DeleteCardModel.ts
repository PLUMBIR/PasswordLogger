import { CardType } from "./Cards/BaseCardModel";

export interface DeleteCardModel {
    userId: string;
    cardId: string;
    cardType: CardType;
}