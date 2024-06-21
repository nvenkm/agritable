export interface ItemInterface {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | "";
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | "";
  "Area Under Cultivation (UOM:Ha(Hectares))": number | "";
}

export interface maxMinCropDataInterface {
  Year: string;
  maxProducedCrop: string;
  minProducedCrop: string;
}

export interface AverageDataInterface {
  "Crop Name": string;
  averageYield: number;
  averageCultivationArea: number;
}
