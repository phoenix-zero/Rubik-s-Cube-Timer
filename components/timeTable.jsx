import React from 'react';
import { Table } from 'reactstrap';

export default function TimeTable(props) {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Scramble</th>
          </tr>
        </thead>
        <tbody>
          {props.table.map(({ scramble, time }, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{scramble}</td>
              <td>{time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
