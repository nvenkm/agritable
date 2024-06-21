import React, { useEffect, useState } from "react";
import { Pagination, Select, Table } from "@mantine/core";
import data from "../data/data.json";
import { findMaxProducedCrop, findMinProducedCrop } from "../functions";
import { maxMinCropDataInterface } from "../models";
import "../App.css";
const ProductionSortTable = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [perPage, setPerPage] = useState<string>("10");
  const [paginatedData, setPaginatedData] = useState<maxMinCropDataInterface[]>(
    []
  );

  const maxMinCropData: maxMinCropDataInterface[] = [];

  //group according to years
  const uniqueYears = Array.from(new Set(data.map((item) => item.Year)));

  //populate the maxMinCropData
  uniqueYears.map((element) => {
    maxMinCropData.push({
      Year: element,
      maxProducedCrop: findMaxProducedCrop(element),
      minProducedCrop: findMinProducedCrop(element),
    });
  });

  useEffect(() => {
    const from = (activePage - 1) * parseInt(perPage);
    const to = from + parseInt(perPage);
    setPaginatedData(maxMinCropData.slice(from, to));
  }, [perPage, activePage]);

  const rows = paginatedData.map(
    (element: maxMinCropDataInterface, index: number) => (
      <tr key={index}>
        <td>
          {parseInt(perPage) * activePage - parseInt(perPage) + index + 1}
        </td>
        <td>{element["Year"].slice(-4)}</td>
        <td>{element["maxProducedCrop"]}</td>
        <td>{element["minProducedCrop"]}</td>
      </tr>
    )
  );

  return (
    <div>
      <h2 className="h2">1. Crops with maximum and minimum production</h2>
      <div className="tableWrapper">
        <Table striped highlightOnHover verticalSpacing={"xs"}>
          <thead>
            <tr>
              <th>#</th>
              <th>Year</th>
              <th>Crop with maximum production</th>
              <th>Crop with minimum production</th>
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
          total={Math.ceil(maxMinCropData.length / parseInt(perPage))}
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

export default ProductionSortTable;
