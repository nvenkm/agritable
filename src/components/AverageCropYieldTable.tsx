import React, { useEffect, useState } from "react";
import { Pagination, Select, Table } from "@mantine/core";
import data from "../data/data.json";
import { findAverage } from "../functions";
import { AverageDataInterface } from "../models";
import "../App.css";
const AverageCropYieldTable = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [perPage, setPerPage] = useState<string>("10");
  const [paginatedData, setPaginatedData] = useState<AverageDataInterface[]>(
    []
  );

  const averageCropData: AverageDataInterface[] = [];

  const uniqueCrops = Array.from(
    new Set(data.map((item) => item["Crop Name"]))
  );

  uniqueCrops.map((element) => {
    averageCropData.push({
      "Crop Name": element,
      averageYield: parseFloat(
        findAverage(
          element,
          "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"
        ).toFixed(3)
      ),
      averageCultivationArea: parseFloat(
        findAverage(
          element,
          "Area Under Cultivation (UOM:Ha(Hectares))"
        ).toFixed(3)
      ),
    });
  });

  useEffect(() => {
    const from = (activePage - 1) * parseInt(perPage);
    const to = from + parseInt(perPage);
    setPaginatedData(averageCropData.slice(from, to));
  }, [perPage, activePage]);

  const rows = paginatedData.map(
    (element: AverageDataInterface, index: number) => (
      <tr key={index}>
        <td>
          {parseInt(perPage) * activePage - parseInt(perPage) + index + 1}
        </td>
        <td>{element["Crop Name"]}</td>
        <td>{element["averageYield"]}</td>
        <td>{element["averageCultivationArea"]}</td>
      </tr>
    )
  );

  return (
    <div>
      <h2 className="h2">2. Average Yield and Cultivation area</h2>
      <div className="tableWrapper">
        <Table striped highlightOnHover verticalSpacing={"xs"}>
          <thead>
            <tr>
              <th>#</th>
              <th>Crop</th>
              <th>Average Yield of the Crop between 1950-2020</th>
              <th>Average Cultivation Area of the Crop between 1950-2020</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
          {/* <tfoot>{footer}</tfoot> */}
        </Table>
      </div>
      <div className="footerWrapper">
        <Select
          label="Items per page"
          placeholder="Items per page"
          defaultValue={perPage}
          data={["5", "10", "20", "40"]}
          onChange={(value) => {
            setPerPage(value || "10");
            setActivePage(1);
          }}
          className="select"
        />
        <Pagination
          className="pagination"
          total={Math.ceil(averageCropData.length / parseInt(perPage))}
          value={activePage}
          onChange={(value) => {
            console.log(value);
            setActivePage(value);
          }}
          about=""
          mt="sm"
        />
      </div>
    </div>
  );
};

export default AverageCropYieldTable;
