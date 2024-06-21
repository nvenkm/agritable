import React, { useEffect, useState } from "react";
import { Pagination, Select, Table } from "@mantine/core";
import data from "../data/data.json";
import { ItemInterface } from "../models";
const MyTable = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [perPage, setPerPage] = useState<string>("10");
  const [paginatedData, setPaginatedData] = useState<ItemInterface[]>([]);

  console.log("paginatedData", paginatedData);

  useEffect(() => {
    const from = (activePage - 1) * parseInt(perPage);
    const to = from + parseInt(perPage);
    setPaginatedData(data.slice(from, to) as ItemInterface[]);
  }, [perPage, activePage]);

  const rows = paginatedData.map((element: ItemInterface, index: number) => (
    <tr key={index}>
      <td>{parseInt(perPage) * activePage - parseInt(perPage) + index + 1}</td>
      <td>{element["Country"]}</td>
      <td>{element["Year"]}</td>
      <td>{element["Crop Name"]}</td>
      <td>
        {element["Crop Production (UOM:t(Tonnes))"] === ""
          ? 0
          : element["Crop Production (UOM:t(Tonnes))"]}
      </td>
      <td>
        {element["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] === ""
          ? 0
          : element["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]}
      </td>
      <td>
        {element["Area Under Cultivation (UOM:Ha(Hectares))"] === ""
          ? 0
          : element["Area Under Cultivation (UOM:Ha(Hectares))"]}
      </td>
    </tr>
  ));

  return (
    <div>
      <div
        style={{
          marginLeft: "100px",
          marginRight: "100px",
          height: "90vh",
          overflowY: "scroll",
        }}
      >
        <Table striped highlightOnHover verticalSpacing={"xs"}>
          <thead>
            <tr>
              <th>#</th>
              <th>Country</th>
              <th>Year</th>
              <th>Crop Name</th>
              <th>Crop Production (UOM:t(Tonnes))</th>
              <th>Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))</th>
              <th>Area Under Cultivation (UOM:Ha(Hectares))</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
          {/* <tfoot>{footer}</tfoot> */}
        </Table>
      </div>
      <div
        style={{
          marginLeft: "100px",
          marginRight: "100px",
          display: "flex",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Select
          label="Items per page"
          placeholder="Items per page"
          defaultValue={perPage}
          data={["5", "10", "20", "40"]}
          onChange={(value) => {
            setPerPage(value || "10");
            setActivePage(1);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px ",
            fontSize: "14px",
            marginLeft: "auto",
          }}
        />
        <Pagination
          style={{
            marginTop: "0",
            marginRight: "25px",
          }}
          total={Math.ceil(data.length / parseInt(perPage))}
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

export default MyTable;
