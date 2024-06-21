import data from "../data/data.json";

export function findMaxProducedCrop(year: string): string {
  //filter data according to year
  const filteredData = data.filter((item) => item.Year === year);
  let maxCrop = filteredData[0];

  //find the max produced crop
  for (let i = 0; i < filteredData.length; i++) {
    if (
      filteredData[i]["Crop Production (UOM:t(Tonnes))"] >
      maxCrop["Crop Production (UOM:t(Tonnes))"]
    ) {
      maxCrop = filteredData[i];
    }
  }

  return maxCrop["Crop Name"];
}

export function findMinProducedCrop(year: string): string {
  //filter data according to year
  const filteredData = data.filter((item) => item.Year === year);
  let minCrop = filteredData[0];

  //find the min produced crop
  for (let i = 0; i < filteredData.length; i++) {
    if (
      filteredData[i]["Crop Production (UOM:t(Tonnes))"] <
      minCrop["Crop Production (UOM:t(Tonnes))"]
    ) {
      minCrop = filteredData[i];
    }
  }

  return minCrop["Crop Name"];
}

export function findAverage(
  cropName: string,
  field:
    | "Crop Production (UOM:t(Tonnes))"
    | "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"
    | "Area Under Cultivation (UOM:Ha(Hectares))"
): number {
  let total = 0;
  let count = 0;

  //filter data according to cropName
  const filteredData = data.filter((crop) => crop["Crop Name"] === cropName);

  //get total and count
  for (let i = 0; i < filteredData.length; i++) {
    const yieldValue = filteredData[i][field];

    if (typeof yieldValue === "number") {
      total += yieldValue;
      count++;
    }
  }

  //return average
  const average = count > 0 ? total / count : 0;
  return average;
}
